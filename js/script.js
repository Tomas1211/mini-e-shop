const products = document.getElementById("products")
const cartCount = document.getElementById("cartCount")

const state = {
    cart: []
}

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
                <button class="addToCartBtn">Add to Cart</button>
            </div>
            `
            

            const addToCartBtn = div.querySelector(".addToCartBtn")


            addToCartBtn.addEventListener("click", () => {

                
                const existingProduct = state.cart.find(item => item.id === product.id)


                if (!existingProduct) {
                    state.cart.push(
                        {
                            ...product,
                            quantity: 1
                        }
                    )
                } else {
                    existingProduct.quantity++
                }

                console.log(state.cart)
                
                updateCartCount()
            })
            

            products.appendChild(div)
        })
    } catch (error) {
        console.log(error)
    }
}

fetchProducts()


const updateCartCount = () => {
    cartCount.textContent = `Cart: ${state.cart.length}`
}