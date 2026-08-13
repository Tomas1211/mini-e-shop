const products = document.getElementById("products")

const fetchProducts = async () => {
    try {
        const response = await fetch("./data.json")
        const data = await response.json()

        data.forEach(product => {
            const div = document.createElement("div")
            div.classList.add("product")
            div.innerHTML = `
                <img
                    class="product__image"
                    src="${product.image}"
                    alt="${product.name}"
                >
                <div class="product__data">
                    <h3 class="product__name">${product.name}</h3>
                    <p class="product__price">${product.price} $</p>
                    <p class="product__category">${product.category}</p>
                </div>
            `

            products.appendChild(div)
        })
    } catch (error) {
        console.log(error)
    }
}

fetchProducts()