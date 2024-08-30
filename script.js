document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form');
    const productsTableBody = document.getElementById('products');
    const searchButton = document.getElementById('search-button');
    const searchQuery = document.getElementById('search-query');
    const searchResults = document.getElementById('search-results');
  
    let products = JSON.parse(localStorage.getItem('products')) || [];
  
    function renderProducts() {
      productsTableBody.innerHTML = '';
      products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>${product.supplier}</td>
          <td>${product.sales}</td>
          <td>${formatCurrency(product.price)}</td>
          <td>${product.quantity}</td>
          <td>
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
          </td>
        `;
        productsTableBody.appendChild(row);
      });
    }
  
    function formatCurrency(amount) {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    }
  
    function saveProducts() {
      localStorage.setItem('products', JSON.stringify(products));
    }
  
    window.editProduct = function(index) {
      const product = products[index];
      document.getElementById('name').value = product.name;
      document.getElementById('description').value = product.description;
      document.getElementById('supplier').value = product.supplier;
      document.getElementById('sales').value = product.sales;
      document.getElementById('price').value = product.price;
      document.getElementById('quantity').value = product.quantity;
      products.splice(index, 1);
      saveProducts();
      renderProducts();
    };
  
    window.deleteProduct = function(index) {
      products.splice(index, 1);
      saveProducts();
      renderProducts();
    };
  
    addProductForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const newProduct = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        supplier: document.getElementById('supplier').value,
        sales: document.getElementById('sales').value,
        price: document.getElementById('price').value,
        quantity: document.getElementById('quantity').value
      };
  
      products.push(newProduct);
      saveProducts();
      renderProducts();
      addProductForm.reset();
    });
  
    searchButton.addEventListener('click', () => {
      const query = searchQuery.value.toLowerCase();
      const results = products.filter(product =>
        product.name.toLowerCase().includes(query)
      );
  
      searchResults.innerHTML = results.length ? 
        results.map(p => `<div>${p.name} - ${formatCurrency(p.price)}</div>`).join('') :
        'No results found';
    });
  
    renderProducts();
  });
  