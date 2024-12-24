const express = require("express");
const axios = require("axios");
const fs = require("fs");
const https = require("https");
const csvParser = require("csv-parser");

const app = express();

// Create an HTTPS agent to bypass SSL verification
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Function to create an import container
const createImportContainer = async (
  region,
  projectKey,
  importContainerDraft
) => {
  const url = `https://import.${region}.commercetools.com/${projectKey}/import-containers`;

  try {
    // Make the POST request to commercetools API
    const response = await axios.post(url, importContainerDraft, {
      httpsAgent: agent,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 6_YTLeZsDrsVArIcPlS1CdUvo57wyO1G",
      },
    });

    return response; // Return the response back to the controller
  } catch (error) {
    throw error; // Propagate the error back to the controller
  }
};

// Function to create import categories by posting JSON data
const createImportCategories = async (data, csvFile, token) => {
  const { region, projectKey, importContainerKey } = data;
  const url = `https://import.${region}.commercetools.com/${projectKey}/categories/import-containers/${importContainerKey}`;

  // Parse the CSV file to JSON
  const jsonData = await parseCSVToJSON(csvFile.path);

  console.log(jsonData);

  // Set up HTTPS agent (if needed)
  const agent = new https.Agent({
    rejectUnauthorized: false, // Set to true if you need strict SSL certificate validation
  });

  const postData = {
    type: "category",
    resources: jsonData,
  };

  try {
    // Send the POST request with the JSON data
    const response = await axios.post(url, postData, {
      httpsAgent: agent,
      headers: {
        Authorization: `${token}`, // Replace with your actual Bearer token
        "Content-Type": "application/json", // Ensure the correct content type for JSON
      },
    });

    // Return the API response to the controller
    return response;
  } catch (error) {
    // Handle errors and propagate them to the controller
    console.error("Error while posting data to Commercetools:", error);
    throw error; // Re-throw the error to be handled by the controller
  }
};

// Function to parse a CSV file and convert it into a JSON array
const parseCSVToJSON = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    // Read the CSV file and convert it to JSON
    fs.createReadStream(csvFilePath)
      .pipe(csvParser()) // Use csv-parser to parse the CSV files
      .on("data", (data) => {
        const output = {
          key: data.key,
          externalId: data.externalId,
          name: {},
          slug: {},
          orderHint: data.orderHint,
        };

        Object.keys(data).forEach((key) => {
          if (key.startsWith("name.")) {
            const lang = key.split(".")[1];
            output.name[lang] = data[key];
          } else if (key.startsWith("slug.")) {
            const lang = key.split(".")[1];
            output.slug[lang] = data[key];
          }
        });

        results.push(output); // Push each parsed row to the results array
      })
      .on("end", () => {
        resolve(results); // Once parsing is done, resolve with the JSON data
      })
      .on("error", (error) => {
        reject(error); // Reject in case of an error during parsing
      });
  });
};

// Function to parse a CSV file and convert it into a JSON array
const productParseCSVToJSON = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    // Read the CSV file and convert it to JSON
    fs.createReadStream(csvFilePath)
      .pipe(csvParser()) // Use csv-parser to parse the CSV files
      .on("data", (data) => {
        const output = {
          key: data.key,
          productType: {},
          externalId: data.externalId,
          name: {},
          description: {},
          slug: {},
          categories: [],
          orderHint: data.orderHint,
        };
        Object.keys(data).forEach((key) => {
          if (key.startsWith("name.")) {
            const lang = key.split(".")[1];
            output.name[lang] = data[key];
          } else if (key.startsWith("description.")) {
            const lang = key.split(".")[1];
            output.description[lang] = data[key];
          } else if (key.startsWith("productType.")) {
            const lang = key.split(".")[1];
            output.productType[lang] = data[key];
          } else if (key.startsWith("slug.")) {
            const lang = key.split(".")[1];
            output.slug[lang] = data[key];
          } else if (key.startsWith("categories.")) {
            const lang = key.split(".")[1];
            output.categories[lang] = data[key];
          }
        });

        results.push(output); // Push each parsed row to the results array
      })
      .on("end", () => {
        resolve(results); // Once parsing is done, resolve with the JSON data
      })
      .on("error", (error) => {
        reject(error); // Reject in case of an error during parsing
      });
  });
};

const csvToJson = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    // Read the CSV file and convert it to JSON
    fs.createReadStream(csvFilePath)
      .pipe(csvParser()) // Use csv-parser to parse the CSV files
      .on("data", (data) => {
        results.push(data); // Push each parsed row to the results array
      })
      .on("end", () => {
        resolve(results); // Once parsing is done, resolve with the JSON data
      })
      .on("error", (error) => {
        reject(error); // Reject in case of an error during parsing
      });
  });
};

