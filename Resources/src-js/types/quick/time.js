/**
 * Time type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.TimeType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Question',
                value: '....'
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
            timeFormat: {
                text: 'Time Format',
                value: 'AM/PM',
                dropdown: [
                    ['24 Hour', '24 Hour'],
                    ['AM/PM', 'AM/PM']
                ]
            },
            showDayPeriods: {
                text: 'Show Day Period',
                value: 'both',
                dropdown: [
                    ['both', 'Both AM & PM'],
                    ['amOnly', 'AM only'],
                    ['pmOnly', 'PM only']
                ]            },
            defaultTime: {
                text: 'Default Time',
                value: 'No',
                dropdown: [
                    ['Yes', 'Yes'],
                    ['No', 'No']
                ]
            },
            step: {
                text: 'Minute Stepping',
                value: '10',
                dropdown: [
                    ['1', '1'],
                    ['5', '5'],
                    ['10', '10'],
                    ['15', '15'],
                    ['20', '20'],
                    ['30', '30']
                ]
            },
            description: {
                text: 'Hover Text',
                value: ''
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
            <div class="form-sub-label-container"><select name="<@=id@>[hour]" id="field_<@=id@>_hour" <@ if (readonly) { @>disabled="disabled"<@ } @> class="form-dropdown"><@=hourChoices@></select><span class="form-sub-label">Hour</span></div> \
            <div class="form-sub-label-container"><select name="<@=id@>[minute]" id="field_<@=id@>_minute" <@ if (readonly) { @>disabled="disabled"<@ } @> class="form-dropdown"><@=minuteChoices@></select><span class="form-sub-label">Minutes</span></div> \
            <@ if (ampmTimeFormat) { @> \
                <div class="form-sub-label-container"><select name="<@=id@>[ampm]" id="field_<@=id@>_ampm" <@ if (readonly) { @>disabled="disabled"<@ } @> class="form-dropdown"><@=ampmChoices@></select><span class="form-sub-label">&nbsp;</span></div> \
            <@ } @> \
        ';

        this._super('time', prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        var data = {
            hour: $('#field_' + this.getFieldName() + '_hour').val(),
            minute: $('#field_' + this.getFieldName() + '_minute').val(),
        };

        if (this.getProperty('timeFormat').value == 'AM/PM') data.ampm = $('#field_' + this.getFieldName() + '_ampm').val();

        return Utils.stringify(data);
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

        var defaultValue = this.getProperty('defaultValue').value;

        var hours = minutes = '<option value=""></option>',
            ampm = '';

        // set to now
        if (this.getProperty('defaultTime').value == 'Yes' && !defaultValue) {
            var date = new Date();

            defaultValue = {
                hour: date.getHours(),
                minute: date.getMinutes(),
                ampm: date.getHours() < 12 ? 'am' : 'pm'
            };

            if (this.getProperty('step').value > 1) {
                var diff = Math.ceil(defaultValue.minute / this.getProperty('step').value);

                defaultValue.minute = diff * this.getProperty('step').value;
            }
        }

        if (this.getProperty('defaultValue').value == 'AM/PM') {
            for (var i=1; i<=12; i++) {
                hours = hours + '<option value="' + i + '" ' + (defaultValue && defaultValue['hour'] == i ? 'selected="selected"' : null) + '>' + (i>=10?i:'0'+i) + '</option>';
            }
        } else {
            for (var i=0; i<=23; i++) {
                hours = hours + '<option value="' + i + '" ' + (defaultValue && defaultValue['hour'] == i ? 'selected="selected"' : null) + '>' + (i>=10?i:'0'+i) + '</option>';
            }
        }
        for (var i=0; i<60; i+=parseInt(this.getProperty('step').value)) {
            minutes = minutes + '<option value="' + i + '" ' + (defaultValue && defaultValue['minute'] == i ? 'selected="selected"' : null) + '>' + (i>=10?i:'0'+i) + '</option>';
        }
        if (this.getProperty('timeFormat').value == 'AM/PM') {
            if (this.getProperty('showDayPeriods').value == 'both' || this.getProperty('showDayPeriods').value == 'amOnly') {
                ampm = ampm + '<option value="am" ' + (defaultValue && defaultValue['ampm'] == 'am' ? 'selected="selected"' : null) + '>AM</option>';
            }
            if (this.getProperty('showDayPeriods').value == 'both' || this.getProperty('showDayPeriods').value == 'pmOnly') {
                ampm = ampm + '<option value="pm" ' + (defaultValue && defaultValue['ampm'] == 'pm' ? 'selected="selected"' : null) + '>PM</option>';
            }
        }

        return this._super({
            id    : this.getFieldName(),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                id             : this.getFieldName(),
                required       : this.getProperty('required').value == 'Yes',
                readonly       : this.getProperty('readonly').value == 'Yes',
                ampmTimeFormat : this.getProperty('timeFormat').value == 'AM/PM',
                hourChoices    : hours,
                minuteChoices  : minutes,
                ampmChoices    : ampm
            })
        });
    }

});
