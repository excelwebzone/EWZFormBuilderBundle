/**
 * Head type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.HeadType = FormBuilder.Type.extend({

    /**
     * @constructor
     */
    init: function() {
        var prop = {
            text: {
                text: 'Text',
                value: 'Click to edit this text...'
            },
            subHeader: {
                text: 'Sub Heading',
                value: ''
            },
            headerType: {
                text: 'Heading Type',
                value: 'Default',
                dropdown: [
                    ['Default', 'Default'],
                    ['Large', 'Large'],
                    ['Small', 'Small']
                ]
            },

            /* override */
            defaultValue: {
                hidden: true,
                value: ''
            }
        };

        var template = '<div class="form-header-group"><<@=h@> class="form-header"><@=text@></<@=h@>><@ if (sub) { @><div class="form-subHeader"><@=sub@></div><@ } @></div>';

        this._super('head', prop, template);

        this.removeProperty('fieldName');
    },

    /**
     * @inheritDoc
     */
    render: function(data) {
        var headingType = 'h2';
        switch (this.getProperty('headerType').value) {
            case 'Large': headingType = 'h1'; break;
            case 'Small': headingType = 'h3'; break;
        }
        return this._super({
            id    : this.getFieldName(),
            type  : this.getType(),
            style : 'form-input-wide',
            html  : Utils.tmpl(this.TEMPLATE_, {
                h    : headingType,
                text : this.getProperty('text').value,
                sub  : this.getProperty('subHeader').value
            }),
            tools : false
        });
    }

});
