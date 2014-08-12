/**
 * Matrix type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.MatrixType = FormBuilder.Type.extend({

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
                value: 'Top',
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
            matrixwidth: {
                text: 'Table Width',
                type: 'number',
                value: ''
            },
            matrixcells: {
                text: 'Cell Width',
                type: 'number',
                value: ''
            },
            matrixrows: {
                text: 'Rows',
                value: 'Service Quality' + '|' + 'Overall Hygiene' + '|' + 'Responsiveness' + '|' + 'Kindness and Helpfulness',
                textarea: true,
                splitter: '|'
            },
            matrixcolumns: {
                text: 'Columns',
                value: 'Very Satisfied' + '|' + 'Satisfied' + '|' + 'Somewhat Satisfied' + '|' + 'Not Satisfied',
                textarea: true,
                splitter: '|'
            },
            inputType: {
                text: 'Input Type',
                value: 'Radio Button',
                dropdown: [
                    ['Radio Button', 'Radio Button'],
                    ['Check Box', 'Check Box'],
                    ['Text Box', 'Text Box'],
                    ['Drop Down', 'Drop Down']
                ]
            },
            dropdown: {
                text: 'Dropdown Options',
                value: 'Yes|No',
                textarea: true,
                splitter: '|',
                hidden: true
            },
            description: {
                text: 'Hover Text',
                value: '',
                textarea: true
            }
        };

        var template = '<@=html@>';

        this._super('matrix', prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        return Utils.stringify({
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

        var tablewidth = this.getProperty('matrixwidth').value
            ? ' style="width: ' + this.getProperty('matrixwidth').value + 'px;"'
            : ''
        ;

        html = '<table cellpadding="0" cellspacing="0" class="form-matrix-table"' + tablewidth + '><tr>';
        html += '<th style="border:none">&nbsp;</th>';

        var cols = this.getProperty('matrixcolumns').value.split('|');

        var tdwidth = this.getProperty('matrixcells').value
            ? ' style="width: ' + this.getProperty('matrixcells').value + 'px;"'
            : ''
        ;

        for (var coli = 0; coli < cols.length; coli++) {
            html += '<th class="form-matrix-column-headers form-matrix-column_' + coli + '"' + tdwidth + '>' + cols[coli] + '</th>';
        }

        html += '</tr>';

        var mrows = this.getProperty('matrixrows').value.split('|');
        var mcolumns = this.getProperty('matrixcolumns').value.split('|');

        var qname = this.getFieldName();

        for (var ri = 0; ri < mrows.length; ri++) {
            var row = mrows[ri];

            html += '<tr>';
            html += '<th align="left" class="form-matrix-row-headers">' + row + '</th>';

            for (var j = 0; j < mcolumns.length; j++) {
                var mcol = mcolumns[j];
                var input;

                switch (this.getProperty('inputType').value) {
                    case 'Radio Button':
                        input = '<input class="form-radio" ' + (this.getProperty('required').value == 'Yes' ? 'required="required"' : '') + ' type="radio" name="' + qname + '[' + ri + ']" value="' + mcol + '" ' + (defaultValue && defaultValue[ri] == mcol ? 'checked="checked"' : '') + ' />';
                        break;

                    case 'Check Box':
                        input = '<input class="form-checkbox" ' + (this.getProperty('required').value == 'Yes' ? 'required="required"' : '') + ' type="checkbox" name="' + qname + '[' + ri + '][]" value="' + mcol + '" ' + (defaultValue && defaultValue[ri] == mcol ? 'checked="checked"' : '') + ' />';
                        break;

                    case 'Text Box':
                        input = '<input class="form-textbox" ' + (this.getProperty('required').value == 'Yes' ? 'required="required"' : '') + ' type="text" size="5" name="' + qname + '[' + ri + '][]" ' + (defaultValue && defaultValue[ri][j] ? 'value="' + defaultValue[ri][j] + '"' : '') + ' />';
                        break;

                    case 'Drop Down':
                        var dp = this.getProperty('dropdown').value.split('|');
                        var options = '<option></option>';
                        for (var dpd = 0; dpd < dp.length; dpd++) {
                            options += '<option value="' + Utils.escapeValue(dp[dpd]) + '" ' + (defaultValue && defaultValue[ri][j] == dp[dpd] ? 'selected="selected"' : '') + '>' + dp[dpd] + '</option>';
                        }

                        input = '<select class="form-dropdown" ' + (this.getProperty('required').value == 'Yes' ? 'required="required"' : '') + ' name="' + qname + '[' + ri + '][]">' + options + '</select>';
                        break;
                }

                html += '<td align="center" class="form-matrix-values" >' + input + '</td>';
            }

            html += '</tr>';
        }

        html += '</table>';

        return this._super({
            id    : this.getFieldName(),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                id       : this.getFieldName(),
                name     : this.getFieldName(),
                required : this.getProperty('required').value == 'Yes',
                html     : html
            })
        });
    }

});
