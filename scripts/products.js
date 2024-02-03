
let products = [{
    image: './product-page-images/armchair-small-2.jpeg',
    name: 'Armchair-Sheepskin',
    priceCents: 98600,
    link: './product-pages/Armchair.html'
}, {
    image: './product-page-images/toaster-small-img-1.jpeg',
    name: 'Pop-Up Toaster',
    priceCents: 4500,
    link: './product-pages/Pop-Up-Toaster.html'
}, {
    image: './images/product-lamp.jpeg',
    name: 'Lamp Light Blue',
    priceCents: 7900,
    link: './product-pages/lamp-light-blue.html'
}, {
    image: './images/product-pulp.jpeg',
    name: 'Pulp Unit - 5 Compartments',
    priceCents: 25400,
    link: './product-pages/pulp-unit-5.html'
}, {
    image: './images/product-golden-lamp.jpeg',
    name: 'Golden Modern Light',
    priceCents: 18900,
    link: './product-pages/Golden-modern-light.html'
}, {
    image: './images/product-bodyoil.jpeg',
    name: 'Body Oil 200ml',
    priceCents: 6700,
    link: './product-pages/Body-Oil-200ml.html'
}, {
    image: './images/product-lamp-black-white.jpeg',
    name: 'Black & White Lamp',
    priceCents: 22000,
    link: './product-pages/Black-white-lamp.html'
}, {
    image: './images/product-shelf-ash-black.jpeg',
    name: 'Gejst Shelf Ash/Black',
    priceCents: 11500,
    link: './product-pages/Gejst-Shelf.html'
}, {
    image: './images/product.vase-black.png',
    name: 'Cune Vase Black',
    priceCents: 16100,
    link: './product-pages/Cune-Vase-Black.html'
}, {
    image: './images/traditional-armchair.jpeg',
    name: 'Traditional Armchair',
    priceCents: 8900,
    link: './product-pages/Traditional-Armchair.html'
},{
    image: './product-page-images/sun-pendant-black-small.jpeg',
    name: 'Sun pendant black',
    priceCents: 16000,
    link: './product-pages/Sun-pendant-black.html' 
},{
    image: './product-page-images/simple-golden-lamp-small.png',
    name: 'Golden Lamp',
    priceCents: 22000,
    link: './product-pages/Golden-lamp.html' 
},{
    image: './product-page-images/cotton-pads.jpeg',
    name: 'Cotton Pads',
    priceCents: 3300,
    link: './product-pages/Cotton-pads.html' 
},{
    image: './product-page-images/spanish-chair.png',
    name: 'Oak Spanish Chair',
    priceCents: 52000,
    link: './product-pages/Spanish-chair.html' 
},{
    image: './images/copenhagen-armchair.jpeg',
    name: 'Copenhagen Armchair',
    priceCents: 33000,
    link: './product-pages/Copenhagen-chair.html' 
},{
    image: './images/anti-dark-light.jpeg',
    name: 'Anti Dark Light',
    priceCents: 11500,
    link: './product-pages/Anti-dark-light.html'  
},{
    image: './images/table-lamp.png',
    name: 'Table Lamp',
    priceCents: 7500,
    link: './product-pages/Table-lamp.html'  
},{
    image: './images/mat-black-lamp.png',
    name: 'Mat Black Lamp',
    priceCents: 17500,
    link: './product-pages/Mat-black-lamp.html'  
},{
    image: './images/comfy-chair.jpeg',
    name: 'Comfy Chair',
    priceCents: 11900,
    link: './product-pages/Comfy-chair.html'    
},{
    image: './images/body-oil-50ml.jpeg',
    name: 'Body Oil 50ml',
    priceCents: 4500,
    link: './product-pages/Body-oil-50ml.html'    
}];


