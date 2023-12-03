const { CONTENT_TYPE_JSON } = require('../constant/common');
const { 
  METHOD_GET, 
  METHOD_POST, 
  METHOD_PUT, 
  METHOD_DELETE 
} = require('../constant/http');
const { 
  handleGet, 
  handlePost, 
  handlePut, 
  handleDelete 
} = require('../handler/product');
const { sendResponse } = require('../helper/http');

const handleProductRoutes = (req, res, parsedUrl) => {
  if (req.method === METHOD_GET) {
    handleGet(req, res, parsedUrl);
  } else if (req.method === METHOD_POST) {
    handlePost(req, res);
  } else if (req.method === METHOD_PUT) {
    handlePut(req, res, parsedUrl);
  } else if (req.method === METHOD_DELETE) {
    handleDelete(req, res, parsedUrl);
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Method not allowed' });
  }
};

module.exports = { handleProductRoutes };
