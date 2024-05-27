// Обработчик клика по элементу продукции
function selectItem(event) {
  const item = event.currentTarget;
  item.classList.toggle('selected');
}

// Обработчик клика по ссылке соуса
function selectSauce(event) {
  event.preventDefault();
  const sauce = event.target.getAttribute('data-sauce');
  const dropdown = event.target.closest('.dropdown');
  const dropbtn = dropdown.querySelector('.dropbtn');
  
  // Устанавливаем выбранный соус
  dropbtn.textContent = sauce;
}

// Обработчик клика по кнопке добавления в корзину
function addToCart(event) {
  const button = event.currentTarget;
  const item = button.closest('.item');
  const product = item.querySelector('h3').textContent;
  const price = parseFloat(button.getAttribute('data-price'));
  const sauceButton = item.querySelector('.dropbtn');
  const sauce = sauceButton.textContent;

  const cartItems = document.querySelector('.cart-items');
  const totalPrice = document.querySelector('.total-price');

  // Создаем новый пункт списка для продукта с указанием соуса
  const listItem = document.createElement('li');
  listItem.textContent = `${product} - соус: ${sauce} - ${price} р`;
  cartItems.appendChild(listItem);

  // Обновляем общую стоимость
  const currentTotal = parseFloat(totalPrice.textContent.replace("Общая стоимость: ", "").replace(" р", ""));
  const newTotal = currentTotal + price;
  totalPrice.textContent = `Общая стоимость: ${newTotal} р`;
}

const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', selectItem);

  const dropdown = item.querySelector('.dropdown');
  const sauceLinks = dropdown.querySelectorAll('.dropdown-content a');
  sauceLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      selectSauce(event);

      const chosenSauceLinks = dropdown.querySelectorAll('.dropdown-content a');
      chosenSauceLinks.forEach(chosenLink => {
        chosenLink.classList.remove('active');
      });

      event.target.classList.add('active');
    });
  });
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});
