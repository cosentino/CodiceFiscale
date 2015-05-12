/**
 * Created with JetBrains PhpStorm.
 * User: marcello
 * Date: 22/12/13
 * Time: 14:32
 * To change this template use File | Settings | File Templates.
 */

CodFiscUpdater = Class.create();
CodFiscUpdater.prototype = {
    initialize: function (countryEl, codfiscEl)
    {
        this.countryEl = $(countryEl);
        this.codfiscEl = $(codfiscEl);
        this.config = {"enabled_for_countries": ["IT"]};
        this.update();
        Event.observe(this.countryEl, 'change', this.update.bind(this));
    },

    _checkRequired: function()
    {
        var label, wildCard;
        var elements = [this.codfiscEl];

        if (typeof this.config == 'undefined') {
            return;
        }
        var isRequired = this.config.enabled_for_countries.indexOf(this.countryEl.value) >= 0;

        elements.each(function(currentElement) {
            Validation.reset(currentElement);

            label = $$('label[for="' + currentElement.id + '"]')[0];
            if (label) {
                wildCard = label.down('em') || label.down('span.required');
                if (isRequired) {
                    label.up().show();
                } else {
                    label.up().hide();
                }
            }

            if (label && wildCard) {
                if (!isRequired) {
                    wildCard.hide();
                    if (label.hasClassName('required')) {
                        label.removeClassName('required');
                    }
                } else if (isRequired) {
                    wildCard.show();
                    if (!label.hasClassName('required')) {
                        label.addClassName('required')
                    }
                }
            }

            if (!isRequired) {
                if (currentElement.hasClassName('required-entry')) {
                    currentElement.removeClassName('required-entry');
                }
                if ('select' == currentElement.tagName.toLowerCase() &&
                    currentElement.hasClassName('validate-select')) {
                    currentElement.removeClassName('validate-select');
                }
            } else {
                if (!currentElement.hasClassName('required-entry')) {
                    currentElement.addClassName('required-entry');
                }
                if ('select' == currentElement.tagName.toLowerCase() &&
                    !currentElement.hasClassName('validate-select')) {
                    currentElement.addClassName('validate-select');
                }
            }
        });
    },

    update: function()
    {
        this._checkRequired();
    }
};
