// inicializar el carrito desde localStorage o como un array vacío
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// agregar sonido
const addSound = new Audio('images/sound1.mp3');

// función para agregar un producto al carrito
function addToCart(product, price) {
    cart.push({ product, price });
    updateCartDisplay();
    saveCart();

    addSound.play();
}

// aunción para guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// función para mostrar el contenido del carrito en el modal
function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("count-carrito"); 

    cartItems.innerHTML = ""; // Limpia el contenido actual del carrito

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.product} - $${item.price}`;
        cartItems.appendChild(li);
        total += parseFloat(item.price);
    });

    // actualiza el total y el contador del carrito
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = cart.length;
}

// vincular botón de agregar a carrito de compras
const addToCartButtons = document.querySelectorAll(".btn-modal");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        const product = this.getAttribute("data-product");
        const price = this.getAttribute("data-price");
        addToCart( product, price);

        // cerrar el modal cuando se agrega un producto
        this.closest(".carrito-modal").style.display = "none";
    });
});

// función para vaciar el carrito
function clearCart() {
    cart = [];
    updateCartDisplay();
    saveCart();
}

// event listener para abrir el modal del carrito
document.getElementById("cart-icon").addEventListener("click", function() {
    document.getElementById("cart-modal").style.display = "block"; 
});

// event listener para cerrar el modal del carrito con la "X"
document.querySelector(".close-cart").addEventListener("click", function() {
    document.getElementById("cart-modal").style.display = "none";
});

// event listener para cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("cart-modal")) {
        document.getElementById("cart-modal").style.display = "none";
    }
});

// event listener para el botón "Vaciar carrito"
document.getElementById("clear-cart").addEventListener("click", clearCart);

// mostrar el carrito al cargar la página
updateCartDisplay();


// obtener todos los enlaces que abren modales
const openModalLinks = document.querySelectorAll(".openModal");

// obtener todos los modales 
const modals = document.querySelectorAll(".modal");

// añadir evento a cada enlace para abrir su modal correspondiente
openModalLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const modalID = this.getAttribute("data-modal");
        document.getElementById(modalID).style.display = "block";
    });
});

// añadir evento a cada botón de cierre para cerrar su modal
const closeButtons = document.querySelectorAll(".close");
closeButtons.forEach(button => {
    button.addEventListener("click", function() {
        this.closest(".modal").style.display = "none";
    });
});

// cerrar el modal cuando se hace click fuera del contenido del modal
window.onclick = function(event) {
    modals.forEach(modal => {
        if(event.target == modal) {
            modal.style.display = "none";
        }
    });
}