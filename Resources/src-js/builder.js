/**
 * @constructor
 */
FormBuilder = function (id) {

    /**
     * @var {string}
     * @protected
     */
    this.id_ = id;

    /**
     * Holds list of form types.
     *
     * @var {Object}
     * @protected
     */
    this.types_ = [];

}

/**
 * Returns a form id.
 *
 * @return {string} The form id
 */
FormBuilder.prototype.getId = function () {
    return this.id_;
};

/**
 * Initialize form types and properties.
 *
 * @param {Object} prop An array of properties (type => key => value)
 */
FormBuilder.prototype.init = function (prop) {
    var $this = this;

    // create (default) form type
    var elem = new FormBuilder.FormType();

    // set the builder id, need when reRender()
    elem.setBuilderId($this.id_);

    // load form properties
    if (prop.form) elem.load(prop.form);

    // add new type
    $this.addType(elem);

    // add new field to list (place first)
    $('#' + $this.id_ + ' .form-list').prepend(elem.render());

    // add fields
    if (prop.fields) {
        $.each(prop.fields, function (key, value) {
            elem = eval('new FormBuilder.' + value.type.charAt(0).toUpperCase() + value.type.slice(1) + 'Type()');
            elem.load(value);
            elem.setFieldName(key);

            // set the builder id, need when reRender()
            elem.setBuilderId($this.id_);

            // add new type
            $this.addType(elem);

            // add new field to list (place last)
            $('#' + $this.id_ + ' .form-list').append(elem.render());
        });
    }
};

/**
 * Simple JavaScript Inheritance.
 */

// the base Class implementation (does nothing)
FormBuilder.Class = function () {}

// create a new Class that inherits from this class
FormBuilder.Class.extend = function (prop) {
    var fnTest = /xyz/.test(function() { xyz; }) ? /\b_super\b/ : /.*/;

    var _super = this.prototype;

    // instantiate a base class (but only create the instance,
    // don't run the init constructor)
    var initializing = true;
    var prototype = new this();
    initializing = false;

    // copy the properties over onto the new prototype
    for (var name in prop) {
        // check if we're overwriting an existing function
        prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function (name, fn) {
            return function () {
                var tmp = this._super;

                // add a new ._super() method that is the same method
                // but on the super-class
                this._super = _super[name];

                // the method only need to be bound temporarily, so we
                // remove it when we're done executing
                var ret = fn.apply(this, arguments);
                this._super = tmp;

                return ret;
            };
        })(name, prop[name]) : prop[name];
    }

    // the dummy class constructor
    function Class() {
        // all construction is actually done in the init method
        if (!initializing && this.init) this.init.apply(this, arguments);
    }

    // populate our constructed prototype object
    Class.prototype = prototype;

    // enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // and make this class extendable
    Class.extend = arguments.callee;

    return Class;
};

/**
 * Returns a list of form types with (property) key => value.
 *
 * @param {Boolean} onlyValue Whether or not to get entered (or selected) value
 *
 * @return {array} List of types with values
 */
FormBuilder.prototype.getFormData = function (onlyValue) {
    var tmp = {};
    $.each (this.types_, function (key, value) {
        // get entered or selected value
        if (onlyValue) {
            v = value.val();
            if (v !== false) {
                tmp[value.getFieldName()] = value.val();
            }
        }
        // get all properties (definitions)
        else {
            tmp[key] = value.getFormData();
        }
    });
    return tmp;
};

/**
 * Adds a form type.
 *
 * @param {FormBuilder.Type} type A form type instance
 */
FormBuilder.prototype.addType = function (type) {
    this.types_.push(type);
};

/**
 * removes a form type.
 *
 * @param {string} name The field name
 *
 * @return {Boolean} True is successfully removed, otherwise false
 */
FormBuilder.prototype.removeType = function (name) {
    for (key in this.types_) {
        if (this.types_[key].getFieldName() == name) {
            this.types_.splice(key, 1);
            return true;
        }
    }
    return false;
};

/**
 * Returns a form type.
 *
 * @param {string} name The field name
 *
 * @return {FormBuilder.Type} The form type instance
 */
FormBuilder.prototype.getType = function (name) {
    for (key in this.types_) {
        if (this.types_[key].getFieldName() == name) {
            return this.types_[key];
        }
    }
    return null;
};

/**
 * Sorts list of types.
 *
 * @param {Object} types A list of types (ids)
 */
FormBuilder.prototype.sort = function (types) {
    var tmp = [], type;
    for (key in types) {
        type = this.getType(types[key]);
        if (type) tmp.push(type);
    }
    this.types_ = tmp;
};

/**
 * Returns an html table of fields based on a form type.
 *
 * @param {FormBuilder.Type} type A form type instance
 *
 * @return {string} The html table
 */
FormBuilder.prototype.makeProperties = function (type) {
    var
        tmp, rows = '',
        properties = type.getProperties()
    ;
    for (key in properties) {
        tmp = $.extend(true, {}, properties[key]);

        // skip if hidden property
        if (tmp.hidden || (type.getProperty('reserve').value == 'Yes' && tmp.reserved)) continue;

        // override dropdown options
        if (typeof tmp.dropdown == 'string') {
            tmp.dropdown = $.extend(true, {}, type.getProperty(tmp.dropdown));

            // if the property has a splitter value then it means this is a list value
            // it should be splitted
            if (tmp.dropdown.textarea && tmp.dropdown.splitter) {
                tmp.dropdown = tmp.dropdown.value.split(tmp.dropdown.splitter);
                for (k in tmp.dropdown) {
                    tmp.dropdown[k] = [tmp.dropdown[k], tmp.dropdown[k]];
                }
            } else {
                tmp.dropdown = tmp.dropdown.dropdown;
            }
        }

        rows = rows + Utils.tmpl('<tr><td class="form-prop-table-label" valign="top" nowrap="nowrap"><@=label@> <@ if (tip) { @><span class="form-prop-table-detail"><@=tip@></span><@ } @></td><td class="form-prop-table-value" valign="top"><@=field@></td></tr>', {
            label : properties[key].text,
            tip   : this.tips_[key] ? this.tips_[key].tip : null,
            field : this.drawField(key, tmp)
        });
    };
    return Utils.tmpl('<input type="hidden" name="elem_id" value="<@=name@>" /><table class="form-prop-table"><tbody><@=rows@></tbody></table>', {
        name : type.getFieldName(),
        rows : rows
    });
};

