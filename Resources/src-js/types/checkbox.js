/**
 * Checkbox type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.CheckboxType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Title',
                value: '...',
                reserved: true
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
                ],
                reserved: true
            },
            options: {
                text: 'Options',
                value: 'Option 1|Option 2|Option 3',
                textarea: true,
                splitter: '|',
                reserved: true
            },
            spreadCols: {
                text: 'Spread to Columns',
                value: '1'
            },
            selected: {
                text: 'Selected',
                value: '',
                dropdown: 'options',
                reserved: true
            },
            description: {
                text: 'Hover Text',
                value: '',
                textarea: true,
                reserved: true
            }
        };

        var template = '<div class="form-<@=style@>-column"><@=options@></div>';

        this._super('checkbox', prop, template);
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
        var label = Utils.tmpl('<label for="<@=id@>" class="form-label-<@=style@>" <@ if (description) { @>title="<@=description@>"<@ } @>><@=text@><@ if (required) { @><span class="form-required">*</span><@ } @></label>', {
            id          : this.getFieldName(),
            style       : this.getProperty('labelAlign').value.toLowerCase(),
            description : this.getProperty('description').value,
            text        : this.getProperty('text').value,
            required    : this.getProperty('required').value == 'Yes'
        });

        var options      = '',
            optionValues = [],
            selected     = this.getProperty('selected').value,
            spreadCols   = this.getProperty('spreadCols').value,
            fieldName    = this.getFieldName()
        ;
        $.each(this.getProperty('options').value.split(this.getProperty('options').splitter), function (key, value) {
            options += Utils.tmpl('<span class="form-checkbox-item" <@ if (newline) { @>style="clear:left;"<@ } @>><input type="checkbox" name="<@=name@>[]" id="field_<@=name@><@=key@>"  value="<@=value@>" <@ if (selected) { @>checked="checked"<@ } @> class="form-checkbox" /><label for="field_<@=name@><@=key@>"><@=value@></label></span><span class="clearfix"></span>', {
                name     : fieldName,
                key      : key,
                value    : value,
                selected : 'object' == typeof selected ? $.inArray(value, selected) >= 0 : selected == value,
                newline  : key % spreadCols === 0
            });
            optionValues.push(value);
        });
        if (selected && $.inArray(selected, optionValues) === -1) {
            options += Utils.tmpl('<span class="form-checkbox-item" <@ if (newline) { @>style="clear:left;"<@ } @>><input type="checkbox" name="<@=name@>[]" id="field_<@=name@><@=key@>"  value="<@=value@>" <@ if (selected) { @>checked="checked"<@ } @> class="form-checkbox" /><label for="field_<@=name@><@=key@>"><@=value@></label></span><span class="clearfix"></span>', {
                name     : fieldName,
                key      : selected,
                value    : selected,
                selected : true,
                newline  : spreadCols === 0
            });
        }

        return this._super({
            id    : this.getFieldName(true),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                name     : this.getFieldName(),
                style    : this.getProperty('spreadCols').value == 1 ? 'single' : 'multiple',
                required : this.getProperty('required').value == 'Yes',
                options  : options
            })
        });
    }

});
