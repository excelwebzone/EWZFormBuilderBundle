/**
 * @constructor
 */
FormBuilder.Type = FormBuilder.Class.extand({
    /**
     * @var {string}
     * @public
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
        reserve: {
            hidden: true,
            value: 'No',
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
 *
 * @return {Boolean} True is successfully removed, otherwise false
 */
FormBuilder.Type.prototype.removeProperty = function (key) {
    for (k in this.prop_) {
        if (k == key) {
            this.prop_.splice(k, 1);
            return true;
        }
    }
    return false;
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
 * @param {string} name The field name
 */
FormBuilder.Type.prototype.setFieldName = function (name) {
    this.fieldName_ = name;
};

/**
 * Returns the field name of the form type.
 *
 * @param {Boolean} slugify Whether or not to slugify the field name
 *
 * @return {string} The field name
 */
FormBuilder.Type.prototype.getFieldName = function (slugify) {
    if (!this.fieldName_) this.fieldName_ = Utils.uniqid(this.type_);
    return slugify || false
        ? this.fieldName_.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9\-_]/g, '_')
        : this.fieldName_
    ;
};

/**
 * Returns the rendered form type.
 *
 * @param {Object} data The data to render
 *
 * @return {string}
 */
FormBuilder.Type.prototype.render = function(data) {
    if (typeof data.tools == 'undefined') {
        data.tools = true;
    }
    if (typeof data.reserve == 'undefined') {
        data.reserve = this.getProperty('reserve').value == 'Yes';
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
        id          : data.id          || this.getFieldName(true),
        type        : data.type        || this.getType(),
        style       : data.style       || null,
        label       : data.label       || null,
        html        : data.html        || null,
        error       : data.error       || null,
        description : data.description || null,
        tools       : data.tools       || null,
        reserve     : data.reserve     || null
    });
};

/**
 * Returns the rendered form type.
 */
FormBuilder.Type.prototype.reRender = function() {
    $('#' + this.getFieldName(true)).replaceWith(this.render());
};

/**
 * Returns the current value of the form type.
 */
FormBuilder.Type.prototype.val = function () {
    return false;
};
