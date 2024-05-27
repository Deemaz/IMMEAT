// Модуль для работы с корзиной
const CartModule = (function() {
    const cartItems = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    let cart = [];

    function addToCart(product, price, sauce) {
        const existingItem = cart.find(item => item.product === product && item.sauce === sauce);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ product, price, sauce, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            const li = document.createElement('li');
            li.textContent = `${item.quantity} x ${item.product} (${item.sauce}) - ${item.price * item.quantity} р`;
            cartItems.appendChild(li);
        });
        totalPriceElement.textContent = `Общая стоимость: ${totalPrice} р`;
    }

    function getCart() {
        return cart;
    }

    return { addToCart, getCart };
})();

// Обработчик клика по элементу продукции
function selectItem(event) {
    const item = event.currentTarget;
    item.classList.toggle('selected');
}

// Обработчик клика по кнопке "Соусы"
function toggleDropdown(event) {
    const dropdown = event.currentTarget.parentElement.querySelector('.dropdown-content');
    dropdown.classList.toggle('show');
}

// Обработчик клика по ссылке соуса
function selectSauce(event) {
    event.preventDefault();
    const sauce = event.target.getAttribute('data-sauce');
    const dropbtn = event.target.closest('.dropdown').querySelector('.dropbtn');
    dropbtn.textContent = `Выбран соус: ${sauce}`;
    event.target.classList.add('active');
    const chosenSauceLinks = event.target.closest('.dropdown-content').querySelectorAll('a');
    chosenSauceLinks.forEach(link => {
        if (link !== event.target) {
            link.classList.remove('active');
        }
    });
    event.target.closest('.dropdown-content').classList.remove('show');
}

// Обработчик клика по кнопке добавления в корзину
function addToCartHandler(event) {
    const button = event.currentTarget;
    const item = button.closest('.item');
    const product = item.querySelector('h3').textContent;
    const price = parseFloat(button.getAttribute('data-price'));
    const dropbtn = item.querySelector('.dropbtn');
    const sauce = dropbtn.textContent.replace('Выбран соус: ', '');
    CartModule.addToCart(product, price, sauce);
}

const dropbtns = document.querySelectorAll('.dropbtn');
dropbtns.forEach(btn => {
    btn.addEventListener('click', toggleDropdown);
});

const sauceLinks = document.querySelectorAll('.dropdown-content a');
sauceLinks.forEach(link => {
    link.addEventListener('click', selectSauce);
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartHandler);
});

// Обработчик клика по кнопке "Оформить заказ"
function checkoutHandler() {
    const cartItems = CartModule.getCart();
    const cartItemsText = cartItems.map(item => `${item.quantity} x ${item.product} (${item.sauce}) - ${item.price * item.quantity} р`).join('\n');
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const message = `Ваш заказ:\n${cartItemsText}\n\nОбщая стоимость: ${totalPrice} р`;
    const botToken = '6563724015:AAFpNm9n2cIQ_zAkOJ3OMAHVASNoBj50kvI';
    const chatId = '6563724015';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Заказ отправлен в Telegram!');
    })
    .catch(error => {
        console.error('Ошибка при отправке заказа:', error);
        alert('Ошибка при отправке заказа');
    });
}

document.getElementById('checkout').addEventListener('click', checkoutHandler);