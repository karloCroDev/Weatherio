"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _App_instances, _App_val, _App_count, _App_search, _App_success, _App_reject, _App_displayData, _App_displayWeatherInfo, _App_days, _App_hourly;
//Chnage theme
const checkbox = document.getElementById("checkbox");
const body = document.body;
const nav = document.querySelector("nav");
const switchTheme = (e) => {
    if (e.target.checked) {
        body.classList.add("dark");
        nav.classList.add("dark");
    }
    else {
        body.classList.remove("dark");
        nav.classList.remove("dark");
    }
};
checkbox.addEventListener("change", switchTheme, false);
////Main functunality
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "07bd0b64a9msh4ba8b441e657bf6p11bae9jsnc8d1b0292fb0",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
};
//Selectors
const input = document.querySelector("input");
const searchSvg = document.querySelector(".search-icon");
const mainInfo = document.querySelector(".main-info");
const forecast = document.querySelector(".article-forecast");
const conditions = document.querySelector(".conditions");
const future = document.querySelector(".future");
class App {
    constructor() {
        _App_instances.add(this);
        _App_val.set(this, false);
        _App_count.set(this, 1);
        // navigator.geolocation.getCurrentPosition(
        //   this.#success.bind(this),
        //   this.#reject
        // );
        // setTimeout(() => this.#fetchWeather(), 500) //I did this because when I did this immediattley it would fire off wrong region
        __classPrivateFieldGet(this, _App_instances, "m", _App_search).call(this);
    }
    fetchWeather() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${__classPrivateFieldGet(this, _App_val, "f")}&days=7`;
                //chnage this 1 to seven when I finish the app
                const response = yield fetch(url, options);
                const result = yield response.json();
                console.log(result);
                console.log(__classPrivateFieldGet(this, _App_count, "f"));
                __classPrivateFieldGet(this, _App_instances, "m", _App_displayData).call(this, result.location.name, result.location.region, result.current.temp_c, result.current.condition.icon);
                __classPrivateFieldGet(this, _App_instances, "m", _App_displayWeatherInfo).call(this, result.current.feelslike_c, result.current.wind_kph, result.current.humidity, result.current.uv);
                __classPrivateFieldGet(this, _App_instances, "m", _App_days).call(this, Math.round(result.forecast.forecastday[__classPrivateFieldGet(this, _App_count, "f")].day.maxtemp_c), result.forecast.forecastday[__classPrivateFieldGet(this, _App_count, "f")].day.condition.icon);
                __classPrivateFieldGet(this, _App_instances, "m", _App_hourly).call(this, result.forecast.forecastday[0].hour);
            }
            catch (error) {
                console.error(error);
                alert("This locaton doesn't exist");
            }
        });
    }
}
_App_val = new WeakMap(), _App_count = new WeakMap(), _App_instances = new WeakSet(), _App_search = function _App_search() {
    const getInfo = () => {
        __classPrivateFieldSet(this, _App_val, input.value, "f");
        console.log(__classPrivateFieldGet(this, _App_val, "f"));
        this.fetchWeather();
    };
    searchSvg.addEventListener("click", getInfo);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            getInfo();
        }
    });
}, _App_success = function _App_success(pos) {
    console.log(pos);
    __classPrivateFieldSet(this, _App_val, `${pos.coords.latitude}, ${pos.coords.longitude}`, "f");
}, _App_reject = function _App_reject(err) {
    alert("Please refresh and enable your location if you want to see your city forecast! However if you don't want to enable this then just type your city");
    console.log(err);
}, _App_displayData = function _App_displayData(city, region, weather, image) {
    mainInfo.innerHTML = `   <article>
            <div>
              <h1>${city}</h1>
              <h3>${region}</h3>
              <h1>${weather}°C</h1>
            </div>
            <img src="${image}" alt="aa" class="weather-img" />
          </article>`;
}, _App_displayWeatherInfo = function _App_displayWeatherInfo(temp, wind, humidity, uv) {
    conditions.innerHTML = `  <h1>Air conditions (today)</h1>
          <div class="align">
            <article>
              <div>
                <div class="details">
                  <h2>Temperature feel</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8 15.9998C7.44772 15.9998 7 16.4475 7 16.9998C7 17.5521 7.44772 17.9998 8 17.9998C8.55228 17.9998 9 17.5521 9 16.9998C9 16.4475 8.55228 15.9998 8 15.9998ZM8 15.9998L8.00707 12M8 16.9998L8.00707 17.0069M20 5C20 6.10457 19.1046 7 18 7C16.8954 7 16 6.10457 16 5C16 3.89543 16.8954 3 18 3C19.1046 3 20 3.89543 20 5ZM12 16.9998C12 19.209 10.2091 20.9998 8 20.9998C5.79086 20.9998 4 19.209 4 16.9998C4 15.9854 4.37764 15.0591 5 14.354L5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6V14.354C11.6224 15.0591 12 15.9854 12 16.9998Z"
                      stroke="#08d9d6"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <h1>${temp}°C</h1>
              </div>
              <div>
                <div class="details">
                  <h2>Wind feel</h2>
                  <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <h1>${wind}km/h</h1>
              </div>
              <div>
                <div class="details">
                  <h2>Humidity level</h2>
                  <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 21.5C16.1012 21.5 19.5 18.4372 19.5 14.5714C19.5 12.1555 18.2672 9.71249 16.8732 7.70906C15.4698 5.69214 13.8515 4.04821 12.9778 3.21778C12.4263 2.69364 11.5737 2.69364 11.0222 3.21779C10.1485 4.04821 8.53016 5.69214 7.1268 7.70906C5.73282 9.71249 4.5 12.1555 4.5 14.5714C4.5 18.4372 7.8988 21.5 12 21.5Z"
                      stroke="#222222"
                    />
                    <path
                      d="M12 18C11.4747 18 10.9546 17.8965 10.4693 17.6955C9.98396 17.4945 9.54301 17.1999 9.17157 16.8284C8.80014 16.457 8.5055 16.016 8.30448 15.5307C8.10346 15.0454 8 14.5253 8 14"
                      stroke="#222222"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <h1>${humidity}%</h1>
              </div>
              <div>
                <div class="details">
                  <h2>UV index</h2>
                  <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <h1>${uv}</h1>
              </div>
            </article>
          </div>`;
}, _App_days = function _App_days(temp, icon) {
    let day = "";
    if (__classPrivateFieldGet(this, _App_count, "f") === 0)
        day = "Today";
    else if (__classPrivateFieldGet(this, _App_count, "f") === 1)
        day = "Tommorow";
    else
        day = "2 days";
    future.innerHTML = `<article>
            <div class="nav-days">
              <h1>${day}</h1>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                  class="prev"
                >
                  <path
                    d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                  class="next"
                >
                  <path
                    d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                  />
                </svg>
              </div>
            </div>
            <section>
              <img src="${icon}" alt="img of next day weather " />
              <h2>Temperature: ${temp}°C</h2>
            </section>
          </article>`;
    const nextBtn = document.querySelector(".next");
    nextBtn.addEventListener("click", () => {
        var _a;
        __classPrivateFieldSet(this, _App_count, (_a = __classPrivateFieldGet(this, _App_count, "f"), _a++, _a), "f");
        // console.log(this.#count)
        __classPrivateFieldGet(this, _App_count, "f") === 3 ? (__classPrivateFieldSet(this, _App_count, 0, "f")) : "";
        console.log(__classPrivateFieldGet(this, _App_count, "f"));
        this.fetchWeather();
    });
    const previousBtn = document.querySelector(".prev");
    previousBtn.addEventListener("click", () => {
        var _a;
        __classPrivateFieldSet(this, _App_count, (_a = __classPrivateFieldGet(this, _App_count, "f"), _a--, _a), "f");
        __classPrivateFieldGet(this, _App_count, "f") === -1 ? (__classPrivateFieldSet(this, _App_count, 2, "f")) : "";
        console.log(__classPrivateFieldGet(this, _App_count, "f"));
        this.fetchWeather();
    });
}, _App_hourly = function _App_hourly(arr) {
    const data = arr
        .map((items) => {
        return `
        <div class="time-container">
              <h3><img src=${items.condition.icon} alt="hourly condition img" /></h3>
              <h3>${Math.round(items.temp_c)}°C</h3>
              <h3>${items.time.slice(-5)}h</h3>
            </div>
          `;
    })
        .flat()
        .join("");
    forecast.innerHTML = ` <h1>Hourly forecast</h1>` + data;
};
const appVar = new App();
