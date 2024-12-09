import { menuArray } from './data.js'

const renderMenu = (dinerMenu) => {
    return dinerMenu.map(({emoji, name, ingredients, price, id}) => `
        <div class="menu-list" id="menu-item-${id}">
            <p class="menu-image">${emoji}</p>
            <div class="menu-details">
                <h1>${name}</h1>
                <p>${ingredients.join(', ')}</p>
                <h2>$${price}</h2>
            </div>
            <button class="add-btn" data-addmenu="${id}">+</button>
        </div>
    `).join('')
}

document.getElementById('menu').innerHTML = renderMenu(menuArray)

let dinerCart = []

if (dinerCart.length === 0) {
    document.getElementById('complete-order-btn').classList.add('hidden')
}

const renderCart = (dinerCart) => {
    return dinerCart.map(({name, id, count, price}) => `
        <div class="cart-item" id="cart-item-${id}">
            <h1>${name}</h1>
            <span class="remove-btn" data-removemenu="${id}">Remove</span>
            <h2>${count} x $${price} = $${(count * price).toFixed(2)}</h2>
        </div>
    `).join('')
}

const updateCartDisplay = () => {
    const cartContentEl = document.getElementById('cart')
    const totalPriceEl = document.getElementById('total-item-price')
    const completeOrderEl = document.getElementById('complete-order-btn')

    if (dinerCart.length === 0) {
        cartContentEl.classList.add('hidden')
        completeOrderEl.classList.add('hidden')
    } else {
        cartContentEl.classList.remove('hidden')
        completeOrderEl.classList.remove('hidden')
    }

    cartContentEl.innerHTML = renderCart(dinerCart)

    const totalPrice = dinerCart.reduce((total, { price, count }) => total + price * count, 0)
    totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`
}

const handleAddBtn = (itemId) => {
    const targetMenuObj = menuArray.find(item => item.id === Number(itemId))
    if (!targetMenuObj) return

    const existingItem = dinerCart.find(item => item.id === targetMenuObj.id)

    if (existingItem) {
        existingItem.count += 1
    } else {
        dinerCart.push({ ...targetMenuObj, count: 1 })
    }

    updateCartDisplay()
}

const handleRemoveBtn = (itemId) => {
    const targetMenuObj = menuArray.find(item => item.id === Number(itemId))
    
    if (!targetMenuObj) return

    const existingItem = dinerCart.find(item => item.id === targetMenuObj.id)

    if (existingItem) {
        if (existingItem.count === 1) {
            dinerCart = dinerCart.filter(item => item.id !== targetMenuObj.id)
        } else {
            existingItem.count -= 1
        }
    }

    updateCartDisplay()
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.addmenu) {
        handleAddBtn(e.target.dataset.addmenu)
    }

    if (e.target.dataset.removemenu) {
        handleRemoveBtn(e.target.dataset.removemenu)
    }

    if (e.target === document.getElementById('complete-order-btn')) {
        document.getElementById('payment-modal').style.display = 'block'
    }
})