class PastrysList {
    constructor() {
        this.pastrys = [];
    }

    add(pastry) {
        this.pastrys.push(pastry);
    }

    getPastry(name) {
        return this.pastrys.find(pastry => pastry.name == name);
    }
}

export default PastrysList;