import { menuArray } from './data.js'

const renderMenu = function(dinerMenu) {
    return dinerMenu.map(function({emoji, name, ingredients, price, id}) {
        return `
            <div class="menu-list" id="menu-list">
                    <p class="menu-image">${emoji}</p>
                    <div class="menu-details">
                        <h1>${name}</h1>
                        <p>${ingredients.join(', ')}</p>
                        <h2>$${price.toFixed(2)}</h2>
                    </div>
                <button class="add-btn" id="add-btn" data-addmenu="${id}">+</button>
            </div>
        `
    }).join('')
}

document.getElementById('menu').innerHTML = renderMenu(menuArray)

let dinerCart = []

if (dinerCart.length === 0) {
    document.getElementById('complete-order-btn').classList.add('unclickable')
}

const renderCart = function(dinerCart) {
    return dinerCart.map(function({name, id, count, price}) {
        return `
            <div class="cart-item" id="cart-item">
                <h1>${name}</h1>
                <span class="remove-btn" data-removemenu="${id}">remove</span>
                <h2>${count} X $${price} = $${(count * price).toFixed(2)}</h2>
            </div>
        `
    }).join('')
}

const updateCartDisplay = function() {
    const cartContentEl = document.getElementById('cart')
    const totalPriceEl = document.getElementById('total-item-price')
    const completeOrderEl = document.getElementById('complete-order-btn')

    if (dinerCart.length === 0) {
        cartContentEl.classList.add('hidden')
        completeOrderEl.classList.add('unclickable')
    } else {
        cartContentEl.classList.remove('hidden')
        completeOrderEl.classList.remove('unclickable')
    }

    cartContentEl.innerHTML = renderCart(dinerCart)

    const totalPrice = dinerCart.reduce((total, { price, count }) => total + price * count, 0)
    totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`
}

const handleAddBtn = function(itemId) {
    const targetMenuObj = menuArray.find(function(item) {
        return item.id === Number(itemId)
    })

    if (!targetMenuObj) return

    const existingItem = dinerCart.find(function(item) {
        return item.id === targetMenuObj.id
    })

    if (existingItem) {
        existingItem.count++
    } else {
        dinerCart.push({...targetMenuObj, count: 1})
    }

    updateCartDisplay()

    // document.getElementById('diner-cart').classList.remove('hidden')

    // document.getElementById('cart').innerHTML = renderCart(dinerCart)

    // document.getElementById('total-item-price').textContent = `
    //     $${dinerCart.reduce((totalPrice, currentItem) => totalPrice + currentItem.price * currentItem.count, 0)}
    // `
}

const handleRemoveBtn = function(itemId) {
    const targetMenuObj = menuArray.find(function(item) {
        return item.id === Number(itemId)
    })

    if (!targetMenuObj) return

    const existingItem = dinerCart.find(function(item) {
        return item.id === targetMenuObj.id
    })

    if (existingItem) {
        if (existingItem.count === 1) {
            dinerCart = dinerCart.filter(function(item) {
                item.id !== targetMenuObj.id
            })
        } else {
            existingItem.count--
        }
    }

    updateCartDisplay()

    // if (dinerCart.length <= 0) {
    //     document.getElementById('diner-cart').classList.add('hidden')
    // }

    // document.getElementById('cart').innerHTML = renderCart(dinerCart)

    // document.getElementById('total-item-price').textContent = `
    //     $${dinerCart.reduce((totalPrice, currentItem) => totalPrice + currentItem.price * currentItem.count, 0)}
    // `
}

document.addEventListener('click', function(e) {
    if (e.target.dataset.addmenu) {
        handleAddBtn(e.target.dataset.addmenu)
    }

    if (e.target.dataset.removemenu) {
        handleRemoveBtn(e.target.dataset.removemenu)
    }
})

// document.addEventListener('click', function(e) {
//     if (e.target.dataset.addMenu) {
//         handleAddMenu(e.target.dataset.addMenu)
//     }
// })

// function handleAddMenu(menuId) {
//     const targetAddMenu = menuArray.filter(function(menu) {
//         return menu.id === menuId
//     })
//     render()
// }

// function restaurantCart() {

// }

// function render() {
//     document.getElementById('menu').innerHTML = restaurantMenu
// }

// render()