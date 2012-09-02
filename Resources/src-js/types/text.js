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
                value: '...',
                textarea: true
            }
        };

        var template = '<div class="form-html"><@=text@></div>';

        this._super('text', prop, template);
    },

    /**
     * @inheritDoc
     */
    render: function(data) {
        return this._super({
            id    : this.getFieldName(true),
            type  : this.getType(),
            html  : Utils.tmpl(this.TEMPLATE_, {
                text : this.getProperty('text').value
            }),
            tools : false
        });
    }

});
