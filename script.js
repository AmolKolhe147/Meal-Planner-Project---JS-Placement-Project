
// Navbar For Mobie devices
const mobile_nav = document.querySelector(".mobile-navbar-btn");
const nav_header = document.querySelector(".header");

const toggleNavbar = () => {
  // alert(" See Navbar ");
  nav_header.classList.toggle("active");
};

mobile_nav.addEventListener("click", () => toggleNavbar());


// Code to calculate the Daily Calories requirements.

const height = document.getElementById("height");
const weight = document.getElementById("weight");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const activity = document.getElementById("activity");

let calories=0;
let valueofBMR=0;
const submitbtn = document.getElementById("generate-meal");

submitbtn.addEventListener("click", (event) => {
    event.preventDefault();

    document.querySelector(".show-ingradients").style.display = "none";
    document.getElementById("calorie-ID").style.display = "none";
    document.querySelector(".contact-section").style.display ="none";

    var user=document.getElementById("height").value;
    if(user ==""){
        document.getElementById("input-height").innerHTML = "** Please enter the height first";
        document.getElementById("height").focus();
        return false;
    }

    var inputWeight=document.getElementById("weight").value;
    if(inputWeight ==""){
        document.getElementById("input-Weight").innerHTML = "** Please enter the Weight first";
        document.getElementById("weight").focus();
        return false;
    }

    var inputAge=document.getElementById("age").value;
    if(inputAge ==""){
        document.getElementById("input-age").innerHTML = "** Please enter the Age first";
        document.getElementById("age").focus();
        return false;
    }

   // var inputGender=document.getElementById("gender");
    if(document.getElementById('gender').selectedIndex == 0)
    {
        document.getElementById("input-gender").innerHTML = "** Please select gender first";
        document.getElementById('gender').focus();
        return false;
    }

    if(document.getElementById('activity').selectedIndex == 0)
    {
        document.getElementById("input-activity").innerHTML = "** Please select the activity level first";
        document.getElementById('activity').focus();
        return false;
    }
    
    var hide=document.querySelector(".user-form-section").style.display = "none";

    const w= (13.75 * parseFloat(weight.value));
    const h= (5.003 * parseFloat(height.value));
    const a= (6.755 * parseFloat(age.value));

    const womenweight = (9.563 * parseFloat(weight.value));
    const womenheight = (1.850 * parseFloat(height.value));
    const womenage = (4.676 * parseFloat(age.value));

    if(gender.value === "male")
    {
        valueofBMR = (66.5 + w + h - a);
    }
    else if(gender.value === "female")
    {
        valueofBMR= (655 + womenweight + womenheight - womenage);
    }

    if (valueofBMR > 0 && activity.value)
    {
    if(activity.value === "1")
    {
        calories = valueofBMR * 1.375;
    }
    else if(activity.value === "2")
    {
        calories = valueofBMR * 1.55;
    }
    else if(activity.value === "3")
    {
        calories = valueofBMR * 1.725;
    }
}

generateMealData();  
      console.log(calories);

  });

  const appid="bb0f236781c34b768bc66fea41b9b32d";

  function generateMealData(){

    var display = document.querySelector("#meal-container");
    display.style.display = "block";

        fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=${appid}&timeFrame=day&targetCalories=${calories}`)
        .then((response) => {
            return response.json();
        }).then((completeResponse) => {

            completeResponse.meals.forEach((data, index) => {

                fetch(`https://api.spoonacular.com/recipes/${data.id}/information?apiKey=${appid}`)
            .then((data) => {
                return data.json();
            }).then((completeData) => {
                let imageUrl=completeData.image;
                let data1="";

                data1 =` 
                <div class="card">
                   <h1 class="title">${index === 0 ? "Dinner" : index === 1 ? "Lunch" : "Breakfast"}</h1>
                   <img class="images" src=${imageUrl}
                   alt="dish">
                   <div class="contentDiv">
                    <p class="meal-name">${data.title}</p>
                    <div class="mealsData">
                   <p class="ready">Ready in minutes: - ${data.readyInMinutes}</p> 
                   <p class="calories">Calories: - ${completeResponse.nutrients.calories}</p>
               </div>
           
                   <p class="serving">Servings: - ${data.servings}</p>
               </div>
                   <button class="get-recipe" onclick="getRecipe(${data.id})">GET RECIPE</button>
               </div>
           
            `;
            document.getElementById("cards").innerHTML += data1;
            });

            });
                
            });
        
  };

let ingredients;
let steps;
let equipments;

