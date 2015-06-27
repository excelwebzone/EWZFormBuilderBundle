/**
 * Radio type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.RadioType = FormBuilder.CheckboxType.extend({

    /**
     * @var {string}
     * @protected
     */
    inputType: 'radio',

    /**
     * @inheritDoc
     */
    val: function () {
        return $('input[type=radio][id^=field_' + this.getFieldName() + ']:checked').val();
    }

});
