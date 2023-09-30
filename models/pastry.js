var id = 0

class Pastry {
    constructor(name) {
        this.id = this.makeID();
        this.name = name;
        this.ingredients = [];
        this.price = this.getTotalPrice();
    }

    makeID() {
        return id++
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient)
    }

    getTotalPrice() {
        let price = 0;
        this.ingredients.forEach(ingredient => {
            price += ingredient.totalPrice
        })
        this.price = price;
    }

    renderPrice() {
        this.getTotalPrice()
    }

    getIngredient(id) {
        return this.ingredients.find(ingredient => ingredient.id == id-1);
    }

    increaseIngredientQuant(id) {
        this.getIngredient(id).increaseQuant()
        this.renderPrice()
    }

    decreaseIngredientQuant(id) {
        this.getIngredient(id).decreaseQuant()
        this.renderPrice()
    }
}

export default Pastry;