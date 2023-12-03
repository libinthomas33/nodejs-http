const { CONTENT_TYPE_JSON } = require('../constant/common');
const { handleGet, handlePost, handlePut, handleDelete } = require('../handler/product');

const handleProductRoutes = (req, res, parsedUrl) => {
  if (req.method === 'GET') {
    handleGet(req, res, parsedUrl);
  } else if (req.method === 'POST') {
    handlePost(req, res);
  } else if (req.method === 'PUT') {
    handlePut(req, res, parsedUrl);
  } else if (req.method === 'DELETE') {
    handleDelete(req, res, parsedUrl);
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Method not allowed' });
  }
};

module.exports = { handleProductRoutes };
