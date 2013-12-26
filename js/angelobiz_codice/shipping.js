/**
 * Created with JetBrains PhpStorm.
 * User: marcello
 * Date: 22/12/13
 * Time: 14:32
 * --------------------------------
 * Overwrite the original syncWithBilling method defined in
 * skin/frontend/base/default/js/opcheckout.js
 **/
if (typeof Shipping != 'undefined') {

    Shipping.prototype.syncWithBilling = function () {
        $('billing-address-select') && this.newAddress(!$('billing-address-select').value);
        $('shipping:same_as_billing').checked = true;
        if (!$('billing-address-select') || !$('billing-address-select').value) {
            arrElements = Form.getElements(this.form);
            for (var elemIndex in arrElements) {
                if (arrElements[elemIndex].id) {
                    var sourceField = $(arrElements[elemIndex].id.replace(/^shipping:/, 'billing:'));
                    if (sourceField){
                        arrElements[elemIndex].value = sourceField.value;
                    }
                }
            }
            //$('shipping:country_id').value = $('billing:country_id').value;
            shippingRegionUpdater.update();
            $('shipping:region_id').value = $('billing:region_id').value;
            $('shipping:region').value = $('billing:region').value;

            /**** ANGELOBIZ: CODICE FISCALE ****/
            shippingCodFiscUpdater.update();
            /**** ANGELOBIZ: CODICE FISCALE ****/

            //shippingForm.elementChildLoad($('shipping:country_id'), this.setRegionValue.bind(this));
        } else {
            $('shipping-address-select').value = $('billing-address-select').value;
        }
    };

}