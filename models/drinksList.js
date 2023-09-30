class Drinks {
    constructor() {
        this.drinks = [];
    }

    add(drink) {
        this.drinks.push(drink);
    }

    getDrink(id) {
        return this.drinks.find(drink => drink.id == id);
    }
}

export default Drinks;