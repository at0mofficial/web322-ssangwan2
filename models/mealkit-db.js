let meals = [
    {title:"Sautéed Ground Pork over Jasmine Rice",
    includes:"Toasted Peanuts & Quick-Pickled Cucumber SaladToasted Peanuts & Quick-Pickled Cucumber Salad",
    description:"Gingery pork, crunchy cucumbers, and toasty peanuts",
    category:"Lunch",
    price:19.99,
    cookingTime:25,
    servings:2,
    imageUrl:"Sautéed Ground Pork over Jasmine Rice.jpg",
    topMeal:false},

    {title:"Grilled Shrimp",
    includes:"Garlic Cloves, Italian Seasoning, Dijon mustard & Lemon Juice",
    description:"With chopped parsley",
    category:"Dinner",
    price:23.99,
    cookingTime:35,
    servings:1,
    imageUrl:"Grilled Shrimp.jpg",
    topMeal:true},

    {title:"Chilly Chicken",
    includes:"Chicken, Bell Peppers, Garlic, Chilli and Soya Sauce",
    description:"With roasted chilly and veggies",
    category:"Lunch",
    price:19.99,
    cookingTime:25,
    servings:2,
    imageUrl:"Chilly Chicken.jpg",
    topMeal:true},

    {title:"Spicy Spaghetti",
    includes:"Pasta, Olive Oil, Cherry Tomatoes, Chilli Peppers, Herbs and Spices",
    description:"Italian cuisine",
    category:"Lunch",
    price:20.99,
    cookingTime:15,
    servings:3,
    imageUrl:"Spicy Spaghetti.jpg",
    topMeal:true},

    {title:"Black Bean Tostadas",
    includes:"Corn Salsa, Avocado Ranch, Pickled Red Onions",
    description:"With avocado and corn salsa",
    category:"Lunch",
    price:19.99,
    cookingTime:25,
    servings:2,
    imageUrl:"Black Bean Tostadas.jpg",
    topMeal:false},

    {title:"Arroz Con Pollo",
    includes:"Freshly ground black pepper, ground cumin, onion, bell peppers, garlic cloves",
    description:"low-sodium chicken, with dicd onions and cilantro",
    category:"Dinner",
    price:15.99,
    cookingTime:15,
    servings:2,
    imageUrl:"Arroz Con Pollo.jpg",
    topMeal:false}

];

exports.getTopMealkits = function () {
    let topmeals=[];

    for (let i = 0; i < meals.length; i++){
        if (meals[i].topMeal){
            topmeals.push(meals[i]);
        }
    }
    return topmeals;
};

exports.getMealkitsByCategory = function () {
    let catMeals = meals.reduce((acc,mealObj)=>{
        const mealCategory = mealObj["category"];
        let idx = -1;
        acc.forEach((accObj, i) => {
            accObj["categoryName"] === mealCategory ? idx = i : 0;
        })
    
        if (idx === -1) {
            acc.push({
                categoryName: mealCategory,
                mealKits: [mealObj]
            })
        }
    
        else {
            acc[idx]["mealKits"].push(mealObj);
        }
    
        return acc;
    }, []);

    return catMeals;

};

