/**
 * Form collapse type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.FormcollapseType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Text',
                value: 'Click to edit this text...',
                nolabel: true
            },
            status: {
                text: 'Status',
                value: 'Closed',
                dropdown: [
                    ['Closed', 'Closed'],
                    ['Open', 'Open']
                ]
            },
            visibility: {
                text: 'Visibility',
                value: 'Visible',
                dropdown: [
                    ['Visible', 'Visible'],
                    ['Hidden', 'Hidden']
                ]
            },

            /* override */
            defaultValue: {
                hidden: true,
                value: ''
            }
        };

        var template = ' \
            <div class="form-collapse-table <@ if (visibility == "Hidden") { @>form-collapse-hidden<@ } @>" id="collapse_<@=id@>"> \
                <span class="form-collapse-mid" id="collapse-text_<@=id@>"><@=text@></span> \
                <span class="form-collapse-right form-collapse-right-<@ if (status == "Closed") { @>hide<@ } else { @>show<@ } @>">&nbsp;</span> \
            </div> \
        ';

        this._super('formcollapse', prop, template);
    },

    /**
     * @inheritDoc
     */
    render: function(data) {
        return this._super({
            id    : this.getFieldName(),
            type  : this.getType(),
            style : 'form-input-wide',
            html  : Utils.tmpl(this.TEMPLATE_, {
                id         : this.getFieldName(),
                text       : this.getProperty('text').value,
                status     : this.getProperty('status').value,
                visibility : this.getProperty('visibility').value
            }),
            tools : false
        });
    }

});
