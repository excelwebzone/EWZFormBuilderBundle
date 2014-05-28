/**
 * Datetime type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.DatetimeType = FormBuilder.Type.extend({

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
            yearFrom: {
                text: 'Year From',
                type: 'number',
                value: ''
            },
            yearTo: {
                text: 'Year To',
                type: 'number',
                value: ''
            },
            allowTime: {
                text: 'Allow Time',
                value: 'Yes',
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
                ]
            },
            defaultTime: {
                text: 'Default Time',
                value: 'Yes',
                dropdown: [
                    ['Yes', 'Yes'],
                    ['No', 'No']
                ]
            },
            step: {
                text: 'Minute Stepping',
                value: '1',
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
            <div class="form-sub-label-container"><select name="<@=name@>[month]" id="field_<@=id@>_month" <@ if (readonly) { @>disabled="disabled"<@ } @> class="form-dropdown"><@=monthChoices@></select><span class="form-sub-label">Month</span></div> \
            <div class="form-sub-label-container"><select name="<@=name@>[day]" id="field_<@=id@>_day" <@ if (readonly) { @>disabled="disabled"<@ } @> class="form-dropdown"><@=dayChoices@></select><span class="form-sub-label">Day</span></div> \
            <div class="form-sub-label-container"><select name="<@=name@>[year]" id="field_<@=id@>_year" <@ if (readonly) { @>disabled="disabled"<@ } @> class="form-dropdown"><@=yearChoices@></select><span class="form-sub-label">Year</span></div> \
            <@ if (allowTime) { @> \
                <div class="form-sub-label-container"><strong>at</strong><span class="form-sub-label">&nbsp;</span></div> \
                <div class="form-sub-label-container"><select name="<@=name@>[hour]" id="field_<@=id@>_hour" <@ if (readonly) { @>disabled="disabled"<@ } @> class="form-dropdown"><@=hourChoices@></select><span class="form-sub-label">Hour</span></div> \
                <div class="form-sub-label-container"><select name="<@=name@>[minute]" id="field_<@=id@>_minute" <@ if (readonly) { @>disabled="disabled"<@ } @> class="form-dropdown"><@=minuteChoices@></select><span class="form-sub-label">Minutes</span></div> \
                <@ if (timeFormat == "AM/PM") { @> \
                    <div class="form-sub-label-container"><select name="<@=name@>[ampm]" id="field_<@=id@>_ampm" <@ if (readonly) { @>disabled="disabled"<@ } @> class="form-dropdown"><@=ampmChoices@></select><span class="form-sub-label">&nbsp;</span></div> \
                <@ } @> \
            <@ } @> \
        ';

        this._super('datetime', prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        var data = {
            month: $('#field_' + this.getFieldName(true) + '_month').val(),
            day: $('#field_' + this.getFieldName(true) + '_day').val(),
            year: $('#field_' + this.getFieldName(true) + '_year').val(),
        };

        if (this.getProperty('allowTime').value == 'Yes') {
            data = $.extend(data, {
                hour: $('#field_' + this.getFieldName(true) + '_hour').val(),
                minute: $('#field_' + this.getFieldName(true) + '_minute').val(),
            });

            if (this.getProperty('timeFormat').value == 'AM/PM') data.ampm = $('#field_' + this.getFieldName(true) + '_ampm').val();
        }

        return Utils.stringify(data);
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

        var defaultValue = this.getProperty('defaultValue').value;
        if (defaultValue) defaultValue = $.parseJSON(defaultValue || {});

        var years = months = days = '<option value=""></option>';
        var monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var date = new Date(),
            years = months = days = hours = minutes = '<option value=""></option>',
            ampm = '';

        // set to now
        if (this.getProperty('defaultTime').value == 'Yes' && !defaultValue) {
            defaultValue = {
                year: date.getFullYear(),
                month: date.getMonth(),
                day: date.getDate(),
                hour: date.getHours(),
                minute: date.getMinutes(),
                ampm: date.getHours() < 12 ? 'am' : 'pm'
            };

            if (this.getProperty('step').value > 1) {
                var diff = Math.ceil(defaultValue.minute / this.getProperty('step').value);

                defaultValue.minute = diff * this.getProperty('step').value;
            }
        }

        var monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var date = new Date();
        var yearFrom = this.getProperty('yearFrom').value || date.getFullYear()-100;
        var yearTo = this.getProperty('yearTo').value || date.getFullYear();

        for (var i=yearFrom; i<=yearTo; i++) {
            years = years + '<option value="' + i + '" ' + (defaultValue && defaultValue['year'] == i ? 'selected="selected"' : null) + '>' + i + '</option>';
        }
        for (var i=1; i<=12; i++) {
            months = months + '<option value="' + i + '" ' + (defaultValue && defaultValue['month'] == i ? 'selected="selected"' : null) + '>' + monthString[i-1] + '</option>';
        }
        for (var i=1; i<=32; i++) {
            days = days + '<option value="' + i + '" ' + (defaultValue && defaultValue['day'] == i ? 'selected="selected"' : null) + '>' + i + '</option>';
        }

        if (this.getProperty('allowTime').value == 'Yes') {
            if (this.getProperty('defaultValue').value == 'AM/PM') {
                for (var i=1; i<=12; i++) {
                    hours = hours + '<option value="' + i + '" ' + (defaultValue && defaultValue['hour'] == i ? 'selected="selected"' : null) + '>' + (i>=10?i:'0'+i) + '</option>';
                }
            } else {
                for (var i=0; i<=23; i++) {
                    hours = hours + '<option value="' + i + '" ' + (defaultValue && defaultValue['hour'] == i ? 'selected="selected"' : null) + '>' + (i>=10?i:'0'+i) + '</option>';
                }
            }
            for (var i=0; i<60; i+=this.getProperty('step').value) {
                minutes = minutes + '<option value="' + i + '" ' + (defaultValue && defaultValue['minute'] == i ? 'selected="selected"' : null) + '>' + (i>=10?i:'0'+i) + '</option>';
            }
            if (this.getProperty('defaultValue').value == 'AM/PM') {
                if (this.getProperty('showDayPeriods').value == 'both' || this.getProperty('showDayPeriods').value == 'amOnly') {
                    ampm = ampm + '<option value="am" ' + (defaultValue && defaultValue['ampm'] == 'am' ? 'selected="selected"' : null) + '>AM</option>';
                }
                if (this.getProperty('showDayPeriods').value == 'both' || this.getProperty('showDayPeriods').value == 'pmOnly') {
                    ampm = ampm + '<option value="pm" ' + (defaultValue && defaultValue['ampm'] == 'pm' ? 'selected="selected"' : null) + '>PM</option>';
                }
            }
        }

        return this._super({
            id    : this.getFieldName(true),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                id            : this.getFieldName(true),
                name          : this.getFieldName(),
                required      : this.getProperty('required').value == 'Yes',
                readonly      : this.getProperty('readonly').value == 'Yes',
                monthChoices : months,
                dayChoices   : days,
                yearChoices  : years,
                allowTime     : this.getProperty('allowTime').value == 'Yes',
                timeFormat    : this.getProperty('timeFormat').value,
                hourChoices   : hours,
                minuteChoices : minutes,
                ampmChoices   : ampm
            })
        });
    }

});