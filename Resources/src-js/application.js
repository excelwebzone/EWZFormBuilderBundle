var isPreviewMode = false;
var isSavingMode = false;
var currentBuilder = null;

/**
 * Update or add new types:
 *
 * The following example enabled the `isTable` property
 * and added `sortOrder` property.
 *
 * FormBuilder.FormType = FormBuilder.FormType.extend({
 *
 *     init: function() {
 *         this._super('init');
 *
 *         this.setPropertyValue('isTable', false, 'hidden');
 *
 *         this.setPropertyValue('sortOrder', false, 'hidden');
 *         this.setPropertyValue('sortOrder', 'Sort Order', 'text');
 *         this.setPropertyValue('sortOrder', '');
 *     }
 * });
 */

/**
 * Handle form preview.
 *
 * @param {FormBuilder} builder A form builder instance
 */
function handlePreview(builder) {
    isPreviewMode =true;

    $('#' + builder.getId()).find('.form-description').each(function () {
        var right = $(this).hasClass('right'),
            cont = $(this).closest('.form-line'),
            arrow = $(this).children('.form-description-arrow'),
            arrowsmall = $(this).children('.form-description-arrow-small'),
            indicator = $(this).children('.form-description-indicator');

        if ((cont.width() / 2) < $(this).width()) {
            $(this).css('right', '-' + (cont.width() - (right ? 100 : 20)) + 'px');
        }
        if (right) {
            var h = indicator.height();
            arrow.css('top', ((h / 2) - 20) + 'px');
            arrowsmall.css('top', ((h / 2) - 17) + 'px');
        }
    });

    // calculate "calculation" field formula's.
    for (var key in builder.getTypes()) {
        var type = builder.getTypes()[key];
        if (type.getType() == 'calculation') {
            type.calc();
        }
    }

    // enabled form section collapse effect.
    $('#' + builder.getId()).find('.form-line[data-type=formcollapse]').each(function () {
        $(this).on('click', function() {
            $('#form-preview > ul > ul.form-section')
                .not($(this).parent('ul'))
                .removeClass('form-section')
                .addClass('form-section-closed')
                    .find('.form-collapse-table .form-collapse-right')
                        .removeClass('form-collapse-right-show')
                        .addClass('form-collapse-right-hide');

            $(this).parent('ul')
                .toggleClass('form-section')
                .toggleClass('form-section-closed');



            if ($(this).parent('ul').hasClass('form-section')) {
                $(this).parent('ul')
                    .find('.form-collapse-table .form-collapse-right')
                        .removeClass('form-collapse-right-hide')
                        .addClass('form-collapse-right-show');
            } else {
                $(this).parent('ul')
                    .find('.form-collapse-table .form-collapse-right')
                        .removeClass('form-collapse-right-show')
                        .addClass('form-collapse-right-hide');
            }

            return false;
        });
    });

    if (!currentBuilder) currentBuilder = [];
    currentBuilder.push(builder);
};

/**
 * Calculate "calculation" field formula's.
 *
 * @param {Object} field A form field instance
 */
function calculationFields(field) {
    if (!isPreviewMode) return;

    var builderId = $(field).closest('[id^="builder_"]').attr('id');

    $.each(currentBuilder, function(index, builder) {
        if (builder.getId() == builderId) {
            for (var key in builder.getTypes()) {
                var type = builder.getTypes()[key];
                if (type.getType() == 'calculation') {
                    type.calc();
                }
            }

            return;
        }
    });
}

/**
 * The following function are used when creating or editing a form
 *
 * Note: design for one form builder only!
 */

/**
 * Handle form editor.
 */