function getRecipe(id) {
    console.log(id);
    var element = document.getElementById("recipe-section");
    element.style.display = "block";
    
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${appid}`)
      .then((response) => {
        return response.json();
      }).then((completeResponse) => {

        console.log(completeResponse);
        document.getElementById("tabs-result").innerHTML = "";
  
        steps = completeResponse.analyzedInstructions[0].steps;
        ingredients = completeResponse.extendedIngredients;
        console.log(ingredients);
        console.log(steps);
        equipments = [];
        steps.forEach((e) => {
          if (e.equipment.length != 0) {
            equipments.push(e.equipment[0]);
          }
        });
        console.log(equipments);
        Ingradients();
      });
  }

function Ingradients() {
    document.getElementById("tabs-result").innerHTML = "";
    
    ingredients.forEach((e, index) => {
        
     const Data = `
              <div class="ingradients">
                  <p class="itemname">${e.name}</p>
                  <span>${e.amount} ${e.unit}</span>
              </div>
          `;
      document.getElementById("tabs-result").innerHTML += Data;
    });
  }

  function mealSteps() {
   document.getElementById("tabs-result").innerHTML = "";
   
    steps.forEach((e, index) => {
       
      const Data = `
              <div class="stepsItem">
                  <span class="itemname">Steps - ${e.number}</span>
                  <span>${e.step}</span>
              </div>
          `;
      document.getElementById("tabs-result").innerHTML += Data;
    });
  }
  
  function mealEquipments() {

    
    
   document.getElementById("tabs-result").innerHTML = "";
   
    equipments.forEach((e, index) => {
        
      const Data = `
              <div class="ingradients">
                  <p class="itemname">${e.name}</p>
              </div>
          `;
      document.getElementById("tabs-result").innerHTML += Data;
    });
  }

  let mealPlan=document.querySelector(".show-ingradients");

  function getMealPlans(){
    document.getElementById("showdata").style.display = "none";
    document.getElementById("showdata").style.display = "none";
    
    document.getElementById("calorie-ID").style.display = "none";
    document.querySelector(".contact-section").style.display = "none";
    document.querySelector(".meal-plan").style.display = "none";
    document.getElementById("popup").style.display = "none";


    document.querySelector(".show-ingradients").style.display = "block";
  }

//   JS Code for Search by ingradients section

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// const appid="812dc14b6e9342f1a7e8ac22079e868a";

// event listeners
searchBtn.addEventListener('click', getMealList);
// mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${appid}&ingredients=${searchInputTxt}`)
    .then(response => {
        
        return response.json();
        console.log(response);
}).then(data => {
    console.log(data);
        let html = "";
        
        if(data){
            data.forEach(meal => {
        
                html += `
                    <div class = "meal-item" data-id = "${meal.id}">
                        <div class = "meal-img">
                            <img src = "${meal.image}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.title}</h3>
                            <p>Likes - ${meal.likes}</p>
                            <a href = "#" class = "recipe-btn" onclick="getMealRecipe(${meal.id})">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    // e.preventDefault();
   // console.log(e.target);
    // if(e.target.classList.contains('recipe-btn')){
        // let mealItem = e.target.parentElement.parentElement;
        fetch(`https://api.spoonacular.com/recipes/${e}/information?apiKey=${appid}`)
        .then(response => response.json())
        .then(data => {console.log(data);
          mealRecipeModal(data)});
    // console.log(data));
    
}

// // create a modal
function mealRecipeModal(meal){
    console.log(meal);
    // meal = meal[0];
    let html = `
    <div class="ingradients-section">
        <h1>Recipe</h1>
        <h2 class = "recipe-title">${meal.title}</h2>
        <div class = "mealimg">
        <img src = "${meal.image}" alt = "food">
        </div>
                    <h1 class=pop-heading> Instructions </h1>
                  <p class="itemname">${meal.instructions}</p>
                </div> </br>
                <div class=conDiv>
                    <h2> Likes - ${meal.aggregateLikes}</h2>
                </div>

              
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

function showCalorie(){

    document.getElementById("showdata").style.display = "none";
    document.querySelector(".show-ingradients").style.display = "none";
    document.querySelector(".contact-section").style.display = "none"
    document.getElementById("calorie-ID").style.display = "block";
    document.querySelector(".meal-plan").style.display = "none";
    document.getElementById("popup").style.display = "none";
}

// Calorie Calculate

const calheight = document.getElementById("calorieheight");
const calweight = document.getElementById("calorieweight");
const calage = document.getElementById("calorieage");
const calgender = document.getElementById("caloriegender");
const calactivity = document.getElementById("calorieactivity");

const caloriebtn = document.getElementById("calorie-btn");

caloriebtn.addEventListener("click", (event) => {
    event.preventDefault();

    const w= (13.75 * parseFloat(calweight.value));
    const h= (5.003 * parseFloat(calheight.value));
    const a= (6.755 * parseFloat(calage.value));

    const womenweight = (9.563 * parseFloat(calweight.value));
    const womenheight = (1.850 * parseFloat(calheight.value));
    const womenage = (4.676 * parseFloat(calage.value));

    if(calgender.value === "male")
    {
        valueofBMR = (66.5 + w + h - a);
    }
    else if(calgender.value === "female")
    {
        valueofBMR= (655 + womenweight + womenheight - womenage);
    }

    if (valueofBMR > 0 && calactivity.value)
    {
    if(calactivity.value === "1")
    {
        calories = valueofBMR * 1.375;
    }
    else if(calactivity.value === "2")
    {
        calories = valueofBMR * 1.55;
    }
    else if(calactivity.value === "3")
    {
        calories = valueofBMR * 1.725;
    }
}

   console.log(calories);
   document.getElementById("result").innerHTML = "Your Daily required calories are - " + calories;

});

function getContactUs(){
    document.getElementById("showdata").style.display = "none";
    document.querySelector(".show-ingradients").style.display = "none";
    document.getElementById("calorie-ID").style.display = "none";
    document.querySelector(".contact-section").style.display = "block";
    document.querySelector(".meal-plan").style.display = "none";
    document.getElementById("popup").style.display = "none";
}