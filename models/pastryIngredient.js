var id = 0

class PastryIngredient {
    constructor(name, price) {
        this.id = this.makeID();
        this.name = name;
        this.quant = 0;
        this.price = price;
        this.totalPrice = this.getTotalPrice();
    }

    increaseQuant() {
        this.quant++;
        this.totalPrice = this.getTotalPrice();
    }

    decreaseQuant() {
        if (this.quant > 0) {
            this.quant--;
            this.totalPrice = this.getTotalPrice();
        }
    }

    makeID() {
        return id++
    }

    getTotalPrice() {
        return this.quant * this.price;
    }
}

export default PastryIngredient;