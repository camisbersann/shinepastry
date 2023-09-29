class PastryIngredients {
    constructor() {
        this.pastryIngredients = [];
    }

    add(pastryIngredient) {
        this.pastryIngredients.push(pastryIngredient);
    }

    getIngredient(id) {
        return this.pastryIngredients.find(pastryIngredient => pastryIngredient.id == id-1);
    }
}

export default PastryIngredients;