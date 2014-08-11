/**
 * Text type (HTML)
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.TextType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'HTML',
                value: 'Double-click to edit this text...',
                textarea: true
            },

            /* override */
            defaultValue: {
                hidden: true,
                value: ''
            }
        };

        var template = '<div class="form-html"><@=text@></div>';

        this._super('text', prop, template);

        this.removeProperty('fieldName');
    },

    /**
     * @inheritDoc
     */
    render: function(data) {
        return this._super({
            id    : this.getFieldName(),
            type  : this.getType(),
            html  : Utils.tmpl(this.TEMPLATE_, {
                text : Utils.htmlDecode(Utils.stripslashes(this.getProperty('text').value))
            }),
            tools : false
        });
    }

});
