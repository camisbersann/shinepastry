import pastryIngredients from "./pastryIngredients"

const pastrys = [
    {
        id: 1,
        name: 'Pastel de pizza',
        ingredients : [
            pastryIngredients[0].name,
            pastryIngredients[1].name,
            pastryIngredients[2].name
        ],
        price : pastryIngredients[0].price + pastryIngredients[1].price + pastryIngredients[2].price,
    },
    {
        id: 2,
        name: 'Pastel de carne',
        ingredients : [
            pastryIngredients[0].name,
            pastryIngredients[3].name,
            pastryIngredients[6].name
        ],
        price : pastryIngredients[0].price + pastryIngredients[3].price + pastryIngredients[6].price,
    },
    {
        id: 3,
        name: 'Pastel de frango',
        ingredients : [
            pastryIngredients[0].name,
            pastryIngredients[4].name,
            pastryIngredients[6].name
        ],
        price : pastryIngredients[0].price + pastryIngredients[4].price + pastryIngredients[6].price,
    },
    {
        id: 4,
        name: 'Pastel de bacon',
        ingredients : [
            pastryIngredients[0].name,
            pastryIngredients[3].name,
            pastryIngredients[8].name
        ],
        price : pastryIngredients[0].price + pastryIngredients[3].price + pastryIngredients[8].price,
    },
    {
        id: 5,
        name: 'Pastel de brócolis',
        ingredients : [
            pastryIngredients[0].name,
            pastryIngredients[9].name,
            pastryIngredients[6].name
        ],
        price : pastryIngredients[0].price + pastryIngredients[9].price + pastryIngredients[6].price,
    },
    {
        id: 6,
        name: 'Pastel de chocolate',
        ingredients : [
            pastryIngredients[0].name,
            pastryIngredients[10].name,
            pastryIngredients[11].name
        ],
        price : pastryIngredients[0].price + pastryIngredients[10].price + pastryIngredients[11].price,
    },
    {
        id: 7,
        name: 'Pastel de banana',
        ingredients : [
            pastryIngredients[0].name,
            pastryIngredients[12].name,
            pastryIngredients[11].name
        ],
        price : pastryIngredients[0].price + pastryIngredients[12].price + pastryIngredients[11].price,
    },
]

export default pastrys
