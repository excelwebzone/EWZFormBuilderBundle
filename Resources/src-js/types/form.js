/**
 * Form type: a hidden field to hold all form properties
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.FormType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            id: {
                text: 'ID',
                value: '',
                hidden: true
            },
            text: {
                text: 'Title',
                value: '...'
            },
            width: {
                text: 'Width',
                value: 691
            },
            labelWidth: {
                text: 'Label Width',
                value: 150
            },
            isDefault: {
                text: 'Is Default?',
                value: 'No',
                dropdown: [
                    ['No', 'No'],
                    ['Yes', 'Yes']
                ]
            }
        };

        var template = '<input type="hidden" name="<@=name@>" id="field_<@=name@>" data-title="<@=title@>" data-width="<@=width@>" data-label-width="<@=labelWidth@>" value="<@=value@>" class="form-hidden" />';

        this._super('form', prop, template);

        this.fieldName_ = 'form';
    },

    /**
     * @inheritDoc
     */
    val: function () {
        return this.getProperty('id').value;
    },

    /**
     * @inheritDoc
     */
    render: function(data) {
        // update layout
        $('.form-list').css('width', this.getProperty('width').value);
        $('[class*="form-label-"]').css('width', this.getProperty('labelWidth').value);

        return this._super({
            id    : this.getFieldName(true),
            type  : this.getType(),
            style : 'form-input-hidden',
            html  : Utils.tmpl(this.TEMPLATE_, {
                name       : this.getFieldName(),
                value      : this.getProperty('id').value,
                title      : this.getProperty('title').value,
                width      : this.getProperty('width').value,
                labelWidth : this.getProperty('labelWidth').value
            }),
            tools : false
        });
    }

});
