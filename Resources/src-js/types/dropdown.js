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
                text: 'Title',
                value: '....',
                reserved: true
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
                ],
                reserved: true
            },
            options: {
                text: 'Options',
                value: 'Option 1|Option 2|Option 3',
                textarea: true,
                splitter: '|',
                reserved: true
            },
            special: {
                hidden: true,
                text: 'Special Options',
                value: 'None',
                dropdown: [
                    ['None', 'None']
                ],
                ajax: {
                    url: '',
                    type: 'POST',
                    data: {},
                    params: []
                },
                reserved: true
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
                dropdown: 'options',
                reserved: true
            },
            subLabel: {
                text: 'Sub Label',
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

        var template = '<select name="<@=name@>" id="field_<@=name@>" size="<@=size@>" <@ if (required) { @>data-required=true<@ } @> <@ if (width) { @>style="width:<@=width@>px"<@ } @> class="form-dropdown"><@=options@></select><i class="dropdown-edit"></i><@ if (sublabel) { @><span class="form-sub-label"><@=sublabel@></span><@ } @>';

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
            required    : this.getProperty('required').value == 'Yes'
        });

        // override to prevent recursive load
        if (!options && this.processAjaxCall_) {
            options = $('#field_' + this.getFieldName()).html();
        }

        if (!options) {
            var options = '', selected = this.getProperty('selected').value;
            $.each(this.getProperty('options').value.split(this.getProperty('options').splitter), function (key, value) {
                options += '<option value="' + value + '" ' + (selected == value ? 'selected="selected"' : '') + '>' + value + '</option>';
            });

            // replace options with special options
            if (this.getProperty('special').ajax.url) {
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
                                options = '<option value=""></option>';
                                $.each(json.data.entries, function (key, value) {
                                    options += '<option value="' + value.id + '" ' + (selected == value.id ? 'selected="selected"' : '') + '>' + value.name + '</option>';
                                });

                                // re-render
                                $this.reRender($this.render({}, options));

                            }
                        } catch (e) { console.log(e) }
                    }
                });
            }
            else if (this.getProperty('special').value != 'None') {
                options = '<option value=""></option>';
                $.each(this.getProperty('special').dropdown, function (key, value) {
                    options += '<option value="' + value[0] + '" ' + (selected == value[0] ? 'selected="selected"' : '') + '>' + value[1] + '</option>';
                });
            }
        }

        return this._super({
            id    : this.getFieldName(true),
            type  : this.getType(),
            label : label,
            html  : Utils.tmpl(this.TEMPLATE_, {
                name     : this.getFieldName(),
                size     : this.getProperty('size').value,
                required : this.getProperty('required').value == 'Yes',
                width    : this.getProperty('width').value,
                options  : options,
                sublabel : this.getProperty('subLabel').value
            })
        });
    }

});
