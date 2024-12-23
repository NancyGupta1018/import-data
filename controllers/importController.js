const importController = require('../services/importService');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Initialize multer to save uploaded files to 'uploads/' directory

// Controller method to create an import container
const createImportContainer = async (req, res) => {
  const { region, projectKey, importContainerDraft } = req.body; // Assuming region and projectKey are in the request body

  try {
    const response = await importController.createImportContainer(region, projectKey, importContainerDraft);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create import container',
      error: error.response ? error.response.data : error.message,
    });
  }
};




const createImportCategories = async (req, res) => {
  const token = req.headers['authorization'];
  const { region, projectKey, importContainerKey } = req.body;  // Get region and projectKey from the request body
  const csvFile = req.file;  // The uploaded CSV file from the form

  if (!csvFile) {
    return res.status(400).json({ error: 'CSV file is required' });
  }

  // Get the original file name
  const originalFileName = csvFile.originalname;

  try {
    const response = await importController.createImportCategories({ region, projectKey, importContainerKey, originalFileName }, csvFile, token);
    res.status(response.status).json(response.data);  // Send the response back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create import category',
      error: error.response ? error.response.data : error.message,
    });
  }
};


const createImportProductDraft = async (req, res) => {
  const token = req.headers['authorization'];
  const { region, projectKey, importContainerKey } = req.body;  // Get region and projectKey from the request body
  const csvFile = req.file;  // The uploaded CSV file from the form

  if (!csvFile) {
    return res.status(400).json({ error: 'CSV file is required' });
  }

  // Get the original file name
  const originalFileName = csvFile.originalname;

  try {
    const response = await importController.createImportProductDraft({ region, projectKey, importContainerKey, originalFileName }, csvFile, token);
    res.status(response.status).json(response.data);  // Send the response back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create import products',
      error: error.response ? error.response.data : error.message,
    });
  }
};

const createImportCustomers = async (req, res) => {
  const token = req.headers['authorization'];
  const { region, projectKey, importContainerKey } = req.body;  // Get region and projectKey from the request body
  const jsonFile = req.file;  // The uploaded CSV file from the form

  if (!jsonFile) {
    return res.status(400).json({ error: 'JSON file is required' });
  }

  // Get the original file name
  const originalFileName = jsonFile.originalname;

  try {
    const response = await importController.createImportCustomers({ region, projectKey, importContainerKey, originalFileName }, jsonFile, token);
    res.status(response.status).json(response.data);  // Send the response back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create import customers',
      error: error.response ? error.response.data : error.message,
    });
  }
};


const importDiscountCodesController= async (req, res)=> {
  const token = req.headers['authorization'];
  const { region, projectKey, importContainerKey } = req.body;  // Get region and projectKey from the request body
  const file = req.file;  // The uploaded CSV file from the form

  // Get the original file name
  const originalFileName = file.originalname;


  const response = await importController.importDiscountCodesController({ region, projectKey, importContainerKey, originalFileName},file, token);
  res.status(response.status).json(response.data);  // Send the response back to the client

}


const importProductType= async (req, res)=> {
  const token = req.headers['authorization'];
  const { region, projectKey, importContainerKey } = req.body;  // Get region and projectKey from the request body
  const file = req.file;  // The uploaded CSV file from the form

  // Get the original file name
  const originalFileName = file.originalname;


  const response = await importController.importProductType({ region, projectKey, importContainerKey, originalFileName},file, token);
  res.status(response.status).json(response.data);  // Send the response back to the client

}



module.exports = {
  createImportContainer,
  createImportCategories,
  createImportProductDraft,
  createImportCustomers,
  importDiscountCodesController,
  importProductType
};
