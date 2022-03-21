const wrapper = document.querySelector(".wrapper");
const inputValue = document.querySelector("input")
const buttonSubmit = document.querySelector(".onSubmit")
buttonSubmit.addEventListener('click', fetchCityName)
const locationSubmit = document.querySelector(".button")
const inputPart = document.querySelector('.input-part')
const infoText = inputPart.querySelector('.info-txt')
const weatherIcon = wrapper.querySelector('.weather-part img')
const backArrow = wrapper.querySelector("header i")
backArrow.addEventListener('click', () => {
    wrapper.classList.remove("active");
})
let apiKey = '12131e23e1d084c282316f816a1c82ed';

//-----------------------------Location button weather----------------------------------------------------
locationSubmit.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else {
        alert("Your browser does not support geolocation")
    }
})
function onSuccess(position) {
    infoText.classList.add("pending")
    infoText.innerText = "Getting Weather Details....."
    const { latitude, longitude } = position.coords;
    console.log(latitude)
    console.log(longitude);
    let api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=12131e23e1d084c282316f816a1c82ed`;
    fetch(api).then((data) => {
        return data.json();
    })
        .then((weatherdata) => {
            wetherDetails(weatherdata)
        })
}
function onError() {
    infoText.classList.add("error")
    infoText.innerText="Device location is off"
    

}
//-----------===============================================================================================
function fetchCityName() {
    const cityName = inputValue.value;
    if (cityName != "") {
        requesApi(cityName)
    }
}
function requesApi(city) {
    infoText.classList.add("pending")
    infoText.innerText = "Getting Weather Details....."
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(api).then((response) => {
        return response.json();

    })
        .then((details) => {
            wetherDetails(details);
        })
}

//---========================================weather details======================================================
function wetherDetails(weatherData) {
    console.log(weatherData)
    if (weatherData.cod == "404") {
        infoText.classList.replace("pending", "error")
        infoText.innerText = `${inputValue.value} isn't a valid City Name`
    }
    else {
        infoText.classList.remove("pending", "error")
        wrapper.classList.add("active")
    }
    const city = weatherData.name;
    const { feels_like, humidity, temp } = weatherData.main;
    const country = weatherData.sys.country;
    const { description, id } = weatherData.weather[0];

    if (id == 800) {
        weatherIcon.src = "Weather%20Icons/clear.svg"
    }
    else if (id >= 500 && id <= 531 || id >= 300 && id <= 321) {
        weatherIcon.src = "Weather%20Icons/rain.svg"
    }
    else if (id >= 200 && id <= 232) {
        weatherIcon.src = "Weather%20Icons/storm.svg"
    }
    else if (id >= 701 && id <= 781) {
        weatherIcon.src = "Weather%20Icons/haze.svg"
    }
    else if (id >= 801 && id <= 804) {
        weatherIcon.src = "Weather%20Icons/cloud.svg"
    }
    else if (id >= 600 && id <= 622) {
        weatherIcon.src = "Weather%20Icons/snow.svg"
    }
    wrapper.querySelector('.temp .number').innerText = Math.floor(temp);
    wrapper.querySelector('.weather-details').innerText = description;
    wrapper.querySelector('.location span').innerText = `${city}, ${country}`;
    wrapper.querySelector('.temp .number-2').innerText = Math.floor(feels_like);
    wrapper.querySelector('.humidity  span').innerText = `${humidity}%`;



}