//Math for Review Order Section
function CalculateTotalPrice() {
    const totalPriceElement = document.querySelector('.total-price');
    const totalPrice = cartProducts.reduce((sum, product) => sum + product.priceCents, 0);
    totalPriceElement.innerHTML = `${(totalPrice / 100).toFixed(2)} $`;

    const totalBeforeTax = document.querySelector('.tax-total-price');
    totalBeforeTax.innerHTML = `${((totalPrice / 100) + (totalPrice / 1000)).toFixed(2)} $`;

    const estimatedTax = document.querySelector('.estimated-tax');
    estimatedTax.innerHTML = `${(totalPrice / 1000).toFixed(2)} $`;

    const shippingPrice = document.querySelector('.shipping-price');
    const VarShippingPrice = 7.99;
    shippingPrice.innerHTML = `${VarShippingPrice} $`;

    const totalPriceFinal = document.querySelector('.final-order-price');
    totalPriceFinal.innerHTML = `${(((totalPrice / 100) + (totalPrice / 1000)) + VarShippingPrice).toFixed(2)} $`;
}


//Displays CartQuantity on the pages
const storageKey = 'cartProducts'; 
let cartProducts = JSON.parse(localStorage.getItem(storageKey)) || [];

function DisplayCartOnPage() {
    const containerElement = document.querySelector('.container-products-cart');

    if (containerElement) {
        const cartHTML = cartProducts.map(product => `
            <div class="products-card-js">
                <img id="product-image-card" src="${product.image}">
                <a href="${product.link}" class="product-card-name">${product.name}</a>
                <p class="product-card-price">${product.priceCents /100} $</p>
                <button class="btn-remove" data-product-name="${product.name}">Remove product</button>
            </div>`
        );

        containerElement.innerHTML = cartHTML.join('');

        // Add event listeners to remove buttons
        const removeButtons = containerElement.querySelectorAll('.btn-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productName = this.dataset.productName;
                RemoveCartItem(productName);
            });
        });
        // Update total items and total price
  
        CalculateTotalPrice();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Display cart items when the page loads
    DisplayCartOnPage();

    const addButton = document.getElementById('btn-add-cart');
    addButton.addEventListener('click', function () {
        // Add the selected product to the cart
        const productName = this.dataset.productName;
        const selectedProduct = products.find(product => product.name === productName);

        if (selectedProduct) {
            // Remove the 'let' keyword to use the global cartProducts array
            cartProducts = JSON.parse(localStorage.getItem(storageKey)) || [];
            cartProducts.push(selectedProduct);
            localStorage.setItem(storageKey, JSON.stringify(cartProducts));

            // Update the cart quantity and display the cart on the page
            AddCartNumber();
            DisplayCartOnPage();
            CalculateTotalPrice();
            console.log(cartProducts);
        }
    });
});


// Remove product from cart & page
function RemoveCartItem(productName) {
    const indexToRemove = cartProducts.findIndex(product => product.name === productName);

    if (indexToRemove !== -1) {

        cartProducts.splice(indexToRemove, 1);

        localStorage.setItem(storageKey, JSON.stringify(cartProducts));

        // Display the updated cart on the page
        DisplayCartOnPage();
        CalculateTotalPrice();
        console.log(cartProducts);
    }
}

//Displays Approve and View Cart Message
function ApproveAdd () {
    let Approve = `
    <p id="approve-message">Added to cart!  <i class="fa-solid fa-check"></i></p>
    `;

    document.querySelector('.displayApprove').innerHTML = Approve;

    let ViewCart = `
        View Cart
    `;

    document.querySelector('.js-cart-quantity').innerHTML= ViewCart;
}


// Effect Images
var mainImg = document.querySelector('.mainImg');
var smallImgs = document.querySelectorAll('.small-image-product');

smallImgs[0].onclick = function () {
  mainImg.src = smallImgs[0].src;
}

smallImgs[1].onclick = function () {
  mainImg.src = smallImgs[1].src;
}

smallImgs[2].onclick = function () {
  mainImg.src = smallImgs[2].src;
}

smallImgs[3].onclick = function () {
  mainImg.src = smallImgs[3].src;
}
//End of Effects






