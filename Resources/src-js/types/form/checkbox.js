/**
 * Checkbox type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.CheckboxType = FormBuilder.Type.extend({

    /**
     * @var {string}
     * @protected
     */
    inputType: 'checkbox',

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Question',
                value: '....'
            },
            labelAlign: {
                text: 'Label Align',
                value: 'Auto',
                dropdown: [
                    ['Auto', 'Auto'],
                    ['Left', 'Left'],
                    ['Right', 'Right'],
                    ['Top', 'Top']
                ]
            },
            required: {
                text: 'Required',
                value: 'No',
                dropdown: [
                    ['No', 'No'],
                    ['Yes', 'Yes']
                ]
            },
            options: {
                text: 'Options',
                value: 'Option 1|Option 2|Option 3',
                textarea: true,
                splitter: '|'
            },
            special: {
                text: 'Special Options',
                value: 'None',
                dropdown: Consts.specialOptions.getByType('checkbox')
            },
            calcValues: {
                text: 'Calculation Values',
                value: '',
                textarea: true,
                splitter: '|'
            },
            spreadCols: {
                text: 'Spread to Columns',
                value: '1'
            },
            selected: {
                text: 'Selected',
                value: '',
                dropdown: 'options'
            },
            description: {
                text: 'Hover Text',
                value: '',
                textarea: true
            },

            /* override */
            defaultValue: {
                hidden: true,
                value: ''
            }
        };

        var template = '<div class="form-<@=style@>-column"><@=options@></div>';

        this._super(this.inputType, prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        var value = [];
        $('input[type=checkbox][name=' + this.getFieldName() + '[]]:checked').each(function () {
            value.push($(this).val());
        });
        return value;
    },

    /**
     * @inheritDoc
     */
    render: function(data) {
        var label = Utils.tmpl('<label for="field_<@=id@>" class="form-label-<@=style@>" <@ if (description) { @>title="<@=description@>"<@ } @>><@=text@><@ if (required) { @><span class="form-required">*</span><@ } @></label>', {
            id          : this.getFieldName(true),
            style       : this.getProperty('labelAlign').value.toLowerCase(),
            description : this.getProperty('description').value,
            text        : this.getProperty('text').value,
            required    : this.getProperty('required').value == 'Yes'
        });

        var $this        = this,
            dropdown     = [],
            options      = '',
            optionValues = [],
            selected     = this.getProperty('selected').value,
            spreadCols   = this.getProperty('spreadCols').value,
            fieldId      = this.getFieldName(true),
            fieldName    = this.getFieldName();

        // options
        if (this.getProperty('special').value == 'None') {
            dropdown = this.getProperty('options').value.split(this.getProperty('options').splitter);
        }
        // special
        else {
            dropdown = Consts.specialOptions[this.getProperty('special').value].value;
        }

        // calculation values
        var calcValues = this.getProperty('calcValues').value.split(this.getProperty('calcValues').splitter) || [];

        $.each(dropdown, function (key, value) {
            var text = value;
            value = typeof calcValues[key] != 'undefined' ? calcValues[key] : value

            options += Utils.tmpl('<span class="form-<@=inputType@>-item" <@ if (newline) { @>style="clear:left;"<@ } @>><input type="<@=inputType@>" name="<@=name@>[]" id="field_<@=id@>_<@=key@>" value="<@=value@>" <@ if (selected) { @>checked="checked"<@ } @> class="form-<@=inputType@>" /><label for="field_<@=id@>_<@=key@>"><@=text@></label></span><span class="clearfix"></span>', {
                id        : fieldId,
                name      : fieldName,
                key       : key,
                value     : value,
                text      : text,
                selected  : typeof selected == 'object' ? $.inArray(value, selected) >= 0 : selected == value,
                newline   : key % spreadCols === 0,
                inputType : $this.inputType
            });
            optionValues.push(value);
        });

        return this._super({
            id    : this.getFieldName(true),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                id       : this.getFieldName(true),
                name     : this.getFieldName(),
                style    : this.getProperty('spreadCols').value == 1 ? 'single' : 'multiple',
                required : this.getProperty('required').value == 'Yes',
                options  : options
            })
        });
    }

});
