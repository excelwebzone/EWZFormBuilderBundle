/**
 * Fullname type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.FullnameType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Question',
                value: 'Full Name'
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
            prefix: {
                text: 'Prefix',
                value: 'No',
                dropdown: [
                    ['Yes', 'Yes'],
                    ['No', 'No']
                ]
            },
            prefixChoices: {
                text: 'Prefix Choices',
                value: '',
                splitter: '|',
                textarea: true
            },
            suffix: {
                text: 'Suffix',
                value: 'No',
                dropdown: [
                    ['Yes', 'Yes'],
                    ['No', 'No']
                ]
            },
            middle: {
                text: 'Middle Name',
                value: 'No',
                dropdown: [
                    ['Yes', 'Yes'],
                    ['No', 'No']
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
            <@ if (prefix) { @> \
                <div class="form-sub-label-container"> \
                <@ if (prefixChoices) { @> \
                    <select name="<@=id@>[prefix]" id="field_<@=id@>_prefix"><@=prefixChoices@></select> \
                <@ } else { @> \
                    <input type="text" name="<@=id@>[prefix]" id="field_<@=id@>_prefix" size="4" value="<@=value.prefix@>" <@ if (required) { @>required="required"<@ } @> <@ if (readonly) { @>readonly="readonly"<@ } @> class="form-textbox" /> \
                <@ } @> \
                <span class="form-sub-label">Prefix</span></div> \
            <@ } @> \
            <div class="form-sub-label-container"><input type="text" name="<@=id@>[first]" id="field_<@=id@>_first" size="10" value="<@=value.first@>" <@ if (required) { @>required="required"<@ } @> <@ if (readonly) { @>readonly="readonly"<@ } @> class="form-textbox" /><span class="form-sub-label">First Name</span></div> \
            <@ if (middle) { @> \
                <div class="form-sub-label-container"><input type="text" name="<@=id@>[middle]" id="field_<@=id@>_middle" size="10" value="<@=value.middle@>" <@ if (required) { @>required="required"<@ } @> <@ if (readonly) { @>readonly="readonly"<@ } @> class="form-textbox" /><span class="form-sub-label">Middle Name</span></div> \
            <@ } @> \
            <div class="form-sub-label-container"><input type="text" name="<@=id@>[last]" id="field_<@=id@>_last" size="15" value="<@=value.last@>" <@ if (required) { @>required="required"<@ } @> <@ if (readonly) { @>readonly="readonly"<@ } @> class="form-textbox" /><span class="form-sub-label">Last Name</span></div> \
            <@ if (suffix) { @> \
                <div class="form-sub-label-container"><input type="text" name="<@=id@>[suffix]" id="field_<@=id@>_suffix" size="4" value="<@=value.suffix@>" <@ if (required) { @>required="required"<@ } @> <@ if (readonly) { @>readonly="readonly"<@ } @> class="form-textbox" /><span class="form-sub-label">Suffix</span></div> \
            <@ } @> \
        ';

        this._super('fullname', prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        var data = {
            first: this.getFieldElement(this.getFieldName() + '[first]').val(),
            last: this.getFieldElement(this.getFieldName() + '[last]').val()
        };

        if (this.getProperty('prefix').value == 'Yes') data.prefix = this.getFieldElement(this.getFieldName() + '[prefix]').val();
        if (this.getProperty('middle').value == 'Yes') data.middle = this.getFieldElement(this.getFieldName() + '[middle]').val();
        if (this.getProperty('suffix').value == 'Yes') data.suffix = this.getFieldElement(this.getFieldName() + '[suffix]').val();

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

        var prefix = defaultValue && defaultValue['prefix'] ? defaultValue['prefix'] : '';
        var first = defaultValue && defaultValue['first'] ? defaultValue['first'] : '';
        var middle = defaultValue && defaultValue['middle'] ? defaultValue['middle'] : '';
        var last = defaultValue && defaultValue['last'] ? defaultValue['last'] : '';
        var suffix = defaultValue && defaultValue['suffix'] ? defaultValue['suffix'] : '';

        prefixChoices = '';
        if (this.getProperty('prefix').value == 'Yes') {
            $.each(this.getProperty('prefixChoices').value.split(this.getProperty('prefixChoices').splitter), function (key, value) {
                prefixChoices += '<option value="' + value + '" ' + (defaultValue && defaultValue['prefix'] == value ? 'selected="selected"' : '') + '>' + value + '</option>';
            });
        }

        return this._super({
            id    : this.getFieldName(),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                id            : this.getFieldName(),
                required      : this.getProperty('required').value == 'Yes',
                readonly      : this.getProperty('readonly').value == 'Yes',
                prefix        : this.getProperty('prefix').value == 'Yes',
                prefixChoices : prefixChoices,
                middle        : this.getProperty('middle').value == 'Yes',
                suffix        : this.getProperty('suffix').value == 'Yes',
                value         : {
                    prefix        : prefix,
                    first         : first,
                    middle        : middle,
                    last          : last,
                    suffix        : suffix
                }
            })
        });
    }

});
