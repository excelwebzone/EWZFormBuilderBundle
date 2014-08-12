/**
 * Dropdown type
 *
 * @implements {FormBuilder.Type}
 */
FormBuilder.DropdownType = FormBuilder.Type.extend({

    /**
     * @var {Boolean}
     * @public
     */
    processAjaxCall_: false,

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
            options: {
                text: 'Options',
                value: 'Option 1|Option 2|Option 3',
                textarea: true,
                splitter: '|'
            },
            special: {
                text: 'Special Options',
                value: 'None',
                dropdown: Consts.specialOptions.getByType('dropdown')
            },
            calcValues: {
                text: 'Calculation Values',
                value: '',
                textarea: true,
                splitter: '|'
            },
            size: {
                text: 'Height',
                value: 0
            },
            width: {
                text: 'Width',
                value: 150
            },
            selected: {
                text: 'Selected',
                value: '',
                dropdown: 'options'
            },
            subLabel: {
                text: 'Sub Label',
                value: ''
            },
            description: {
                text: 'Hover Text',
                value: '',
                textarea: true
            },
            emptyText: {
                text: 'Empty Option Text',
                value: ''
            },

            /* override */
            defaultValue: {
                hidden: true,
                value: ''
            }
        };

        var template = '<@ if (sublabel) { @><div class="form-sub-label-container"><@ } @><select name="<@=id@>" id="field_<@=id@>" <@ if (required) { @>required="required"<@ } @> <@ if (size > 0) { @>size="<@=size@>" multiple="multiple"<@ } @> <@ if (width > 0) { @>style="width:<@=width@>px"<@ } @> class="form-dropdown" onchange="calculationFields()"><@=options@></select><@ if (sublabel) { @><span class="form-sub-label"><@=sublabel@></span></div><@ } @>';

        this._super('dropdown', prop, template);
    },

    /**
     * @inheritDoc
     */
    val: function () {
        return $('#field_' + this.getFieldName()).val();
    },

    /**
     * @inheritDoc
     *
     * @param {string} options Option tags string
     */
    render: function(data, options) {
        var label = Utils.tmpl('<label for="field_<@=id@>" class="form-label-<@=style@>" <@ if (description) { @>title="<@=description@>"<@ } @>><@=text@><@ if (required) { @><span class="form-required">*</span><@ } @></label>', {
            id          : this.getFieldName(),
            style       : this.getProperty('labelAlign').value.toLowerCase(),
            description : this.getProperty('description').value,
            text        : this.getProperty('text').value,
            required    : this.getProperty('required').value == 'Yes',
        });

        // override to prevent recursive load
        if (!options && this.processAjaxCall_) {
            options = $('#field_' + this.getFieldName()).html();
        }

        if (!options) {
            var dropdown     = [],
                options      = '',
                optionValues = [],
                selected     = this.getProperty('selected').value;

            // replace options with special options
            if (typeof this.getProperty('special').ajax != 'undefined') {
                var $this = this;

                $this.processAjaxCall_ = true;

                var data = $.extend(true, {}, $this.getProperty('special').ajax.data);

                // replace parameters with values
                $.each($this.getProperty('special').ajax.params || [], function (index, param) {
                    $.each(data, function (key, value) {
                        eval('data[key] = data[key].replace("{' + param + '}", eval(param));');
                    });
                });

                $.ajax({
                    url: this.getProperty('special').ajax.url,
                    type: this.getProperty('special').ajax.type || 'GET',
                    dataType: 'json',
                    data: data,
                    complete: function (xhr, status) {
                        var json;

                        // this is here to catch non-empty, non-JSON responses
                        try {
                            json = $.parseJSON(xhr.responseText);
                            if (null !== json) {
                                optionValues = [];
                                options = '<option value=""></option>';
                                $.each(json.data.entries, function (key, value) {
                                    options += '<option value="' + value.id + '" ' + (selected == value.id ? 'selected="selected"' : '') + '>' + value.name + '</option>';
                                    optionValues.push(value.id);
                                });

                                // re-render
                                $this.reRender($this.render({}, options));

                            }
                        } catch (e) { console.log(e) }
                    }
                });
            }
            // options or special
            else {

                // empty value
                options += '<option value="' + this.getProperty('emptyText').value + '">' + this.getProperty('emptyText').value + '</option>';

                // options
                if (this.getProperty('special').value == 'None') {
                    dropdown = this.getProperty('options').value.split(this.getProperty('options').splitter);
                }

                // special
                else {
                    dropdown = Consts.specialOptions[this.getProperty('special').value].value;
                }

                // calculation values
                var calcValues = this.getProperty('calcValues').value.split(this.getProperty('calcValues').splitter) || [];

                $.each(dropdown, function (key, value) {
                    var text = value;
                    value = typeof calcValues[key] != 'undefined' && calcValues[key] != '' ? calcValues[key] : value;

                    options += '<option value="' + value + '" ' + (selected == value ? 'selected="selected"' : '') + '>' + text + '</option>';
                    optionValues.push(key);
                });
            }
        }

        return this._super({
            id    : this.getFieldName(),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                id       : this.getFieldName(),
                size     : this.getProperty('size').value,
                width    : this.getProperty('width').value,
                required : this.getProperty('required').value == 'Yes',
                options  : options,
                sublabel : this.getProperty('subLabel').value
            })
        });
    }

});
