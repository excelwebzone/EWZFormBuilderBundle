/**
 * Textarea type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.TextareaType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Title',
                value: '....',
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
            cols: {
                text: 'Columns',
                value: 40
            },
            rows: {
                text: 'Rows',
                value: 6
            },
            validation: {
                text: 'Validation',
                value: 'None',
                dropdown: [
                    ['None', 'None'],
                    ['Email', 'Email'],
                    ['AlphaNumeric', 'AlphaNumeric'],
                    ['Alphabetic', 'Alphabetic'],
                    ['Numeric', 'Numeric']
                ],
                reserved: true
            },
            maxsize: {
                text: 'Entry Limit',
                value: ''
            },
            defaultValue: {
                text: 'Default Value',
                value: ''
            },
            subLabel: {
                text: 'Sub Label',
                value: '',
                reserved: true
            },
            hint: {
                text: 'Hint Example',
                value: '',
                reserved: true
            },
            description: {
                text: 'Hover Text',
                value: '',
                textarea: true,
                reserved: true
            }
        };

        var template = '<textarea name="<@=name@>" id="field_<@=name@>" cols="<@=cols@>" rows="<@=rows@>" <@ if (maxsize) { @>maxlength="<@=maxsize@>"<@ } @> <@ if (required) { @>data-required=true<@ } @> <@ if (validation && validation != "none") { @>data-validation="<@=validation@>"<@ } @> <@ if (hint) { @>placeholder="<@=hint@>"<@ } @> class="form-textarea"><@=value@></textarea><@ if (sublabel) { @><span class="form-sub-label"><@=sublabel@></span><@ } @>';

        this._super('textarea', prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        return $('#field_' + this.getFieldName()).val();
    },

    /**
     * @inheritDoc
     */
    render: function(data) {
        var label = Utils.tmpl('<label for="field_<@=id@>" class="form-label-<@=style@>" <@ if (description) { @>title="<@=description@>"<@ } @>><@=text@><@ if (required) { @><span class="form-required">*</span><@ } @></label>', {
            id          : this.getFieldName(),
            style       : this.getProperty('labelAlign').value.toLowerCase(),
            description : this.getProperty('description').value,
            text        : this.getProperty('text').value,
            required    : this.getProperty('required').value == 'Yes'
        });

        return this._super({
            id    : this.getFieldName(true),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                name       : this.getFieldName(),
                cols       : this.getProperty('cols').value,
                rows       : this.getProperty('rows').value,
                maxsize    : this.getProperty('maxsize').value,
                required   : this.getProperty('required').value == 'Yes',
                validation : this.getProperty('validation').value.toLowerCase(),
                hint       : this.getProperty('hint').value,
                value      : this.getProperty('defaultValue').value,
                sublabel   : this.getProperty('subLabel').value
            })
        });
    }

});
