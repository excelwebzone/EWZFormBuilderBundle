/**
 * Number type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.NumberType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Question',
                value: 'Number'
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
                value: 5
            },
            maxsize: {
                text: 'Max Size',
                value: ''
            },
            minValue: {
                text: 'Minimum Value',
                value: ''
            },
            maxValue: {
                text: 'Maximum Value',
                value: ''
            },
            addAmount: {
                text: 'Stepping',
                value: '1'
            },
            subLabel: {
                text: 'Sub Label',
                value: ''
            },
            hint: {
                text: 'Hint Example',
                value: 'ex: 23'
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

        var template = '<@ if (sublabel) { @><div class="form-sub-label-container"><@ } @><input type="number" name="<@=name@>" id="field_<@=id@>" size="<@=size@>" <@ if (maxsize) { @>maxlength="<@=maxsize@>"<@ } @> <@ if (minValue) { @>min="<@=minValue@>"<@ } @> <@ if (maxValue) { @>max="<@=maxValue@>"<@ } @> <@ if (addAmount) { @>step="<@=addAmount@>"<@ } @> <@ if (required) { @>required="required"<@ } @> <@ if (hint) { @>placeholder="<@=hint@>"<@ } @> value="<@=value@>" <@ if (readonly) { @>readonly="readonly"<@ } @> class="form-textbox" /><@ if (sublabel) { @><span class="form-sub-label"><@=sublabel@></span></div><@ } @>';

        this._super('number', prop, template);
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
                id        : this.getFieldName(true),
                name      : this.getFieldName(),
                size      : this.getProperty('size').value,
                maxsize   : this.getProperty('maxsize').value,
                minValue  : this.getProperty('minValue').value,
                maxValue  : this.getProperty('maxValue').value,
                addAmount : this.getProperty('addAmount').value,
                required  : this.getProperty('required').value == 'Yes',
                readonly  : this.getProperty('readonly').value == 'Yes',
                hint      : this.getProperty('hint').value,
                value     : this.getProperty('defaultValue').value,
                sublabel  : this.getProperty('subLabel').value
            })
        });
    }

});
