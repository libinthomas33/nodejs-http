const url = require('url');
const { sendResponse } = require('../helper/http');
const { handleProductRoutes } = require('./productRoute');
const { CONTENT_TYPE_HTML, CONTENT_TYPE_JSON } = require('../constant/common');

const handleRequest = (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Delegate specific route handling to specialized modules
  if (parsedUrl.pathname == '/'){
    // Return HTML response for the home page
    sendResponse(res, 200, CONTENT_TYPE_HTML, `<b>Products <a href = '/product'>list</a> page</b>`);
  }else if (parsedUrl.pathname.startsWith('/product')) {
    handleProductRoutes(req, res, parsedUrl);
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
  }
};

module.exports = { handleRequest };
