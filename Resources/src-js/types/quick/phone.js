/**
 * Phone type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.PhoneType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Question',
                value: 'Phone Number'
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
            countryCode: {
                text: 'Country Code',
                value: 'No',
                dropdown: [
                    ['No', 'No'],
                    ['Yes', 'Yes']
                ]
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

        var template = ' \
            <@ if (countryCode) { @> \
                <div class="form-sub-label-container"><input type="tel" name="<@=id@>[country]" id="field_<@=id@>_country" size="6" value="<@=value.country@>" <@ if (required) { @>required="required"<@ } @> <@ if (readonly) { @>readonly="readonly"<@ } @>class="form-textbox" /><span class="form-sub-label">Country Code</span></div> \
            <@ } @> \
            <div class="form-sub-label-container"><input type="tel" name="<@=id@>[area]" id="field_<@=id@>_area" size="3" value="<@=value.area@>" <@ if (required) { @>required="required"<@ } @> <@ if (readonly) { @>readonly="readonly"<@ } @>class="form-textbox" /><span class="form-sub-label">Area Code</span></div> \
            <div class="form-sub-label-container"><input type="tel" name="<@=id@>[phone]" id="field_<@=id@>_phone" size="8" value="<@=value.phone@>" <@ if (required) { @>required="required"<@ } @> <@ if (readonly) { @>readonly="readonly"<@ } @>class="form-textbox" /><span class="form-sub-label">Phone Number</span></div> \
        ';

        this._super('phone', prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        var data = {
            area: this.getFieldElement(this.getFieldName() + '[area]').val(),
            phone: this.getFieldElement(this.getFieldName() + '[phone]').val(),
        };

        if (this.getProperty('countryCode').value == 'Yes') data.country = this.getFieldElement(this.getFieldName() + '[country]').val();

        return Utils.stringify(data);
    },

    /**
     * @inheritDoc
     */
    render: function(data) {
        var label = Utils.tmpl('<label for="field_<@=id@>_area" class="form-label-<@=style@>" <@ if (description) { @>title="<@=description@>"<@ } @>><@=text@><@ if (required) { @><span class="form-required">*</span><@ } @></label>', {
            id          : this.getFieldName(),
            style       : this.getProperty('labelAlign').value.toLowerCase(),
            description : this.getProperty('description').value,
            text        : this.getProperty('text').value,
            required    : this.getProperty('required').value == 'Yes'
        });

        var defaultValue = this.getProperty('defaultValue').value;

        var country = defaultValue && defaultValue['country'] ? defaultValue['country'] : '';
        var area = defaultValue && defaultValue['area'] ? defaultValue['area'] : '';
        var phone = defaultValue && defaultValue['phone'] ? defaultValue['phone'] : '';

        return this._super({
            id    : this.getFieldName(),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                id          : this.getFieldName(),
                required    : this.getProperty('required').value == 'Yes',
                readonly    : this.getProperty('readonly').value == 'Yes',
                countryCode : this.getProperty('countryCode').value == 'Yes',
                value       : {
                    country : country,
                    area    : area,
                    phone   : phone
                }
            })
        });
    }

});
