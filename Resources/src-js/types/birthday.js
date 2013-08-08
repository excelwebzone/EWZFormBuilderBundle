/**
 * Birthday type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.BirthdayType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Title',
                value: 'Birth Day',
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
            /* format: {
                text: 'Date Format',
                value: 'mmddyyyy',
                dropdown: [
                    ['mmddyyyy', 'mmddyyyy'],
                    ['ddmmyyyy', 'ddmmyyyy']
                ]
            }, */
            defaultValue: {
                hidden: true,
                text: 'Default Value',
                value: '',
                reserved: true
            },
            description: {
                text: 'Hover Text',
                value: '',
                textarea: true,
                reserved: true
            }
        };

        var template = ' \
            <span class="form-sub-label-container"><select id="field_<@=id@>_month" name="<@=name@>[month]" class="form-dropdown"><@=month_options@></select> <label id="sublabel_month" for="id="field_<@=id@>_month" class="form-sub-label">Month</label></span> \
            <span class="form-sub-label-container"><select id="field_<@=id@>_day" name="<@=name@>[day]" class="form-dropdown"><@=day_options@></select> <label id="sublabel_day" for="field_<@=id@>_day" class="form-sub-label">Day</label></span> \
            <span class="form-sub-label-container"><select id="field_<@=id@>_year" name="<@=name@>[year]" class="form-dropdown"><@=year_options@></select> <label id="sublabel_year" for="field_<@=id@>_year" class="form-sub-label">Year</label></span> \
        ';

        this._super('birthday', prop, template);
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

        var date = new Date();
        var defaultValue = this.getProperty('defaultValue').value;
        var years = months = days = '<option value=""></option>';
        var monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        for (var i=date.getFullYear()-100; i<=date.getFullYear(); i++) {
            years = years + '<option value="' + i + '" ' + (defaultValue && defaultValue['year'] == i ? 'selected="selected"' : null) + '>' + i + '</option>';
        }
        for (var i=1; i<=12; i++) {
            months = months + '<option value="' + i + '" ' + (defaultValue && defaultValue['month'] == i ? 'selected="selected"' : null) + '>' + monthString[i-1] + '</option>';
        }
        for (var i=1; i<=32; i++) {
            days = days + '<option value="' + i + '" ' + (defaultValue && defaultValue['day'] == i ? 'selected="selected"' : null) + '>' + i + '</option>';
        }

        return this._super({
            id    : this.getFieldName(true),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                id            : this.getFieldName(true),
                name          : this.getFieldName(),
                size          : this.getProperty('size').value,
                maxsize       : this.getProperty('maxsize').value,
                required      : this.getProperty('required').value == 'Yes',
                hint          : this.getProperty('hint').value,
                month_options : months,
                day_options   : days,
                year_options  : years,
            })
        });
    }

});
