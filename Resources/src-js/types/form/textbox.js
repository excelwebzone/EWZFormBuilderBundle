/**
 * Textbox type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.TextboxType = FormBuilder.Type.extend({

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
            size: {
                text: 'Size',
                value: 20
            },
            validation: {
                text: 'Validation',
                value: 'None',
                dropdown: [
                    ['None', 'None'],
                    ['Email', 'Email'],
                    ['AlphaNumeric', 'AlphaNumeric'],
                    ['Alphabetic', 'Alphabetic'],
                    ['Numeric', 'Numeric'],
                    ['Url', 'URL'],
                    ['Currency', 'Currency']
                ]
            },
            maxsize: {
                text: 'Max Size',
                value: ''
            },
            subLabel: {
                text: 'Sub Label',
                value: ''
            },
            hint: {
                text: 'Hint Example',
                value: ''
            },
            description: {
                text: 'Hover Text',
                value: '',
                textarea: true
            },
            readonly: {
                text: 'Read-only',
                value: 'No',
                dropdown: [
                    ['No', 'No'],
                    ['Yes', 'Yes']
                ]
            }
        };

        var template = '<@ if (sublabel) { @><div class="form-sub-label-container"><@ } @><input type="text" name="<@=name@>" id="field_<@=id@>" size="<@=size@>" <@ if (maxsize) { @>maxlength="<@=maxsize@>"<@ } @> <@ if (required) { @>required="required"<@ } @> <@ if (validation && validation != "none") { @>data-validation="<@=validation@>"<@ } @> <@ if (hint) { @>placeholder="<@=hint@>"<@ } @> value="<@=value@>" <@ if (readonly) { @>readonly="readonly"<@ } @> class="form-textbox" /><@ if (sublabel) { @><span class="form-sub-label"><@=sublabel@></span></div><@ } @>';

        this._super('textbox', prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        return $('#field_' + this.getFieldName(true)).val();
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

        return this._super({
            id    : this.getFieldName(true),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                id         : this.getFieldName(true),
                name       : this.getFieldName(),
                size       : this.getProperty('size').value,
                maxsize    : this.getProperty('maxsize').value,
                required   : this.getProperty('required').value == 'Yes',
                readonly   : this.getProperty('readonly').value == 'Yes',
                validation : this.getProperty('validation').value.toLowerCase(),
                hint       : this.getProperty('hint').value,
                value      : this.getProperty('defaultValue').value,
                sublabel   : this.getProperty('subLabel').value
            })
        });
    }

});
