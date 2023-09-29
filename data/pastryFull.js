import pastryIngredients from "./pastryIngredients"

function calculatePrice(pastel) {
    let price = 0
    pastel.ingredients.forEach(ingredient => {
        price += ingredient.price
    })
    return price
}

const pastrys = [
    {
        id: 1,
        name: 'Pastel de pizza',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[1],
            pastryIngredients[2]
        ],
    },
    {
        id: 2,
        name: 'Pastel de carne',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[3],
            pastryIngredients[6]
        ],
    },
    {
        id: 3,
        name: 'Pastel de frango',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[4],
            pastryIngredients[6]
        ],
    },
    {
        id: 4,
        name: 'Pastel de bacon',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[3],
            pastryIngredients[8]
        ],
    },
    {
        id: 5,
        name: 'Pastel de brócolis',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[9],
            pastryIngredients[6]
        ],
    },
    {
        id: 6,
        name: 'Pastel de chocolate',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[10],
            pastryIngredients[11]
        ],
    },
    {
        id: 7,
        name: 'Pastel de banana',
        ingredients : [
            pastryIngredients[0],
            pastryIngredients[12],
            pastryIngredients[11]
        ],
    },
]

export default pastrys
