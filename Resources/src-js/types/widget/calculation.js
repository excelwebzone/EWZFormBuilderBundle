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
            },
            readonly: {
                text: 'Read-only',
                value: 'Yes',
                dropdown: [
                    ['No', 'No'],
                    ['Yes', 'Yes']
                ]
            },
            formula: {
                hidden: true,
                value: ''
            },
            injectJS: {
                text: 'Inject Custom JS',
                value: '',
                textarea: true
            }
        };

        var template = '<@ if (sublabel) { @><div class="form-sub-label-container"><@ } @><input type="text" name="<@=id@>" id="field_<@=id@>" size="<@=size@>" value="<@=value@>" <@ if (readonly) { @>readonly="readonly"<@ } @> class="form-textbox" /><@ if (sublabel) { @><span class="form-sub-label"><@=sublabel@></span></div><@ } @>';

        this._super('calculation', prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        return this.getFieldElement().val();
    },

    /**
     * Calculate formula
     */
    calc: function () {
        var array = this.getProperty('formula').value || [],
            formula = [];
        for (var key in array) {
            var value = array[key].text;
            if (array[key].color == 'orange') {
                if (this.getBuilder().getName()) {
                    value = this.getBuilder().getName() + '[' + value + ']';
                }
                value = this.getBuilder().getType(value).val();
                if (typeof value == 'object') {
                    var tmp = 0;
                    for (var i in value) {
                        tmp += parseFloat(0+value[i]);
                    }
                    value = tmp;
                } else {
                    value = parseFloat(0+value);
                }
            }
            formula.push(value);
        }

        try {
            value = eval(formula.join(''));

            var injectJS = this.getProperty('injectJS');
            if (injectJS) {
                eval('function(value){' + injectJS.replace(/\n/g, '') + '}()(' + value + ')');
            }
        } catch (e) {
            value = '0';
        }
        this.getFieldElement().val(value);
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
            id    : this.getFieldName(),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                id       : this.getFieldName(),
                size     : this.getProperty('size').value,
                readonly : this.getProperty('readonly').value == 'Yes',
                value    : this.getProperty('defaultValue').value,
                sublabel : this.getProperty('subLabel').value
            }),
            wizard : true
        });
    }

});
