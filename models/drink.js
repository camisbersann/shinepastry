var id = 0;

class Drink {
    constructor(name, price, quantml) {
        this.id = this.makeID() + 'a';
        this.name = name;
        this.price = price;
        this.quantMl = quantml;
        this.ingredients = [];
    }

    makeID() {
        return id++
    }
}

export default Drink;