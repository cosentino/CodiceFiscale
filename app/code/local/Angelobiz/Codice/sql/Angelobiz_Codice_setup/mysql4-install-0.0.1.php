<?php
/* @var $installer Mage_Customer_Model_Entity_Setup */
$installer = $this;
$installer->startSetup();
/* @var $addressHelper Mage_Customer_Helper_Address */
$addressHelper = Mage::helper('customer/address');
$store         = Mage::app()->getStore(Mage_Core_Model_App::ADMIN_STORE_ID);
 
/* @var $eavConfig Mage_Eav_Model_Config */
$eavConfig = Mage::getSingleton('eav/config');
 
// update customer address user defined attributes data
$attributes = array(
    'cod_fisc'           => array(   
        'label'    => 'Codice Fiscale',
        'type'     => 'varchar',
        'input'    => 'text',
        'backend_type'  => 'varchar',
		'frontend_input' => 'text',
		'frontend_label' => 'cod_fisc',
		'sort_order' => '150'
    ),
);
 
foreach ($attributes as $attributeCode => $data) {
    $attribute = $eavConfig->getAttribute('customer_address', $attributeCode);
    $attribute->setWebsite($store->getWebsite());
    $attribute->addData($data);
        $usedInForms = array(
            'adminhtml_customer_address',
            'customer_address_edit',
            'customer_register_address'
        );
        $attribute->setData('used_in_forms', $usedInForms);
    $attribute->save();
}
 
$installer->run("
    ALTER TABLE {$this->getTable('sales_flat_quote_address')} ADD COLUMN `cod_fisc` TEXT CHARACTER SET utf8 DEFAULT NULL ;
    ALTER TABLE {$this->getTable('sales_flat_order_address')} ADD COLUMN `cod_fisc` TEXT CHARACTER SET utf8 DEFAULT NULL ;
    ");
$installer->endSetup();