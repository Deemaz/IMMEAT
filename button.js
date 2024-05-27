function toggleQuantity() {
  var buyButton = document.querySelector('.buy-button');
  var quantityContainer = document.querySelector('.quantity-container');
  
  buyButton.style.display = 'none';
  quantityContainer.style.display = 'flex';
}


function decreaseQuantity() {
  var quantitySpan = document.getElementById('quantity');
  var quantity = parseInt(quantitySpan.textContent);
  
  if (quantity > 1) {
    quantitySpan.textContent = quantity - 1;
  }
}

function increaseQuantity() {
  var quantitySpan = document.getElementById('quantity');
  var quantity = parseInt(quantitySpan.textContent);
  
  quantitySpan.textContent = quantity + 1;
}
