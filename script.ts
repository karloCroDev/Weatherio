//Chnage theme
const checkbox = document.getElementById("checkbox") as HTMLInputElement;
const body = document.body as HTMLBodyElement;
const nav = document.querySelector("nav") as HTMLElement;

const switchTheme = (e: any) => {
  if (e.target.checked) {
    body.classList.add("dark");
    nav.classList.add("dark");
  } else {
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
const input = document.querySelector("input") as HTMLInputElement;
const searchSvg = document.querySelector(".search-icon") as SVGElement;
const mainInfo = document.querySelector(".main-info") as HTMLDivElement;
const forecast = document.querySelector(".article-forecast") as HTMLDivElement;
const conditions = document.querySelector(".conditions") as HTMLDivElement;
const future = document.querySelector(".future") as HTMLDivElement;
//# is new standard for declaring the private class

type Coords = {
  latitude: number;
  longitude: number;
};

type Position = {
  coords: Coords;
};

class App {
  #val: boolean | string = false;
  #count: number = 1;
  constructor() {
    navigator.geolocation.getCurrentPosition(
      this.#success.bind(this),
      this.#reject
    );
    setTimeout(() => this.fetchWeather(), 500); //I did this because when I did this immediattley it would fire off wrong region
    this.#search();
  }

  async fetchWeather() {
    try {
      const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${
        this.#val
      }&days=7`;
      //chnage this 1 to seven when I finish the app

      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      console.log(this.#count);
      this.#displayData(
        result.location.name,
        result.location.region,
        result.current.temp_c,
        result.current.condition.icon
      );
      this.#displayWeatherInfo(
        result.current.feelslike_c,
        result.current.wind_kph,
        result.current.humidity,
        result.current.uv
      );
      this.#days(
        Math.round(result.forecast.forecastday[this.#count].day.maxtemp_c),
        result.forecast.forecastday[this.#count].day.condition.icon
      );
      this.#hourly(result.forecast.forecastday[0].hour);
    } catch (error) {
      console.error(error);
      alert("This locaton doesn't exist");
    }
  }

  #search() {
    const getInfo = () => {
      this.#val = input.value;
      console.log(this.#val);
      this.fetchWeather();
    };
    searchSvg.addEventListener("click", getInfo);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        getInfo();
      }
    });
  }

  #success(pos: Position) {
    console.log(pos);
    this.#val = `${pos.coords.latitude}, ${pos.coords.longitude}`;
  }

  #reject(err: any) {
    alert(
      "Please refresh and enable your location if you want to see your city forecast! However if you don't want to enable this then just type your city"
    );
    console.log(err);
  }

  #displayData(city: string, region: string, weather: string, image: string) {
    mainInfo.innerHTML = `   <article>
            <div>
              <h1>${city}</h1>
              <h3>${region}</h3>
              <h1>${weather}°C</h1>
            </div>
            <img src="${image}" alt="aa" class="weather-img" />
          </article>`;
  }

  #displayWeatherInfo(
    temp: string,
    wind: string,
    humidity: string,
    uv: string
  ) {
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
  }

  #days(temp: number, icon: string) {
    let day = "";
    if (this.#count === 0) day = "Today";
    else if (this.#count === 1) day = "Tommorow";
    else day = "2 days";

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
    const nextBtn = document.querySelector(".next") as SVGElement;

    nextBtn.addEventListener("click", () => {
      this.#count++;
      // console.log(this.#count)
      this.#count === 3 ? (this.#count = 0) : "";
      console.log(this.#count);
      this.fetchWeather();
    });

    const previousBtn = document.querySelector(".prev") as SVGElement;
    previousBtn.addEventListener("click", () => {
      this.#count--;
      this.#count === -1 ? (this.#count = 2) : "";
      console.log(this.#count);
      this.fetchWeather();
    });
  }
  #hourly(arr: any) {
    const data = arr
      .map((items: any) => {
        return `
        <div class="time-container">
              <h3><img src=${
                items.condition.icon
              } alt="hourly condition img" /></h3>
              <h3>${Math.round(items.temp_c)}°C</h3>
              <h3>${items.time.slice(-5)}h</h3>
            </div>
          `;
      })
      .flat()
      .join("");
    forecast.innerHTML = ` <h1>Hourly forecast</h1>` + data;
  }
}

const appVar = new App();
