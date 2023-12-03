let products = [
    { id: 1, name: 'Product 1', price: 20.0 },
    { id: 2, name: 'Product 2', price: 30.0 },
  ];
  
  const getProductById = (productId) => {
    return products.find(p => p.id === parseInt(productId));
  };
  
  const addProduct = (product) => {
    product.id = products.length + 1;
    products.push(product);
    return product;
  };
  
  const updateProduct = (productId, updatedProduct) => {
    const productIndex = products.findIndex(p => p.id === productId);
  
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedProduct, id: productId };
      return products[productIndex];
    } else {
      return null; // Indicate that the product was not found
    }
  };
  
  const deleteProduct = (productId) => {
    const productIndex = products.findIndex(p => p.id === productId);
  
    if (productIndex !== -1) {
      return products.splice(productIndex, 1)[0];
    } else {
      return null; // Indicate that the product was not found
    }
  };
  
  module.exports = { products, getProductById, addProduct, updateProduct, deleteProduct };
  