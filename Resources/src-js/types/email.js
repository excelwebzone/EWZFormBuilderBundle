/**
 * Email type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.EmailType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Title',
                value: 'Email',
                reserved: true
            },
            labelAlign: {
                text: 'Label Align',
                value: 'Left',
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
            size: {
                text: 'Size',
                value: 20
            },
            maxsize: {
                text: 'Max Size',
                value: ''
            },
            defaultValue: {
                text: 'Default Value',
                value: '',
                reserved: true
            },
            subLabel: {
                text: 'Sub Label',
                value: '',
                reserved: true
            },
            hint: {
                text: 'Hint Example',
                value: 'ex: myname@example.com',
                reserved: true
            },
            description: {
                text: 'Hover Text',
                value: '',
                textarea: true,
                reserved: true
            }
        };

        var template = '<@ if (sublabel) { @><div class="form-sub-label-container"><@ } @><input type="text" name="<@=name@>" id="field_<@=id@>" size="<@=size@>" <@ if (maxsize) { @>maxlength="<@=maxsize@>"<@ } @> <@ if (required) { @>data-required=true<@ } @> data-validation="Email" <@ if (hint) { @>placeholder="<@=hint@>"<@ } @> value="<@=value@>" class="form-textbox" /><@ if (sublabel) { @><span class="form-sub-label"><@=sublabel@></span></div><@ } @>';

        this._super('email', prop, template);
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
                id       : this.getFieldName(true),
                name     : this.getFieldName(),
                size     : this.getProperty('size').value,
                maxsize  : this.getProperty('maxsize').value,
                required : this.getProperty('required').value == 'Yes',
                hint     : this.getProperty('hint').value,
                value    : this.getProperty('defaultValue').value,
                sublabel : this.getProperty('subLabel').value
            })
        });
    }

});
