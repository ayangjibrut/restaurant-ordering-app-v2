import { menuArray } from './data.js'

// const menuList = document.getElementById('menu')

const renderMenu = function(dinerMenu) {
    return dinerMenu.map(function({emoji, name, ingredients, price, id}) {
        return `
            <div class="menu-list" id="menu-list">
                    <p class="menu-image">${emoji}</p>
                    <div class="menu-details">
                        <h1>${name}</h1>
                        <p>${ingredients.join(', ')}</p>
                        <h2>$${price}</h2>
                    </div>
                <button class="add-btn" id="add-btn" data-addmenu="${id}">+</button>
            </div>
        `
    }).join('')
}

document.getElementById('menu').innerHTML = renderMenu(menuArray)

let dinerCart = []

if (dinerCart.length <= 0) {
    document.getElementById('diner-cart').classList.add('hidden')
}

const renderCart = function(dinerCart) {
    return dinerCart.map(function({name, id, count, price}) {
        return `
            <div class="cart-item" id="cart-item">
                <h1>${name}</h1><span data-remove="${id}">remove</span>
                <h2>${count} X $${price} = $${count * price}</h2>
            </div>
        `
    }).join('')
}

const handleAddItem = function(itemId) {
    const targetMenuObj = menuArray.find(function(item) {
        item.id === Number(itemId)
    })

    const existingItem = dinerCart.find(function(item) {
        item.id === targetMenuObj.id
    })

    if (existingItem) {
        existingItem.count += 1
    } else {
        dinerCart.push({...targetMenuObj, count: 1})
    }

    document.getElementById('diner-cart').classList.remove('hidden')
}

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