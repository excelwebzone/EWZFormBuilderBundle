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
                text: 'Question',
                value: 'Birth Date'
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
            description: {
                text: 'Hover Text',
                value: '',
                textarea: true
            }
        };

        var template = ' \
            <div class="form-sub-label-container"><select name="<@=id@>[month]" id="field_<@=id@>_month" class="form-dropdown"><@=monthChoices@></select><span class="form-sub-label">Month</span></div> \
            <div class="form-sub-label-container"><select name="<@=id@>[day]" id="field_<@=id@>_day" class="form-dropdown"><@=dayChoices@></select><span class="form-sub-label">Day</span></div> \
            <div class="form-sub-label-container"><select name="<@=id@>[year]" id="field_<@=id@>_year" class="form-dropdown"><@=yearChoices@></select><span class="form-sub-label">Year</span></div> \
        ';

        this._super('birthday', prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        return Utils.stringify({
            month: this.getFieldElement(this.getFieldName() + '[month]').val(),
            day: this.getFieldElement(this.getFieldName() + '[day]').val(),
            year: this.getFieldElement(this.getFieldName() + '[year]').val(),
        });
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

        var years = months = days = '<option value=""></option>';
        var monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var date = new Date();
        var yearFrom = this.getProperty('yearFrom').value || date.getFullYear()-100;
        var yearTo = this.getProperty('yearTo').value || date.getFullYear();

        for (var i=yearFrom; i<=yearTo; i++) {
            years = years + '<option value="' + i + '" ' + (defaultValue && defaultValue['year'] == i ? 'selected="selected"' : '') + '>' + i + '</option>';
        }
        for (var i=1; i<=12; i++) {
            months = months + '<option value="' + i + '" ' + (defaultValue && defaultValue['month'] == i ? 'selected="selected"' : '') + '>' + monthString[i-1] + '</option>';
        }
        for (var i=1; i<=32; i++) {
            days = days + '<option value="' + i + '" ' + (defaultValue && defaultValue['day'] == i ? 'selected="selected"' : '') + '>' + i + '</option>';
        }

        return this._super({
            id    : this.getFieldName(),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                id           : this.getFieldName(),
                required     : this.getProperty('required').value == 'Yes',
                monthChoices : months,
                dayChoices   : days,
                yearChoices  : years
            })
        });
    }

});