// Function to create import categories by posting JSON data
const createImportProductDraft = async (data, csvFile, token) => {
  const { region, projectKey, importContainerKey } = data;
  const url = `https://import.${region}.commercetools.com/${projectKey}/product-drafts/import-containers/${importContainerKey}`;

  // Parse the CSV file to JSON
  const jsonData = await productParseCSVToJSON(csvFile.path);

  // Set up HTTPS agent (if needed)
  const agent = new https.Agent({
    rejectUnauthorized: false, // Set to true if you need strict SSL certificate validation
  });

  const postData = {
    type: "product-draft",
    resources: jsonData,
  };

  try {
    // Send the POST request with the JSON data
    const response = await axios.post(url, postData, {
      httpsAgent: agent,
      headers: {
        Authorization: `${token}`, // Replace with your actual Bearer token
        "Content-Type": "application/json", // Ensure the correct content type for JSON
      },
    });

    // Return the API response to the controller
    return response;
  } catch (error) {
    // Handle errors and propagate them to the controller
    console.error("Error while posting data to Commercetools:", error);
    throw error; // Re-throw the error to be handled by the controller
  }
};

// Function to create import categories by posting JSON data
const createImportCustomers = async (data, csvFile, token) => {
  const { region, projectKey, importContainerKey } = data;
  const url = `https://import.${region}.commercetools.com/${projectKey}/customers/import-containers/${importContainerKey}`;

  // Parse the CSV file to JSON
  const jsonData = await csvToJson(csvFile.path);

  // Set up HTTPS agent (if needed)
  const agent = new https.Agent({
    rejectUnauthorized: false, // Set to true if you need strict SSL certificate validation
  });

  const postData = {
    type: "customer",
    resources: jsonData,
  };

  try {
    // Send the POST request with the JSON data
    const response = await axios.post(url, postData, {
      httpsAgent: agent,
      headers: {
        Authorization: `${token}`, // Replace with your actual Bearer token
        "Content-Type": "application/json", // Ensure the correct content type for JSON
      },
    });

    // Return the API response to the controller
    return response;
  } catch (error) {
    // Handle errors and propagate them to the controller
    console.error("Error while posting data to Commercetools:", error);
    throw error; // Re-throw the error to be handled by the controller
  }
};

async function importDiscountCodesController(data, filePath, token) {
  let discountCodes;
  const { region, projectKey, importContainerKey } = data;
  const url = `https://import.${region}.commercetools.com/${projectKey}/discount-codes/import-containers/${importContainerKey}`;

  if (filePath.originalname.endsWith(".csv")) {
    discountCodes = await parseCsvToJson(filePath.path);
  } else if (filePath.originalname.endsWith(".json")) {
    discountCodes = JSON.parse(fs.readFileSync(filePath.path, "utf8"));
  } else {
    throw new Error(
      "Unsupported file format. Please provide a JSON or CSV file."
    );
  }

  const payload = {
    type: "discount-code",
    resources: discountCodes,
  };
  try {
    const response = await axios.post(url, payload, {
      httpsAgent: agent,
      headers: {
        Authorization: `${token}`, // Replace with your actual Bearer token
        "Content-Type": "application/json", // Ensure the correct content type for JSON
      },
    });

    return response;
  } catch (error) {
    // Handle errors and propagate them to the controller
    console.error("Error while posting data to Commercetools:", error);
    throw error; // Re-throw the error to be handled by the controller
  }
}

async function importProductType(data, filePath, token) {
  let postData;
  const { region, projectKey, importContainerKey } = data;
  const url = `https://import.${region}.commercetools.com/${projectKey}/product-types/import-containers/${importContainerKey}`;

  if (filePath.originalname.endsWith(".csv")) {
    postData = await parseCsvToJson(filePath.path);
  } else if (filePath.originalname.endsWith(".json")) {
    postData = JSON.parse(fs.readFileSync(filePath.path, "utf8"));
  } else {
    throw new Error(
      "Unsupported file format. Please provide a JSON or CSV file."
    );
  }

  const payload = {
    type: "product-type",
    resources: postData,
  };
  try {
    const response = await axios.post(url, payload, {
      httpsAgent: agent,
      headers: {
        Authorization: `${token}`, // Replace with your actual Bearer token
        "Content-Type": "application/json", // Ensure the correct content type for JSON
      },
    });

    return response;
  } catch (error) {
    // Handle errors and propagate them to the controller
    console.error("Error while posting data to Commercetools:", error);
    throw error; // Re-throw the error to be handled by the controller
  }
}

function parseCsvToJson(filePath) {
  return new Promise((resolve, reject) => {
    const discountCodes = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        discountCodes.push({
          id: row.id,
          version: parseInt(row.version, 10),
          code: row.code,
          name: JSON.parse(row.name),
          description: JSON.parse(row.description),
          cartDiscounts: JSON.parse(row.cartDiscounts),
          isActive: row.isActive.toLowerCase() === "true",
          maxApplications: parseInt(row.maxApplications, 10),
          maxApplicationsPerCustomer: parseInt(
            row.maxApplicationsPerCustomer,
            10
          ),
          references: JSON.parse(row.references),
          groups: JSON.parse(row.groups),
        });
      })
      .on("end", () => resolve(discountCodes))
      .on("error", (error) => reject(error));
  });
}

module.exports = {
  createImportContainer,
  createImportCategories,
  createImportProductDraft,
  createImportCustomers,
  importDiscountCodesController,
  importProductType,
};
