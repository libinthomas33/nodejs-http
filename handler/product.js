// Importing necessary modules and functions from other files
const { 
    products, 
    getProductById, 
    addProduct, 
    updateProduct, 
    deleteProduct 
} = require('../repository/product');
const { sendResponse } = require('../helper/http');
const { CONTENT_TYPE_JSON } = require('../constant/common');

// Handling GET requests to retrieve product information
const handleGet = (req, res, parsedUrl) => {
  // Check if the path is the product list endpoint
  if (parsedUrl.path === '/product') {
    // Send a response with the list of products
    sendResponse(res, 200, CONTENT_TYPE_JSON, products);
  } else if (parsedUrl.path.startsWith("/product")) {
    // Extract the product ID from either path or query parameters
    const productId = parsedUrl.query.id || parseInt(parsedUrl.path.split('/').pop());
    // Get the product by ID
    const product = getProductById(productId);

    if (product) {
      // If the product is found, send a response with the product details
      sendResponse(res, 200, CONTENT_TYPE_JSON, product);
    } else {
      // If the product is not found, send a 404 error response
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Product not found' });
    }
  } else {
    // If the endpoint is not recognized, send a 404 error response
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
  }
};

// Handling POST requests to add new products
const handlePost = (req, res) => {
  let requestBody = '';

  // Collecting data from the request body
  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  // Processing data when the request ends
  req.on('end', () => {
    try {
      // Parsing the JSON data from the request body
      const product = JSON.parse(requestBody);
      // Adding the new product to the data store
      const newProduct = addProduct(product);
      // Sending a response with the newly added product details
      sendResponse(res, 201, CONTENT_TYPE_JSON, newProduct);
    } catch (error) {
      // Handling errors related to invalid JSON format
      sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Invalid JSON format' });
    }
  });
};

// Handling PUT requests to update existing products
const handlePut = (req, res, parsedUrl) => {
  let requestBody = '';

  // Collecting data from the request body
  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  // Processing data when the request ends
  req.on('end', () => {
    try {
      // Parsing the JSON data from the request body
      const updatedProduct = JSON.parse(requestBody);
      // Extracting the product ID from the request URL
      const productId = parseInt(parsedUrl.path.split('/').pop());
      // Updating the product in the data store
      const updatedProductInfo = updateProduct(productId, updatedProduct);

      if (updatedProductInfo) {
        // If the product is updated successfully, send a response with the updated product details
        sendResponse(res, 200, CONTENT_TYPE_JSON, updatedProductInfo);
      } else {
        // If the product is not found, send a 404 error response
        sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Product not found' });
      }
    } catch (error) {
      // Handling errors related to invalid JSON format
      sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Invalid JSON format' });
    }
  });
};

// Handling DELETE requests to remove products
const handleDelete = (req, res, parsedUrl) => {
  // Extracting the product ID from the request URL
  const productId = parseInt(parsedUrl.path.split('/').pop());
  // Deleting the product from the data store
  const deletedProduct = deleteProduct(productId);

  if (deletedProduct) {
    // If the product is deleted successfully, send a response with the deleted product details
    sendResponse(res, 200, CONTENT_TYPE_JSON, deletedProduct);
  } else {
    // If the product is not found, send a 404 error response
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Product not found' });
  }
};

// Exporting the functions to be used in other parts of the application
module.exports = { handleGet, handlePost, handlePut, handleDelete };
