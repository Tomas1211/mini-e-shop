const productList = document.getElementById("productList")

const fetchProducts = async () => {
    try {
        const response = await fetch("./data.json")
        const data = await response.json()

        data.forEach(product => {
            const li = document.createElement("li")
            li.classList.add("product")
            li.innerHTML = `
                <h3 class="product__name">${product.name}</h3>
                <p class="product__price">${product.price} $</p>
                <p class="product__category">${product.category}</p>
            `

            productList.appendChild(li)
        })
    } catch (error) {
        console.log(error)
    }
}

fetchProducts()