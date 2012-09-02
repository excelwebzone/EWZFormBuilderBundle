
// declare the form builder
var builder = new FormBuilder();

var saving = false;

/**
 * Handle form preview.
 */
function handlePreview() {

    $('.form-description').each(function () {
        var 
            right = $(this).hasClass('right'),
            cont = $(this).closest('.form-line'),
            arrow = $(this).children('.form-description-arrow'),
            arrowsmall = $(this).children('.form-description-arrow-small'),
            indicator = $(this).children('.form-description-indicator')
        ;

        if ((cont.width() / 2) < $(this).width()) {
            $(this).css('right', '-' + (cont.width() - (right ? 100 : 20)) + 'px');
        }
        if (right) {
            var h = indicator.height();
            arrow.css('top', ((h / 2) - 20) + 'px');
            arrowsmall.css('top', ((h / 2) - 17) + 'px');
        }
    });

}

/**
 * Handle form editor.
 */
function handleEditor() {

    $('#form-editor').bind('click', function() {
        $('.form-line').removeClass('question-selected').removeClass('question-over');
    });

    $('.form-list').sortable({
        placeholder: 'ui-sortable-placeholder',
        forcePlaceholderSize: true,
        update: function(event, ui) {
            builder.sort($('.form-list').sortable('toArray'));
        }
    });
    $('.form-list').disableSelection();

    $('.form-action-info').bind('click', function () {
        // ignore on saving
        if (saving) return;

        // get form type
        var elem = builder.getType('form');

        // open dialog
        $('#props-dialog-form')
            .dialog('option', 'height', 'auto')
            .dialog('open')
            .children('form')
                .html(builder.makeProperties(elem));
    });

    $('.form-action-save').bind('click', function () {
        var $this = $(this);

        // disable sorting and toolbar actions
        $('.form-select-type').val('').find('eq(0)').attr('selected', true);
        $('.form-list').sortable('disable');
        $('.form-toolbar .actions').hide();
        $('.form-toolbar .loading').show();
        $('.form-line').removeClass('question-selected').removeClass('question-over');

        $.ajax({
            url: $this.attr('href'),
            type: 'POST',
            dataType: 'json',
            data: {
                properties: builder.getFormData()
            },
            complete: function (xhr, status) {
                var json;

                // this is here to catch non-empty, non-JSON responses
                try {
                    json = $.parseJSON(xhr.responseText);
                    if (null !== json) {
                        $this.trigger(json.event, [json.data]);

                        if (json.event == 'form_builder:error') {
                            throw json.data.message;
                        }

                        // reload saved fields
                        $.each(json.data.fields, function (key, value) {
                            if (value.type == 'text') {
                                value.text = value.text.substring(0, 30);
                            }

                            var tmpl = Utils.tmpl('<option value="<@=value@>" data-type="<@=type@>" data-prop="<@=prop@>" disabled="disabled"><@=text@></option>', {
                                value : value.name,
                                type  : value.type,
                                prop  : value,
                                text  : '{' + value.type + '} ' + value.text
                            });

                            var option = $('.form-select-type').find('option[value=' + value.name + ']');
                            if (option.length) {
                                option.data('prop', value);
                                option.text('{' + value.type + '} ' + value.text);
                                option.attr('disabled', true);
                            }
                            else $('.form-select-type').append($(tmpl));
                        });

                        // enable sorting and toolbar actions
                        $('.form-list').sortable('enable');
                        $('.form-toolbar .actions').show();
                        $('.form-toolbar .loading').hide();
                        resetListRules();
                    }

                    // this catches empty or otherwise non-JSON responses
                    else {
                        throw null;
                    }
                } catch (e) {
                    $this.trigger('form_builder:error', [{
                        message: e || 'An error occurred while removing file.'
                    }]);
                }
            }
        });

        return false;
    });

    $('.form-action-type').bind('click', function () {
        // ignore on saving
        if (saving) return;

        var type = $(this).data('type');
        var elem = eval('new FormBuilder.' + type.charAt(0).toUpperCase() + type.slice(1) + 'Type()');
        elem.load($(this).data('prop') || {});

        // add new type
        builder.addType(elem);

        // add new field to list (after selected element or last)
        if ($('.form-line.question-selected').length) $('.form-line.question-selected:eq(0)').after(elem.render());
        else $('.form-list').append(elem.render());

        // reset rules
        resetListRules();

        // focus
        focusItem(elem);
    });

    $('.form-select-type').bind('change', function () {
        // ignore on saving
        if (saving) return;

        // ignore on empty value
        if (!$(this).val()) return;

        var selected = $(this).find('option:selected');
        selected.attr('disabled', true);

        // ignore if already been added to form
        if (builder.getType(selected.val())) return;

        var type = selected.data('type');
        var elem = eval('new FormBuilder.' + type.charAt(0).toUpperCase() + type.slice(1) + 'Type()');
        elem.load(selected.data('prop') || {});
        elem.setFieldName(selected.val());

        // add new type
        builder.addType(elem);

        // add new field to list (after selected element or last)
        if ($('.form-line.question-selected').length) $('.form-line.question-selected:eq(0)').after(elem.render());
        else $('.form-list').append(elem.render());

        // reset rules
        resetListRules();

        // focus
        focusItem(elem);
    });

    $('#props-dialog-form').dialog({
        title: 'Properties',
        autoOpen: false,
        width: 420,
        maxHeight: 320,
        modal: true,
        resizable: false,
        buttons: {
            'OK': function () {
                var 
                    form   = $(this).children('form'),
                    elem   = builder.getType(form.find('input[name=elem_id]').val()),
                    values = form.serializeArray()
                ;
                // re-assign values
                $.each(values, function (key, value) {
                    elem.setPropertyValue(value.name, value.value);
                });
                // re-render
                reRenderItem(elem);

                $(this).dialog('close');
            },
            Cancel: function () {
                $(this).dialog('close');
            }
        },
        open: function(event, ui) {
            $(this).css({
                'max-height': 320,
                'overflow-y': 'auto'
            });
        },
        close: function () {
            $('.prop-table tbody').html('');
        }
    });

}

