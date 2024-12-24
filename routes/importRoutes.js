const express = require('express');
const importController = require('../controllers/importController');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });  // Save the uploaded file to 'uploads/' directory


// Define the POST route for creating import containers
// You can now pass `region` and `projectKey` in the request body instead of the URL
router.post('/container', importController.createImportContainer);

router.post('/categories', upload.single('file'),importController.createImportCategories); //done

router.post('/products-draft',  upload.single('file'),importController.createImportProductDraft); //done

router.post('/customers',  upload.single('file'),importController.createImportCustomers); //done

router.post('/discount-codes',  upload.single('file'),importController.importDiscountCodesController);  //not done

router.post('/productTypes',  upload.single('file'),importController.importProductType);  //done





module.exports = router;
