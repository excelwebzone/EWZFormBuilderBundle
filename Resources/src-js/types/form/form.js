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
            title: {
                text: 'Title',
                value: 'Untitled Form'
            },
            formWidth: {
                text: 'Form Width',
                value: '690',
                unit: 'px'
            },
            labelWidth: {
                text: 'Label Width',
                value: '150'
            },
            isDefault: {
                text: 'Is Default?',
                value: 'No',
                dropdown: [
                    ['No', 'No'],
                    ['Yes', 'Yes']
                ]
            },
            status: {
                text: 'Status',
                value: 'Enabled',
                dropdown: [
                    ['Enabled', 'Enabled'],
                    ['Disabled', 'Disabled']
                ]
            },
            injectCSS: {
                text: 'Inject Custom CSS',
                value: '',
                type: 'textarea'
            },

            /* override */
            defaultValue: {
                hidden: true,
                value: ''
            }
        };

        var template = '<input type="hidden" name="<@=id@>" id="field_<@=id@>" data-title="<@=title@>" data-form-width="<@=formWidth@>" data-label-width="<@=labelWidth@>" value="<@=value@>" class="form-hidden" />';

        this._super('form', prop, template);

        this.removeProperty('fieldName');

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
        $('.form-list').css('width', this.getProperty('formWidth').value);
        $('[class*="form-label-"]').css('width', this.getProperty('labelWidth').value);

        return this._super({
            id    : this.getFieldName(),
            type  : this.getType(),
            style : 'form-input-hidden',
            html  : Utils.tmpl(this.TEMPLATE_, {
                id         : this.getFieldName(),
                value      : this.getProperty('id').value,
                title      : this.getProperty('title').value,
                formWidth  : this.getProperty('formWidth').value,
                labelWidth : this.getProperty('labelWidth').value
            }),
            tools : false
        });
    }

});
