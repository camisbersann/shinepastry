class PastryIngredients {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.quant = 1;
        this.price = price*this.quant;
    }

    increaseQuant() {
        this.quant++;
    }
}