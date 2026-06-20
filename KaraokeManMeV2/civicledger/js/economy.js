// =====================  ito yung sa Economy.js ko ===

let cityCash = 1500;
let cityLevel = 1;
let cityPopulation = 5;

let cityFood = 525;
let cityWater = 735;

const foodBurnRatePerDay = cityPopulation * 15;
const waterBurnRatePerDay = cityPopulation * 21;


function updateResourceHUD() {
    document.getElementById('cash-display').innerText = cityCash.toLocaleString();
    document.getElementById('food-display').innerText = cityFood.toLocaleString();
    document.getElementById('water-display').innerText = cityWater.toLocaleString();
    document.getElementById('pop-display').innerText = cityPopulation.toLocaleString();

    const foodDaysLeft = Math.floor(cityFood / foodBurnRatePerDay);
    const waterDaysLeft = Math.floor(cityWater / waterBurnRatePerDay);

    // Food Forecast Text Display (English)
    const foodDurationText = document.getElementById('food-duration');
    if (foodDaysLeft >= 7) {
        foodDurationText.innerText = `${foodDaysLeft} Days Left (Safe)`;
        foodDurationText.style.color = "#4caf50"; // Green color
    } else {
        foodDurationText.innerText = `⚠️ Critical! ${foodDaysLeft} Days Left`;
        foodDurationText.style.color = "#f44336"; // Red color
    }

    // Water Forecast Text Display (English)
    const waterDurationText = document.getElementById('water-duration');
    if (waterDaysLeft >= 7) {
        waterDurationText.innerText = `${waterDaysLeft} Days Left (Safe)`;
        waterDurationText.style.color = "#4caf50"; // Green color
    } else {
        waterDurationText.innerText = `⚠️ Critical! ${waterDaysLeft} Days Left`;
        waterDurationText.style.color = "#f44336"; // Red color
    }
}


// Patakbuhin agad sa umpisa
updateResourceHUD();


