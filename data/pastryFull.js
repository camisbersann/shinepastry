import pastryIngredients from "./pastryIngredients"

const pastrys = [
    {
        id: 1,
        name: 'Pastel de pizza',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[1],
            pastryIngredients[2]
        ],
        price : pastryIngredients[0].price + pastryIngredients[1].price + pastryIngredients[2].price,
    },
    {
        id: 2,
        name: 'Pastel de carne',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[3],
            pastryIngredients[6]
        ],
        price : pastryIngredients[0].price + pastryIngredients[3].price + pastryIngredients[6].price,
    },
    {
        id: 3,
        name: 'Pastel de frango',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[4],
            pastryIngredients[6]
        ],
        price : pastryIngredients[0].price + pastryIngredients[4].price + pastryIngredients[6].price,
    },
    {
        id: 4,
        name: 'Pastel de bacon',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[3],
            pastryIngredients[8]
        ],
        price : pastryIngredients[0].price + pastryIngredients[3].price + pastryIngredients[8].price,
    },
    {
        id: 5,
        name: 'Pastel de brócolis',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[9],
            pastryIngredients[6]
        ],
        price : pastryIngredients[0].price + pastryIngredients[9].price + pastryIngredients[6].price,
    },
    {
        id: 6,
        name: 'Pastel de chocolate',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[10],
            pastryIngredients[11]
        ],
        price : pastryIngredients[0].price + pastryIngredients[10].price + pastryIngredients[11].price,
    },
    {
        id: 7,
        name: 'Pastel de banana',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[12],
            pastryIngredients[11]
        ],
        price : pastryIngredients[0].price + pastryIngredients[12].price + pastryIngredients[11].price,
    },
]

export default pastrys
