import { menuArray } from './data.js'

document.addEventListener('click', function(e) {
    if (e.target.dataset.addMenu) {
        handleAddMenu(e.target.dataset.addMenu)
    }
})

function handleAddMenu(menuId) {
    const targetAddMenu = menuArray.filter(function(menu) {
        return menu.id === menuId
    })
    render()
}

function restaurantMenu() {
    let dinerMenu = ''

    menuArray.map(function(menu) {
        dinerMenu += `
            <div class="menu-list" id="menu-list">
                    <p class="menu-image">${menu.emoji}</p>
                    <div class="menu-details">
                        <h1>${menu.name}</h1>
                        <p>${menu.ingredients.join(', ')}</p>
                        <h2>$${menu.price}</h2>
                    </div>
                <button class="add-btn" id="add-btn" data-addmenu="${menu.id}">+</button>
            </div>
        `
    }).join('')
    return dinerMenu
}

function restaurantCart() {

}

function render() {
    document.getElementById('feed').innerHTML = restaurantMenu()
}

render()