/**
 * Returns an html field based on a property options.
 *
 * @param {string} name    Property name
 * @param {Object} options Property options
 *
 * @return {string} The html field
 */
FormBuilder.prototype.drawField = function (name, options) {
    if (options.textarea) {
        // if the property has a splitter value then it means this is a list value
        // it should be splitted and displayed in the textarea
        if (options.splitter) {
            options.value = options.value.split(options.splitter).join('\n');
        }

        return Utils.tmpl('<textarea name="<@=name@>" class="edit-textarea"><@=value@></textarea>', {
            name  : name,
            value : options.value
        });
    }
    else if (options.dropdown) {
        options.dropdown = options.dropdown || [];

        $.each(options.dropdown, function (k, v) {
            options.dropdown[k] = '<option value="' + v[0] + '" ' + (options.value == v[0] ? 'selected="selected"' : '') + '>' + v[1] + '</option>';
        });

        return Utils.tmpl('<select name="<@=name@>" class="edit-dropdown"><@=options@></select>', {
            name    : name,
            options : options.dropdown.join('')
        });
    }

    return Utils.tmpl('<input type="text" name="<@=name@>" value="<@=value@>" class="edit-text" />', {
        name  : name,
        value : options.value
    });
};

/**
 * Holds list of properties tooltips.
 *
 * @var {Object}
 * @protected
 */
FormBuilder.prototype.tips_ = {
    labelAlign: {
        title: 'Label Align',
        tip: 'Align question label'
    },
    required: {
        title: 'Require',
        tip: 'Require completing question'
    },
    size: {
        title: 'Size',
        tip: 'Set number of characters users can enter'
    },
    validation: {
        title: 'Validation',
        tip: 'Validate entry format'
    },
    maxsize: {
        title: 'Max Size',
        tip: 'Maximum allowed characters for this field'
    },
    description: {
        title: 'Hover Text',
        tip: 'Show description about question'
    },
    font: {
        title: 'Font',
        tip: 'Change font style'
    },
    fontsize: {
        title: 'Font',
        tip: 'Change font size'
    },
    fontcolor: {
        title: 'Font Color',
        tip: 'Change font color'
    },
    background: {
        title: 'Background',
        tip: 'Change form background color'
    },
    formWidth: {
        title: 'Form Width',
        tip: 'Resize form width'
    },
    labelWidth: {
        title: 'Label Width',
        tip: 'Resize question label width'
    },
    alignment: {
        title: 'Alignment',
        tip: 'Align questions and answers'
    },
    properties: {
        title: 'Preferences',
        tip: 'Update Form Settings'
    },
    cols: {
        title: 'Columns',
        tip: 'Width of textarea'
    },
    rows: {
        title: 'Rows',
        tip: 'Number of lines on textarea'
    },
    defaultValue: {
        title: 'Default Value',
        tip: 'Pre-populate a value'
    },
    special: {
        title: 'Special Options',
        tip: 'Collection of predefined values to be used on your form. Such as <u>Countries</u>.'
    },
    hint: {
        title: 'Input Hint',
        tip: 'Show an example in gray'
    },
    selected: {
        title: 'Selected',
        tip: 'Default selected answer'
    },
    allowMinus: {
        title: 'Allow Negatives',
        tip: 'Allows user to select or enter negative values'
    },
    addAmount: {
        title: 'Stepping',
        tip: 'Defines increase/descrease amount'
    },
    maxValue: {
        title: 'Maximum Value',
        tip: 'When you set this value, it won\'t let users to select more than this number'
    },
    minValue: {
        title: 'Minimum Value',
        tip: 'When you set this value, it won\'t let users to select less than this number'
    },
    spreadCols: {
        title: 'Spread To Columns',
        tip: 'Spread inputs into multiple columns. Useful if you have lots of options.'
    },
    options: {
        title: 'Options',
        tip: 'Users can choose from these options'
    },
    headerType: {
        title: 'Heading Type',
        tip: 'Size of heading'
    },
    subHeader: {
        title: 'Sub Header',
        tip: 'Text below heading'
    },
    allowOther: {
        title: 'Allow Other',
        tip: 'Let users type a text'
    },
    extensions: {
        title: 'Extensions',
        tip: 'Allowed file types'
    },
    width: {
        title: 'Width',
        tip: 'Change width'
    },
    highlightLine: {
        title: 'Hightlight Effect',
        tip: 'Enables/Disables the yellow background effect on focused inputs'
    },
    lineSpacing: {
        title: 'Question Spacing',
        tip: 'Defines the distance between question lines. Make them closer or separate them apart.'
    },
    status: {
        title: 'Form Status',
        tip: 'Close form to reject further submissions.'
    },
    injectCSS: {
        title: 'Inject Custom CSS',
        tip: '<br>Add your own CSS code to your form. You can change every aspect of the form by using CSS codes. For example:' + "<br><pre><code>.form-line-active {\n  background:lightblue;\n  color:#000000;\n}\n</code></pre>" + 'will change the selected line\'s background color on the live form.<br><br>Using Firebug or similar tools will help you identify class names and defined styles.'
    }
};
