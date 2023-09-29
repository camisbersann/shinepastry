class PastrysList {
    constructor() {
        this.pastrys = [];
    }

    add(pastry) {
        this.pastrys.push(pastry);
    }

    getPastry(id) {
        return this.pastrys.find(pastry => pastry.id == id-1);
    }
}

export default PastrysList;