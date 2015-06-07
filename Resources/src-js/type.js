/**
 * @constructor
 */
FormBuilder.Type = FormBuilder.Class.extend({

    /**
     * @var {object}
     * @protected
     */
    builder_: null,

    /**
     * @var {string}
     * @protected
     */
    type_: null,

    /**
     * @var {string}
     * @protected
     */
    fieldName_: null,

    /**
     * @var {Object}
     * @protected
     */
    prop_: {
        fieldName: {
            text: 'Field Name',
            value: '',
            hidden: true,
        },
        defaultValue: {
            text: 'Default Value',
            value: ''
        },
        allowDelete: {
            hidden: true,
            value: 'Yes',
            dropdown: [
                ['No', 'No'],
                ['Yes', 'Yes']
            ]
        },
        column: {
            hidden: true,
            value: 'No'
        },
        error: {
            hidden: true,
            value: ''
        }
    },

    /**
     * @var {string}
     * @protected
     */
    TEMPLATE_: null,

    /**
     * @param {string} type
     * @param {Object} prop
     * @param {string} template
     */
    init: function(type, prop, template) {
        this.type_     = type;
        this.prop_     = $.extend(true, prop,this.prop_);
        this.TEMPLATE_ = template;
    }

});

/**
 * Loads properties (key=>value) and initialize the form type with them.
 *
 * @param {Object} prop An array of properties (key => value)
 */
FormBuilder.Type.prototype.load = function (prop) {
    for (key in prop) {
        if (key.indexOf('.') >= 0) {
            tmp = key.split('.');
            if (this.prop_[tmp[0]][tmp[1]]) {
                this.prop_[tmp[0]][tmp[1]] = eval(prop[key]);
            }
        } else if (this.prop_[key]) {
            this.prop_[key].value = prop[key];
        }
    }
    if (this.prop_.hasOwnProperty('fieldName')) {
        this.prop_['fieldName'].value = this.getFieldName();
    }
};

/**
 * Returns the object type.
 *
 * @return {string} The type name
 */
FormBuilder.Type.prototype.getType = function () {
    return this.type_;
};

/**
 * Sets the form buider.
 *
 * @param {object} Form builder
 */
FormBuilder.Type.prototype.setBuilder = function (builder) {
    this.builder_ = builder;
};

/**
 * Sets the form buider.
 *
 * @return {object} Form builder
 */
FormBuilder.Type.prototype.getBuilder = function () {
    return this.builder_;
};

/**
 * Sets the form type properties.
 *
 * @param {Object} An array of properties
 */
FormBuilder.Type.prototype.setProperties = function (prop) {
    this.prop_ = prop || {};
};

/**
 * Returns a list of properties.
 *
 * @return {Object} An array of properties
 */
FormBuilder.Type.prototype.getProperties = function () {
    return this.prop_;
};

/**
 * Returns a property object.
 *
 * @param {string} key Property key
 *
 * @return {Object} Property object
 */
FormBuilder.Type.prototype.getProperty = function (key) {
    if (typeof this.prop_[key] == 'undefined') {
        return {
            hidden: true,
            value: ''
        };
    }
    return this.prop_[key];
};

/**
 * Removes a property object.
 *
 * @param {string} key Property key
 */
FormBuilder.Type.prototype.removeProperty = function (key) {
    if (this.prop_.hasOwnProperty(key)) {
        delete this.prop_[key];
    }
};

/**
 * Sets a property value.
 *
 * @param {string} name  Property name
 * @param {mix}    value Property value
 * @param {string} key   Property key
 */
FormBuilder.Type.prototype.setPropertyValue = function (name, value, key) {
    key = key || 'value';
    if (typeof this.prop_[name] == 'undefined') {
        this.prop_[name] = {
            hidden: true,
            value: ''
        }
    }
    if (this.prop_[name].textarea && this.prop_[name].splitter && typeof value == 'string') value = value.replace(/\n\r|\n|\r\n|\r/g, "\n").replace(/^\n|\n$/g, '').replace(/\n/g, this.prop_[name].splitter);
    this.prop_[name][key] = value;
};

/**
 * Sets the field name of the form type.
 *
 * @param {string}  name  The field name
 * @param {Boolean} force Force name
 */
FormBuilder.Type.prototype.setFieldName = function (name, force) {
    this.fieldName_ = force || false ? name : name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9\-_]/g, '_');
};

/**
 * Returns the field name of the form type.
 *
 * @return {string} The field name
 */
FormBuilder.Type.prototype.getFieldName = function () {
    if (!this.fieldName_) this.setFieldName(Utils.uniqid(this.type_));
    return this.fieldName_;
};

/**
 * Returns a field element of the form type.
 *
 * @param {string} fieldName The field name
 *
 * @return {Object}
 */
FormBuilder.Type.prototype.getFieldElement = function (fieldName) {
    fieldName = fieldName || this.getFieldName();

    return $('[name="' + fieldName + '"]');
};

/**
 * Returns the rendered form type.
 *
 * @param {Object} data The data to render
 *
 * @return {string}
 */
FormBuilder.Type.prototype.render = function(data) {
    if (typeof data.allowDelete == 'undefined') {
        data.allowDelete = this.getProperty('allowDelete').value == 'Yes';
    }
    if (typeof data.tools == 'undefined') {
        data.tools = true;
    }
    if (typeof data.wizard == 'undefined') {
        data.wizard = false
    }
    if (typeof data.error == 'undefined') {
        data.error = this.getProperty('error').value;
    }
    if (typeof data.description == 'undefined') {
        data.description = this.getProperty('description').value;
    }
    if (typeof data.style == 'undefined') {
        var column = this.getProperty('column').value;
        if ($.inArray(column, ['Yes', 'Clear']) >= 0) {
            data.style = 'form-line-column';
            if (column == 'Clear') {
                data.style += ' form-line-column-clear';
            }
        }
    }
    return Utils.tmpl('formLineTmpl', {
        id          : data.id          || this.getFieldName(),
        type        : data.type        || this.getType(),
        style       : data.style       || null,
        label       : data.label       || null,
        html        : data.html        || null,
        error       : data.error       || null,
        description : data.description || null,
        tools       : data.tools       || null,
        wizard      : data.wizard      || null,
        allowDelete : data.allowDelete || null
    });
};

/**
 * Returns the rendered form type.
 *
 * @param {stinrg} html      An html string
 * @param {string} fieldName The form type field name
 */
FormBuilder.Type.prototype.reRender = function(html, fieldName) {
    $('#' + this.getBuilder().getId() + ' [id="' + (fieldName || this.getFieldName()) + '"]').replaceWith(html || this.render());
};

/**
 * Returns the current value of the form type.
 */
FormBuilder.Type.prototype.val = function () {
    return false;
};

/**
 * Returns a form type (property) key => value.
 *
 * @param {Boolean} asString Whether or not to return as string format
 *
 * @return {array} List of types with values
 */
FormBuilder.Type.prototype.getFormData = function (asString) {
    tmp = {
        type: this.getType(),
        name: this.getFieldName()
    };

    $.each(this.getProperties(), function (key, value) {
        if (key == 'special') {
            if (value.ajax && value.ajax.url) {
                tmp[key + '.ajax'] = value.ajax;
            }
            if (value.dropdown) {
                tmp[key + '.dropdown'] = value.dropdown;
            }
        }

        if (key != 'fieldName') {
            tmp[key] = value.value;
        }
    });

    return asString ? Utils.stringify(tmp) : tmp;
};
