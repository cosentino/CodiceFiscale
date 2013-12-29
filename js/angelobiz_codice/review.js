/**
 * Created with JetBrains PhpStorm.
 * User: marcello
 * Date: 22/12/13
 * Time: 14:32
 * --------------------------------
 * Overwrite the original syncWithBilling method defined in
 * /skin/frontend/base/default/js/checkout/review.js
 **/
 if (typeof OrderReviewController != 'undefined') {
    
    /**
     * Copy data from shipping address to billing
     */
    OrderReviewController.prototype._copyShippingToBilling = function (event) {
        if (!this._copyElement) {
            return;
        }
        if (this._copyElement.checked) {
            this._copyElementValue($('shipping:country_id'));
            billingRegionUpdater.update();
            /**** ANGELOBIZ: CODICE FISCALE ****/
            billingCodFiscUpdater.update();
            /**** ANGELOBIZ: CODICE FISCALE ****/
            $$('[id^="shipping:"]').each(this._copyElementValue);
            this._clearValidation('billing');
        } else {
            $$('[id^="billing:"]').invoke('enable');
            $$('[id^="billing:"]').each(function(el){el.removeAttribute("readOnly");});
            $$('[id^="billing:"]').invoke('removeClassName', 'local-validation');
            $$('[id^="billing:"]').invoke('setStyle', {opacity:1});
        }
        if (event) {
            this._updateOrderSubmit(true);
        }
    };

}