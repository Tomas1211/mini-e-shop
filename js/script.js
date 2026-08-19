const products = document.getElementById("products")
const cartCount = document.getElementById("cartCount")
const cart = document.getElementById("cart")

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

                <!-- From Uiverse.io by adamgiebl --> 
                <button class="addToCartBtn cssbuttons-io-button">
                    <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                    </svg>
                    <span>Add to Cart</span>
                </button>
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

                renderCart()
                updateCartCount()
            })
            

            products.appendChild(div)
        })
    } catch (error) {
        console.log(error)
    }
}

fetchProducts()


const updateQuantity = (id, amount) => {
    const updatedProduct = state.cart.find(product => product.id === id)

    switch (amount) {
        case 1:
            updatedProduct.quantity++

            break
        case -1:
            if (updatedProduct.quantity <= 1) {
                removeItem(updatedProduct.id)
                return
            }

            updatedProduct.quantity--

            
            break
        }
        
    renderCart()
    updateCartCount()
}


const updateCartCount = () => {
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = `Cart: ${count}`
}


const removeItem = (id) => {
    state.cart = state.cart.filter(item => item.id !== id)

    renderCart()
    updateCartCount()
}


const renderCart = () => {
    cart.innerHTML = ""
    
    if (state.cart.length !== 0) {
        cart.classList.add("box-shadow", "border-radius8px")
    } else {
        cart.classList.remove("box-shadow", "border-radius8px")
    }

    
    state.cart.forEach(item => {
        const div = document.createElement("div")
        div.classList.add("item")

        div.innerHTML = `
            <div class="item__recap">
                <h3 class="item__name">${item.name}</h3>
                <p class="item__price">
                    <span>${item.price} $</span>
                </p>
                <p class="item__quantity">Quantity: ${item.quantity}</p>
            </div>
            <div class="item__quantity-edit">
                <button class="minusBtn">[ - ]</button>
                <p class="quantity">${item.quantity}</p>
                <button class="plusBtn">[ + ]</button>
            </div>
        `


        const minusBtn = div.querySelector(".minusBtn")
        const plusBtn = div.querySelector(".plusBtn")


        // const quantity = div.querySelector(".quantity")

        minusBtn.addEventListener("click", () => updateQuantity(item.id, -1))

        plusBtn.addEventListener("click", () => updateQuantity(item.id, 1))
        
        
        const quantityEdit = div.querySelector(".item__quantity-edit")


        cart.appendChild(div)
    })
}