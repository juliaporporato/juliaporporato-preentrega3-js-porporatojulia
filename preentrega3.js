class Menu {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

const menus = [
    new Menu(1, 'Menú Vegetariano', 2500),
    new Menu(2, 'Menú de Pollo', 2800),
    new Menu(3, 'Menú de Pescado', 3100),
    new Menu(4, 'Menú de Carne', 3500)
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const menusContainer = document.getElementById('menus-container');
const cartContainer = document.getElementById('cart-container');
const finalizeButton = document.getElementById('finalize-button');
const clearCartButton = document.getElementById('clear-cart-button');

function display() {
    menusContainer.innerHTML = menus.map(menu => `
        <div class="menu">
            <span>${menu.nombre} - $${menu.precio}</span>
            <button data-id="${menu.id}">Añadir al carrito</button>
        </div>
    `).join('');

    cartContainer.innerHTML = cart.map((menu, index) => `
        <div class="cart-item">
            <span>${menu.nombre} - $${menu.precio}</span>
            <button data-index="${index}">Eliminar</button>
        </div>
    `).join('');
}

function addToCart(menuId) {
    const menu = menus.find(m => m.id === menuId);
    cart.push(menu);
    updateCartStorage();
    display();
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCartStorage();
        display();
    } else {
        alert('Índice inválido');
    }
}

function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function finalizePurchase() {
    if (cart.length === 0) {
        alert('El carrito está vacío.');
    } else {
        const total = cart.reduce((sum, menu) => sum + menu.precio, 0);
        alert(`Compra finalizada. Total: $${total}`);
        cart = [];
        updateCartStorage();
        display();
    }
}

function clearCart() {
    cart = [];
    updateCartStorage();
    display();
}

display();

menusContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const menuId = parseInt(e.target.dataset.id, 10);
        addToCart(menuId);
    }
});

cartContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const index = parseInt(e.target.dataset.index, 10);
        removeFromCart(index);
    }
});

finalizeButton.addEventListener('click', finalizePurchase);
clearCartButton.addEventListener('click', clearCart);