/**
 * Reset list rules and actions.
 */
function resetListRules() {
    // break on preview
    if ($('#form-preview').length) return false;

    $('.form-line')
        .bind('mouseover', function () {
            $('.form-line').removeClass('question-over');
            if (!$(this).hasClass('question-selected')) {
                $(this).addClass('question-over');
            }
        })
        .bind('mouseout', function () {
            $('.form-line').removeClass('question-over');
        })
        .bind('click', function (event) {
            // ignore on saving
            if (saving) return;

            $('.form-line').removeClass('question-selected').removeClass('question-over');
            $(this).addClass('question-selected');
            event.stopPropagation();
        });

    /**
     * Tools
     */

    $('.tool-item.required').bind('click', function () {
        var row = $(this).closest('.form-line');
        var elem = builder.getType(row.attr('id'));
        // toggle property
        elem.setPropertyValue('required', elem.getProperty('required').value == 'Yes' ? 'No' : 'Yes');
        // re-render
        reRenderItem(elem);
    });

    $('.tool-item.shrink, .tool-item.expand').bind('click', function () {
        var row = $(this).closest('.form-line');
        var elem = builder.getType(row.attr('id'));
        row.toggleClass('form-line-column');
        // set property
        if ($(this).hasClass('shrink')) {
            elem.setPropertyValue('labelAlign', 'Top');
            elem.setPropertyValue('column', 'Yes');
        } else {
            elem.setPropertyValue('labelAlign', 'Left');
            //elem.removeProperty('column');
            elem.setPropertyValue('column', 'No');
        }
        // re-render
        reRenderItem(elem);
    });

    $('.tool-item.new-line, .tool-item.merge-line').bind('click', function () {
        var row = $(this).closest('.form-line');
        var elem = builder.getType(row.attr('id'));
        row.toggleClass('form-line-column-clear');
        // set property
        if ($(this).hasClass('new-line')) {
            elem.setPropertyValue('column', 'Clear');
        } else {
            elem.setPropertyValue('column', 'Yes');
        }
        // re-render
        reRenderItem(elem);
    });

    $('.tool-item.gear').bind('click', function () {
        var row = $(this).closest('.form-line');
        var elem = builder.getType(row.attr('id'));
        // open dialog
        $('#props-dialog-form')
            .dialog('option', 'height', 'auto')
            .dialog('open')
            .children('form')
                .html(builder.makeProperties(elem));
    });

    $('.tool-item.cross').bind('click', function () {
        var row = $(this).closest('.form-line');
        builder.removeType(row.attr('id'));

        // re-activate in saved fields list
        $('.form-select-type').find('option[value=' + row.attr('id') + ']').attr('disabled', false);

        Utils.poof($(this));
        row.fadeOut(function () {
            $(this).remove();
        });
    });
};

/**
 * Re-renders the element.
 *
 * @param {FormBuilder.Type} elem A form type instance
 */
function reRenderItem(elem) {
    // re-render
    elem.reRender();
    // reset rules
    resetListRules();
    // focus
    focusItem(elem);
}

/**
 * Auto select elements.
 *
 * @param {FormBuilder.Type} elem A form type instance
 */
function focusItem(elem) {
    $('#' + elem.getFieldName()).trigger('click');
}
