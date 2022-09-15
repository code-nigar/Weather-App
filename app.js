const form = document.getElementById("weather-form");
const api_key = "9e3960c2ebff15e2d447070496864bde";
var city = "Karachi";
const result_div = document.getElementById("result");

const getWeather = async (city) => {
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  showWeather(data);
  getBackground(data.weather[0].icon);
  // console.log(data.weather[0].icon);
};

const getBackground = (img_code) => {
  console.log(img_code);
  switch (img_code) {
    case "01d":
      document.getElementById("body").style.backgroundImage =
        'url("images/sunny-d.jpg")';
            break;
    case "01n":
      document.getElementById("body").style.backgroundImage =
        'url("images/clear-n.jpg")';
            break;
    case "02d":
      document.getElementById("body").style.backgroundImage =
        'url("images/clear-d.jpg")';
            break;
    case "03d":
    case "04d":
      document.getElementById("body").style.backgroundImage =
        'url("images/cloudy-d.jpg")';
            break;
    case "02n":
    case "03n":
    case "04n":
      document.getElementById("body").style.backgroundImage =
        'url("images/cloudy-n.jpg")';
            break;
    case "09d":
    case "10d":
      document.getElementById("body").style.backgroundImage =
        'url("images/rainy-d.jpg")';
            break;
    case "09n":
    case "10n":
      document.getElementById("body").style.backgroundImage =
        'url("images/rainy-n.jpg")';
            break;
    case "11d":
    case "11n":
      document.getElementById("body").style.backgroundImage =
        'url("images/thunder.jpg")';
            break;
    case "50d":
        console.log("ok");
      document.getElementById("body").style.backgroundImage =
        'url("./images/smoke-d.jpg")';
            break;
    case "50n":
      document.getElementById("body").style.backgroundImage =
        'url("images/smoke-n.jpg")';
            break;
  }
  //foreground color switch
  if(img_code[img_code.length-1] == 'n'){
    document.getElementById("body").style.color = "white";
  }else{
    document.getElementById("body").style.color = "black";
  }
};

const showWeather = (data) => {
  if (data.cod == 404 || data.cod == 400){
    swal({
    icon:"error",
    title:"Error: "+data.cod,
    text: data.message+"\nTry again",
    timer: 2000
    });
  }
  let temp = Math.round(data.main.temp);
  result_div.innerHTML = `
    <h2 id="city"><i class="fa-solid fa-location-dot"></i> ${ data.name}</h2>
    <div>
    <div id="temp">${temp}&#176 C</div>
    <div id="condition">${data.weather[0].main}</div>
    </div>
    `;
    
    //<div>
    //<div id="icon"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></div>
    //</div>
};

form.addEventListener("submit", function (event) {
  city = document.getElementById("city-name").value;
  console.log(city);
  getWeather(city);
  event.preventDefault();
});
