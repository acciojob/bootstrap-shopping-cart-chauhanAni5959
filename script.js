const products = [
    {
        id: 1,
        name: "I am very sorry",
        details: ["Display: 5 inches", "RAM: 4GB", "Memory: 32GB"],
        price: 120,
        quantity: 0,
        img: "https://dummyimage.com/100x100/eee/333&text=Phone",
    },
    {
        id: 2,
        name: "I am very sorry",
        details: ["Display: 5 inches", "RAM: 4GB", "Memory: 32GB"],
        price: 120,
        quantity: 1,
        img: "https://dummyimage.com/100x100/eee/333&text=Phone",
    },
    {
        id: 3,
        name: "I am very sorry",
        details: ["Display: 5 inches", "RAM: 4GB", "Memory: 32GB"],
        price: 120,
        quantity: 1,
        img: "https://dummyimage.com/100x100/eee/333&text=Phone",
    },
];

function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(({ id, name, details, price, quantity, img }) => {
        const prod = document.createElement("div");
        prod.className = "product";

        prod.innerHTML = `
            <img src="${img}" alt="product" class="img-fluid" />
            <div class="product-details">
                <a href="#">${name}</a>
                ${details.map((d) => `<small>${d}</small>`).join("")}
            </div>
            <div class="quantity-group">
                <label class="quantity-label" for="qty-${id}">Quantity:</label>
                <input type="number" min="0" id="qty-${id}" class="form-control quantity-input" data-product-id="${id}" value="${quantity}" />
            </div>
            <div class="price">$${price}</div>
        `;

        productList.appendChild(prod);
    });
}

function updateSummary() {
    const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const discount = 0;
    const shipping = 0;
    const total = subtotal - discount + shipping;

    document.getElementById("subtotal").textContent = `$${subtotal}`;
    document.getElementById("discount").textContent = `$${discount}`;
    document.getElementById("shipping").textContent = `$${shipping}`;
    document.getElementById("total").textContent = `$${total}`;
}

function attachListeners() {
    document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("input", (e) => {
            const id = parseInt(e.target.dataset.productId);
            let val = parseInt(e.target.value);
            if (isNaN(val) || val < 0) val = 0;
            e.target.value = val;
            const product = products.find((p) => p.id === id);
            if (product) {
                product.quantity = val;
                updateSummary();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateSummary();
    attachListeners();
});
