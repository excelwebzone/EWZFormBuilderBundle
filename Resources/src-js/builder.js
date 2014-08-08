/**
 * @constructor
 */
FormBuilder = function (id, name) {

    /**
     * @var {string}
     * @protected
     */
    this.id_ = id;

    /**
     * @var {string}
     * @protected
     */
    this.name_ = name;

    /**
     * Holds list of form types.
     *
     * @var {Object}
     * @protected
     */
    this.types_ = [];

    /**
     * @var {Boolean}
     * @protected
     */
    this.allowManualFieldName_ = false;

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
 * Returns a form name.
 *
 * @return {string} The form name
 */
FormBuilder.prototype.getName = function () {
    return this.name_;
};

/**
 * Sets whether or not to allow override the field name.
 *
 * @param {Boolean} allowOverride Allow override
 */
FormBuilder.prototype.setAllowManualFieldName = function (allowOverride) {
    this.allowManualFieldName_ = allowOverride;
};

/**
 * Gets whether or not to allow override the field name.
 *
 * @return {Boolean} Allow override
 */
FormBuilder.prototype.isAllowManualFieldName = function () {
    return this.allowManualFieldName_;
};

/**
 * Initialize form types and properties.
 *
 * @param {Object}  prop                 An array of properties (type => key => value)
 * @param {Boolean} isPreviewMode        Is preview mode
 */
FormBuilder.prototype.init = function (prop, isPreviewMode) {
    var $this = this, openingCollapse = false;

    // create (default) form type
    var elem = new FormBuilder.FormType();

    // set the builder, need when reRender()
    elem.setBuilder($this);

    // load form properties
    if (prop.form) elem.load(prop.form);

    // add new type
    $this.addType(elem);

    // add new field to list (place first)
    var formList = $('#' + $this.id_ + ' .form-list');

    formList.prepend(elem.render());

    // add fields
    if (prop.fields) {
        $.each(prop.fields, function (key, value) {
            elem = eval('new FormBuilder.' + value.type.charAt(0).toUpperCase() + value.type.slice(1) + 'Type()');
            elem.load(value);

            if ($this.getName()) key = $this.getName() + '[' + key + ']';
            elem.setFieldName(key);

            // set the builder, need when reRender()
            elem.setBuilder($this);

            // add new type
            $this.addType(elem);

            if (isPreviewMode) {
                if (elem.getType() == 'formcollapse') {
                    if (openingCollapse) {
                        formList = formList.parent();
                    }

                    var statusClass = '', style = '';
                    if (elem.getProperty('status').value === 'Closed') {
                        statusClass = '-closed';
                        if (elem.getProperty('visibility').value === 'Hidden') {
                            style = 'style="display:none"';
                        }
                    }

                    formList.append('<ul class="form-section' + statusClass + '" ' + style + ' id="section_' + elem.getFieldName() + '"></ul>');
                    formList = formList.find('ul#section_' + elem.getFieldName());

                    openingCollapse = true;
                }
            }

            // add new field to list (place last)
            formList.append(elem.render());
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
 * Returns all form types.
 *
 * @return {array} List of form types
 */
FormBuilder.prototype.getTypes = function () {
    return this.types_;
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
    var tmp, rows = '', fieldDetails = '',
        properties = type.getProperties();

    for (key in properties) {
        tmp = $.extend(true, {}, properties[key]);

        // skip if hidden property
        if (tmp.hidden) continue;

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
            tip   : Consts.tips[key] ? Consts.tips[key].tip : null,
            field : this.drawField(key, tmp)
        });
    };

    if (this.allowManualFieldName_ && properties.hasOwnProperty('fieldName')) {
        tmp = $.extend(true, {}, properties['fieldName']);

        fieldDetails = Utils.tmpl('<div class="field-details"><legend>Field Details</legend><table class="form-prop-table"><tbody><tr><td class="form-prop-table-label" valign="top" nowrap="nowrap"><@=label@> <@ if (tip) { @><span class="form-prop-table-detail"><@=tip@></span><@ } @></td><td class="form-prop-table-value" valign="top"><@=field@></td></tr></tbody></table></div>', {
            label : properties['fieldName'].text,
            tip   : Consts.tips['fieldName'] ? Consts.tips['fieldName'].tip : null,
            field : this.drawField('fieldName', tmp)
        });
    }

    return Utils.tmpl('<input type="hidden" name="elem_id" value="<@=id@>" /><table class="form-prop-table"><tbody><@=rows@></tbody></table><@=fieldDetails@>', {
        id           : type.getFieldName(),
        rows         : rows,
        fieldDetails : fieldDetails
    });
};

/**
 * Returns an html field based on a property options.
 *
 * @param {string} id      Property id
 * @param {Object} options Property options
 *
 * @return {string} The html field
 */
FormBuilder.prototype.drawField = function (id, options) {
    if (options.textarea) {
        // if the property has a splitter value then it means this is a list value
        // it should be splitted and displayed in the textarea
        if (options.splitter) {
            options.value = options.value.split(options.splitter).join('\n');
        }

        return Utils.tmpl('<textarea name="<@=id@>" class="edit-textarea"><@=value@></textarea>', {
            id    : id,
            value : options.value
        });
    }
    else if (options.dropdown) {
        options.dropdown = options.dropdown || [];

        $.each(options.dropdown, function (k, v) {
            options.dropdown[k] = '<option value="' + v[0] + '" ' + (options.value == v[0] ? 'selected="selected"' : null) + '>' + v[1] + '</option>';
        });

        return Utils.tmpl('<select name="<@=id@>" class="edit-dropdown"><@=options@></select>', {
            id      : id,
            options : options.dropdown.join('')
        });
    }

    return Utils.tmpl('<input type="<@=type@>" name="<@=id@>" value="<@=value@>" class="edit-text" />', {
        type  : options.type || 'text',
        id    : id,
        value : options.value
    });
};
