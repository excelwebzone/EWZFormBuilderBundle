/**
 * Calculation type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.CalculationType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Text',
                value: 'Calculation'
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
            size: {
                text: 'Size',
                value: 20
            },
            description: {
                text: 'Hover Text',
                value: '',
                textarea: true
            },
            subLabel: {
                text: 'Sub Label',
                value: ''
            }
        };

        var template = '<@ if (sublabel) { @><div class="form-sub-label-container"><@ } @><input type="text" name="<@=name@>" id="field_<@=id@>" size="<@=size@>" value="<@=value@>" class="form-textbox" /><@ if (sublabel) { @><span class="form-sub-label"><@=sublabel@></span></div><@ } @>';

        this._super('calculation', prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        return Utils.stringify({
        });
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
                id       : this.getFieldName(true),
                name     : this.getFieldName(),
                size     : this.getProperty('size').value,
                value    : this.getProperty('defaultValue').value,
                sublabel : this.getProperty('subLabel').value
            })
        });
    }

});