function handleEditor() {
    if (isPreviewMode) return;

    $('#accordion-actions').accordion({
        header: '.accordion-bar'
    });

    $('#form-editor').on('click', function() {
        $('.form-line').removeClass('form-question-selected').removeClass('form-question-over');
    });

    $('.form-list').sortable({
        placeholder: 'ui-sortable-placeholder',
        forcePlaceholderSize: true,
        update: function(event, ui) {
            currentBuilder.sort($('.form-list').sortable('toArray'));
        }
    });
    $('.form-list').disableSelection();

    $('.form-action-info').on('click', function () {
        // ignore on saving
        if (isSavingMode) return;

        // get form type
        var elem = currentBuilder.getType('form');

        // open dialog
        $('#props-dialog-form')
            .dialog('option', 'height', 'auto')
            .dialog('open')
            .children('form')
                .html(currentBuilder.makeProperties(elem));
    });

    $('.form-action-save').on('click', function () {
        var $this = $(this);

        // disable sorting and toolbar actions
        $('.form-list').sortable('disable');
        $('.form-line').removeClass('form-question-selected').removeClass('form-question-over');
        $('#accordion-actions').accordion({
            disabled: true
        });

        $.ajax({
            url: $this.attr('href'),
            type: 'POST',
            dataType: 'json',
            data: {
                properties: currentBuilder.getFormData()
            },
            complete: function (xhr, status) {
                var json;

                // this is here to catch non-empty, non-JSON responses
                try {
                    json = $.parseJSON(xhr.responseText);
                    if (null !== json) {
                        if (json.event == 'form_builder:error') {
                            throw json.data.message;
                        }

                        // assign form id
                        currentBuilder.getType('form').setPropertyValue('id', json.data.id);

                        // reload saved fields
                        $.each(json.data.fields, function (key, value) {
                            if (value.type == 'text') {
                                value.text = value.text.substring(0, 30);
                            }

                            var tmpl = Utils.tmpl('<li class="form-saved-type" data-name="<@=value@>" data-type="<@=type@>" data-prop="<@=prop@>"><img src="/bundles/ewzformbuilder/images/blank.gif" class="controls-{{ field.getType() }}" /><span><@=text@></span></li>', {
                                value : value.name,
                                type  : value.type,
                                prop  : value,
                                text  : '{' + value.type + '} ' + value.text
                            });

                            var saved = $('.form-saved-type[data-name="' + value.name + '"]');
                            if (saved.length) {
                                saved.data('prop', value);
                                saved.text(value.text);
                                saved.hide();
                            }
                            else $('.form-saved-type').append($(tmpl));
                        });

                        // enable sorting and toolbar actions
                        $('.form-list').sortable('enable');
                        $('#accordion-actions').accordion({
                            disabled: false
                        });

                        resetListRules();

                        $this.trigger(json.event, [json.data]);
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

    $('.form-action-type').on('click', function () {
        // ignore on saving
        if (isSavingMode) return;

        var type = $(this).data('type');
        var elem = eval('new FormBuilder.' + type.charAt(0).toUpperCase() + type.slice(1) + 'Type()');

        // set the builder, need when reRender()
        elem.setBuilder(currentBuilder);

        // load form properties
        elem.load($(this).data('prop') || {});

        // add new type
        currentBuilder.addType(elem);

        // add new field to list (after selected element or last)
        if ($('.form-line.form-question-selected').length) $('.form-line.form-question-selected:eq(0)').after(elem.render());
        else $('.form-list').append(elem.render());

        // reset rules
        resetListRules();

        // focus
        focusItem(elem);
    });

    $('.form-saved-type').on('click', function () {
        // ignore on saving
        if (isSavingMode) return;

        // ignore if already been added to form
        if (currentBuilder.getType($(this).data('name'))) return;

        var type = $(this).data('type');
        var elem = eval('new FormBuilder.' + type.charAt(0).toUpperCase() + type.slice(1) + 'Type()');

        // set the builder, need when reRender()
        elem.setBuilder(currentBuilder);

        // load form properties
        elem.load($(this).data('prop') || {});

        // update field name
        elem.setFieldName($(this).data('name'));

        // add new type
        currentBuilder.addType(elem);

        // add new field to list (after selected element or last)
        if ($('.form-line.form-question-selected').length) $('.form-line.form-question-selected:eq(0)').after(elem.render());
        else $('.form-list').append(elem.render());

        // reset rules
        resetListRules();

        // focus
        focusItem(elem);

        // hide from save fields
        $(this).hide();
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
                var form      = $(this).children('form'),
                    elem      = currentBuilder.getType(form.find('input[name=elem_id]').val()),
                    values    = form.serializeArray(),
                    fieldName = elem.getFieldName();

                // re-assign values
                $.each(values, function (key, value) {
                    if (currentBuilder.isAllowManualFieldName && value.name == 'fieldName') {
                        elem.setFieldName(value.value);
                    }

                    elem.setPropertyValue(value.name, value.value);
                });
                // re-render
                reRenderItem(elem, fieldName);

                $(this).dialog('close');
            },
            Cancel: function () {
                $(this).dialog('close');
            }
        },
        open: function(event, ui) {
            $(this)
                .css({
                    'max-height': 320,
                    'overflow-y': 'auto'
                })
                .html('<form></form>');
        },
        close: function () {
            $('.form-prop-table tbody').html('');
        }
    });
};

/**
 * Reset list rules and actions.
 */
function resetListRules() {
    if (isPreviewMode) return;

    // break on preview
    if ($('#form-preview').length) return false;

    $('.form-line')
        .on('mouseover', function () {
            $('.form-line').removeClass('form-question-over');
            if (!$(this).hasClass('form-question-selected')) {
                $(this).addClass('form-question-over');
            }
        })
        .on('mouseout', function () {
            $('.form-line').removeClass('form-question-over');
        })
        .on('click', function (event) {
            // ignore on saving
            if (isSavingMode) return;

            $('.form-line').removeClass('form-question-selected').removeClass('form-question-over');
            $(this).addClass('form-question-selected');
            event.stopPropagation();
        });

    /**
     * Tools
     */

    $('.form-tool-item.required').on('click', function () {
        var row = $(this).closest('.form-line');
        var elem = currentBuilder.getType(row.attr('id'));
        // toggle property
        elem.setPropertyValue('required', elem.getProperty('required').value == 'Yes' ? 'No' : 'Yes');
        // re-render
        reRenderItem(elem);
    });

    $('.form-tool-item.shrink, .form-tool-item.expand').on('click', function () {
        var row = $(this).closest('.form-line');
        var elem = currentBuilder.getType(row.attr('id'));
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

    $('.form-tool-item.new-line, .form-tool-item.merge-line').on('click', function () {
        var row = $(this).closest('.form-line');
        var elem = currentBuilder.getType(row.attr('id'));
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

    $('.form-tool-item.gear').on('click', function () {
        var row = $(this).closest('.form-line');
        var elem = currentBuilder.getType(row.attr('id'));
        // open dialog
        $('#props-dialog-form')
            .dialog('option', 'height', 'auto')
            .dialog('open')
            .children('form')
                .html(currentBuilder.makeProperties(elem));
    });

    $('.form-tool-item.cross').on('click', function () {
        var row = $(this).closest('.form-line');
        currentBuilder.removeType(row.attr('id'));

        // re-activate in saved fields list
        $('.form-saved-type[data-name="' + row.attr('id') + '"]').show();

        Utils.poof($(this));
        row.fadeOut(function () {
            $(this).remove();
        });
    });

    $('.form-tool-item.wand').on('click', function () {
        var data = {},
            field = $(this).data('field'),
            type = $(this).data('type');

        if (type == 'calculation') {
            data.formula = currentBuilder.getType(field).getProperty('formula').value;
            data.fields = [];
            for (var key in currentBuilder.getTypes()) {
                var t = currentBuilder.getTypes()[key];
                switch (t.getType()) {
                    case 'dropdown':
                    case 'checkbox':
                    case 'radio':
                        if (t.getProperty('calcValues').value.length == 0) continue;

                    case 'textbox':
                    case 'number':
                    case 'calculation':
                        data.fields.push(t.getFieldName());
                        break;

                }
            }
        }

        var dialog = $('<div id="form-wizard" style="display:hidden"></div>').appendTo('body');
        dialog.load($(this).data('url'), {
            field: field,
            type: type,
            data: Utils.stringify(data)
        }, function () {
            dialog.dialog({
                title: 'Wizard: ' + type,
                width: 700,
                height: 520,
                modal: true,
                resizable: false,
                close: function () {
                    $('#form-wizard').remove();
                },
                modal: true
            });
        });
    });
};

/**
 * Re-renders the element.
 *
 * @param {FormBuilder.Type} elem      A form type instance
 * @param {string}           fieldName The form type field name
 *                                     (Will be used when editing form type properties)
 */
function reRenderItem(elem, fieldName) {
    if (isPreviewMode) return;

    // re-render
    elem.reRender(null, fieldName);
    // reset rules
    resetListRules();
    // focus
    focusItem(elem);
};

/**
 * Auto select elements.
 *
 * @param {FormBuilder.Type} elem A form type instance
 */
function focusItem(elem) {
    if (isPreviewMode) return;

    $('#' + currentBuilder.getId() + ' #' + elem.getFieldName()).trigger('click');
};
