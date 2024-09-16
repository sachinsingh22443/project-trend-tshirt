let mainpage = document.querySelector(".mainpage");
let aboutus = document.getElementById("aboutus");
let footer = document.getElementById("foot1");
let trends = document.querySelector(".trends");
let para = document.querySelector(".para");
let explores = document.querySelector(".explore");
let Contacts= document.querySelector(".contacts");
let pages = document.querySelector(".page");
let trendLogo = document.getElementById("trend-logo");
let order=document.getElementById("order-summary")
let navbar=document.querySelector('.navbar')
let purchasedetails=document.getElementById('purchase-details')
let cartsection=document.getElementById('cart-section')



 function shop() {
    trends.style.display="flex";
    footer.style.display = "flex";
    mainpage.style.display = "none";
    explores.style.display = "flex";
    pages.style.display = "none";    
    navbar.style.display = "flex";
    aboutus.style.display="none";
    
 }


function explore() {
    mainpage.style.display = "none";
    footer.style.display = "flex";
    trends.style.display = "flex";
    explores.style.display = "flex";
    pages.style.display = "none";  
}

function about() {
    para.style.display = "none";
    footer.style.display = "none";
    mainpage.style.display = "none";
    trends.style.display = "none";
    aboutus.style.display = "block";
    Contacts.style.display = "none";
    pages.style.display = "none";
    explores.style.display = "none";
    
}



function home() {
    mainpage.style.display = "flex";
    para.style.display = "flex";
    trends.style.display = "flex";
    footer.style.display = "flex";
    pages.style.display = "none";
    explores.style.display = "flex";
    aboutus.style.display = "none";
    Contacts.style.display = "none";
}

function contact() {
    mainpage.style.display = "none";
    trends.style.display = "none";
    para.style.display = "none";
    pages.style.display = "none";
    Contacts.style.display="block"
    footer.style.display = "none";
    explores.style.display = "none";
    aboutus.style.display = "none";
}

function show(img) {
    let newimg = document.getElementById("newimg");
    newimg.src = img.src;
    aboutus.style.display = "none";
    pages.style.display = "flex";
    mainpage.style.display = "none";
    trends.style.display = "none"; 
    footer.style.display = "none";
    para.style.display = "none";
}

function showCart() {
    // Hide other sections
    mainpage.style.display = "none";
    trends.style.display = "none";
    para.style.display = "none";
    pages.style.display = "none";
    explores.style.display = "none";
    aboutus.style.display = "none";
    Contacts.style.display = "none";
    footer.style.display = "none";
    
    // Show the cart section
    cartsection.style.display = "block";
    
    // Update the cart details
    updateCart();
}

// Event listener for showing the cart when the cart button is clicked



function buy() {
    alert("Buy successfully");
}

function add() {
    alert("Add to cart successfully");
}

function back() {
    document.getElementById('product-details').style.display = 'none';
    document.querySelector('header').style.display = 'flex';
    document.querySelector('main').style.display = 'block';
}
trendLogo.addEventListener("click", function() {
    home(); 
});

let cart = [];
function showDetails(imgElement) {
    const card = imgElement.closest('.card');
    const imgSrc = imgElement.src;
    const price = card.dataset.price;

    document.getElementById('newimg').src = imgSrc;
    document.getElementById('product-price').innerText = `₹${price}`;
    document.getElementById('product-quantity').value = 1;
    document.getElementById('product-details').style.display = 'block';
    document.querySelector('header').style.display = 'none';
    document.querySelector('main').style.display = 'none';
    document.querySelector('.cart-section').style.display = 'none';
}


function addToCart() {
    const name = document.querySelector('.detail h2').textContent;
    const size = document.getElementById('product-size').value;
    const price = parseFloat(document.getElementById('product-price').textContent.replace('₹', ''));
    const quantity = parseInt(document.getElementById('product-quantity').value);
    const imgSrc = document.getElementById('newimg').src; 

    const item = {
        name,
        size,
        price,
        quantity,
        total: price * quantity,
        imgSrc 
    };

    cart.push(item);
    alert('Added to cart!');
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
    cartItems.innerHTML = ''; // Clear any existing items

    // Loop through cart items and add rows to the cart table
    cart.forEach((item, index) => {
        const row = cartItems.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td><img src="${item.imgSrc}" alt="tshirt" width="50"></td>
            <td>${item.size}</td>
            <td>₹${item.price}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>₹${item.total}</td>
            <td>
                <button onclick="removeFromCart(${index})" style="color:#fff;background-color: #c82333;">Remove</button>
                <button onclick="buyItem(${index})" style="color:#fff;background-color: #007bff;">Buy Now</button>
            </td>
        `;
    });

    // Ensure the cart section is visible and other sections remain hidden
    cartsection.style.display = "block";
}

// Event listener to show the cart section when the cart button is clicked
document.getElementById('cart-button').addEventListener('click', showCart);

let purchaseDetails = []; // Array to hold purchase details

function viewPurchaseDetails(item) {
    // Create a row for the new purchase detail
    const row = `
        <tr>
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${item.total}</td>
        </tr>
    `;

    // Add the row to the purchase details table
    const detailsBody = document.getElementById('order-summary').getElementsByTagName('tbody')[0];
    detailsBody.innerHTML += row;

    // Add the item to the purchase details array
    purchaseDetails.push(item);
}


function buyItem(index) {
    const item = cart[index];
    viewPurchaseDetails(item); // Show purchase details

    const confirmation = confirm(`Do you want to purchase ${item.name} for ₹${item.total}?`);

    if (confirmation) {
        // Simulate a purchase process
        alert(`Thank you for purchasing ${item.name}!`);
        
        // Remove the item from the cart after purchase
        removeFromCart(index);
    }
}




function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    cart[index].total = cart[index].price * cart[index].quantity;
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function purchaseItem(index) {
    const item = cart[index];
    alert(`Purchased item: ${item.name}\nSize: ${item.size}\nPrice: ₹${item.price}\nQuantity: ${item.quantity}`);
    cart[index].status = 'Purchased'; // Add status to the item
    updateCart();
}

function checkout() {
    alert('Thank you for your purchase!');
    const items = document.querySelectorAll('#cart-items tr');
    items.forEach(item => {
        item.querySelector('.order-status').textContent = 'Order Confirmed';
        item.querySelector('button').disabled = true; // Disable remove button after checkout
    });
    // No need to clear the cart, just update the status
}

function back() {
    document.getElementById('product-details').style.display = 'none';
}

// function showSection(sectionId) {
//     const sections = ['home','about','contact','shop','cart-section'];
//     sections.forEach(id => {
//         const section = document.getElementById(id);
//         if (section) {
//             section.style.display = (id === sectionId) ? 'block' : 'none';
//         } else {
//             console.error(`Section with id '${id}' not found.`);
//         }
//     });
// }


// To show only About Us

// function about(){
//     showSection("about")
// }
// function contact(){
//     showSection("contact")
// }function shop(){
//     showSection("shop")
// }function home(){
//     showSection("home")
// }


