// Menu
$(".menu-btn").click(function() {
    $('.fa-bars').toggleClass('active');
    $('.fa-times').toggleClass('active');
    $('.drop-menu').toggleClass('active');
});
// Scroll 
$(".hourly-weather").scroll(function() {
    var scroll = $(".hourly-weather").scrollTop();
    var scrollBottom = $(".hourly-weather").get(0).scrollHeight;
    var scrollBottom = (scrollBottom / 2) + 380;

    if (scroll <= 10) {
        $(".hourly-weather").removeClass("shadow-t-b").addClass("shadow-b");

    } else {
        $(".hourly-weather").removeClass("shadow-b").addClass("shadow-t-b");
    }
    if (scroll <= scrollBottom) {

        $(".hourly-weather").removeClass("shadow-t").addClass("shadow-t-b");

    } else {
        $(".hourly-weather").removeClass("shadow-t-b").addClass("shadow-t");

    }
});
$(".daily-weather").scroll(function() {
    var scroll = $(".daily-weather").scrollTop();
    var scrollBottom = $(".daily-weather").get(0).scrollHeight;
    var scrollBottom = (scrollBottom / 2) + 500;

    if (scroll <= 10) {
        $(".daily-weather").removeClass("shadow-t-b").addClass("shadow-b");

    } else {
        $(".daily-weather").removeClass("shadow-b").addClass("shadow-t-b");
    }
    if (scroll <= scrollBottom) {

        $(".daily-weather").removeClass("shadow-t").addClass("shadow-t-b");

    } else {
        $(".daily-weather").removeClass("shadow-t-b").addClass("shadow-t");

    }
});


// clock

setInterval(clock, 1000);

function clock() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    am_pm = (hour > 12) ? am_pm = 'PM' : am_pm = 'AM';
    hour = (hour > 12) ? hour = hour - 12 : hour;
    hour = (hour < 10) ? hour = '0' + hour : hour;
    min = (min < 10) ? min = '0' + min : min;
    sec = (sec < 10) ? sec = '0' + sec : sec;

    let output = document.getElementsByClassName('time')[0];
    output.innerHTML = hour + ':' + min + ':' + sec + ' ' + am_pm;
}

// // Get Lat and Long using Web location
getLocationsAllow();

function getLocationsAllow() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
let lat = '';
let long = '';

function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    renderData(lat, long);
}

// Get Lat and Long using Search Bar and get location using Position Stack API
document.getElementById('search').addEventListener('click', function(e) {
    e.preventDefault();
    let address = document.getElementById('address').value;
    if (!address) {
        alert('Please enter the address.')
    } else {
        let api_Key = '3d477d2dba42e574c0cee1efe3914180';
        fetch(`http://api.positionstack.com/v1/forward?access_key=${api_Key}&query=${address}&limit=1`)
            .then(response => response.json())
            .then(datas => {
                let latitude = datas.data[0].latitude;
                let longitude = datas.data[0].longitude;
                let label = datas.data[0].label;
                renderData(latitude, longitude, label);
            })
            .catch((error) => {
                if (error) {
                    alert('Address not found, please enter correct address');
                }

            });
    }

});


// Get Weather Data using OpenWeather API
function renderData(lat, long, label) {
    let apiKey = 'e2ae320f174b60bb26f8deb7e4bf06de';
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(weather => {
            // Current Weather
            // icon
            let iconId = weather.current.weather[0].id;
            let icon = weather.current.weather[0].icon;
            let currentIcon = document.getElementsByClassName('weather-icon')[0];
            if (iconId == '800' && icon == '01d') {
                currentIcon.innerHTML = `<i class="wi wi-day-sunny"></i>`;
            } else if (iconId == '800' && icon == '01n') {
                currentIcon.innerHTML = `<i class="wi wi-night-clear"></i>`;
            } else if (iconId == '801' && icon == '02d') {
                currentIcon.innerHTML = `<i class="wi wi-day-cloudy"></i>`;
            } else if (iconId == '801' && icon == '02n') {
                currentIcon.innerHTML = `<i class="wi wi-night-alt-cloudy"></i>`;
            } else if (iconId == '802' && icon == '03d') {
                currentIcon.innerHTML = `<i class="wi wi-day-cloudy-gusts"></i>`;
            } else if (iconId == '802' && icon == '03n') {
                currentIcon.innerHTML = `<i class="wi wi-night-alt-cloudy-gusts"></i>`;
            } else if (iconId == '803' && icon == '04d') {
                currentIcon.innerHTML = `<i class="wi wi-day-cloudy-windy"></i>`;
            } else if (iconId == '803' && icon == '04n') {
                currentIcon.innerHTML = `<i class="wi wi-night-alt-cloudy-windy"></i>`;
            } else if (iconId == '804' && icon == '04d') {
                currentIcon.innerHTML = `<i class="wi wi-day-fog"></i>`;
            } else if (iconId == '804' && icon == '04n') {
                currentIcon.innerHTML = `<i class="wi wi-night-fog"></i>`;
            } else if (icon == '50d' || icon == '50n') {
                currentIcon.innerHTML = `<i class="wi wi-dust"></i>`;
            } else if (icon == '09d') {
                currentIcon.innerHTML = `<i class="wi wi-day-showers"></i>`;
            } else if (icon == '09n') {
                currentIcon.innerHTML = `<i class="wi wi-night-alt-showers"></i>`;
            } else if (icon == '10d') {
                currentIcon.innerHTML = `<i class="wi wi-day-rain-mix"></i>`;
            } else if (icon == '10n') {
                currentIcon.innerHTML = `<i class="wi wi-night-alt-rain-mix"></i>`;
            } else if (icon == '11d') {
                currentIcon.innerHTML = `<i class="wi wi-day-thunderstorm"></i>`;
            } else if (icon == '11n') {
                currentIcon.innerHTML = `<i class="wi wi-night-alt-thunderstorm"></i>`;
            } else if (icon == '13d') {
                currentIcon.innerHTML = `<i class="wi wi-day-snow"></i>`;
            } else if (icon == '13n') {
                currentIcon.innerHTML = `<i class="wi wi-night-alt-snow"></i>`;
            }
            //celsius
            let cen = weather.current.temp;
            cen = Math.round(cen);
            //fahrenheit
            let feh = (cen * 1.8) + 32;
            feh = Math.round(feh);

            // Page Title Change
            pageTitle(cen, feh);

            //  Temperature
            document.getElementById('temp1').innerHTML = `<h1 id="c-temp">${cen} °C</h1><h1 id="f-temp" style="display:none;">${feh} °F</h1>`;

            // Weather Description
            document.getElementById('weatherDesc').innerHTML = `<span>${weather.current.weather[0].description}</span>`

            // Head title and icon
            var link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
            link.href = `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`;
            document.getElementsByTagName('title')[0].innerHTML = `${cen}°C / ${feh}°F - Weather App | Find Your Weather`;


            // feel like
            //celsius
            let flcen = weather.current.feels_like;
            flcen = Math.round(flcen);
            //fahrenheit
            let flfeh = (flcen * 1.8) + 32;
            flfeh = Math.round(flfeh);

            document.getElementById('feel-like').innerHTML = ` <h3  id="c-temp">${flcen} °C</h3><h3 id="f-temp" style="display:none;">${flfeh} °F</h3>`;

            // Humidity in to percentage
            let humidity = weather.current.dew_point;
            humidity = Math.round(humidity);
            document.getElementById('humidity').innerHTML = ` <h3>${humidity}%</h3>`;

            // Wind Speed
            let wind_speed = weather.current.wind_speed;
            document.getElementById('windspeed').innerHTML = `<h3  title="Meter/Sec">${ wind_speed } M/S</h3>`;

            // sunrise
            let sunrise_unix = weather.current.sunrise;
            let sunrise = moment.unix(sunrise_unix).format("hh:mmA");
            document.getElementById('sunrise').innerHTML = `<h3>${sunrise}</h3>`;

            // sunset
            let sunset_unix = weather.current.sunset;
            let sunset = moment.unix(sunset_unix).format("hh:mmA");
            document.getElementById('sunset').innerHTML = `<h3>${sunset}</h3>`;

            // Cloud 
            let cloud = weather.current.clouds;
            document.getElementById('cloud').innerHTML = `<h3>${cloud}%</h3>`;

            // 24 Hour Weather Data fetch
            let hourlyData = '';
            weather.hourly.slice(0, 24).map(data => {
                //time
                let time = moment.unix(data.dt).format("hh:mm A");
                //celsius
                let hcen = data.temp;
                hcen = Math.round(hcen);
                //fahrenheit
                let hfeh = (hcen * 1.8) + 32;
                hfeh = Math.round(hfeh);

                // icon
                let iconId = data.weather[0].id;
                let icon = data.weather[0].icon;
                let hourlyIcon = '';
                if (iconId == '800' && icon == '01d') {
                    hourlyIcon = `wi wi-day-sunny`;
                } else if (iconId == '800' && icon == '01n') {
                    hourlyIcon = `wi wi-night-clear`;
                } else if (iconId == '801' && icon == '02d') {
                    hourlyIcon = `wi wi-day-cloudy`;
                } else if (iconId == '801' && icon == '02n') {
                    hourlyIcon = `wi wi-night-alt-cloudy`;
                } else if (iconId == '802' && icon == '03d') {
                    hourlyIcon = `wi wi-day-cloudy-gusts`;
                } else if (iconId == '802' && icon == '03n') {
                    hourlyIcon = `wi wi-night-alt-cloudy-gusts`;
                } else if (iconId == '803' && icon == '04d') {
                    hourlyIcon = `wi wi-day-cloudy-windy`;
                } else if (iconId == '803' && icon == '04n') {
                    hourlyIcon = `wi wi-night-alt-cloudy-windy`;
                } else if (iconId == '804' && icon == '04d') {
                    hourlyIcon = `wi wi-day-fog`;
                } else if (iconId == '804' && icon == '04n') {
                    hourlyIcon = `wi wi-night-fog`;
                } else if (icon == '50d' || icon == '50n') {
                    hourlyIcon = `wi wi-dust`;
                } else if (icon == '09d') {
                    hourlyIcon = `wi wi-day-showers`;
                } else if (icon == '09n') {
                    hourlyIcon = `wi wi-night-alt-showers`;
                } else if (icon == '10d') {
                    hourlyIcon = `wi wi-day-rain-mix`;
                } else if (icon == '10n') {
                    hourlyIcon = `wi wi-night-alt-rain-mix`;
                } else if (icon == '11d') {
                    hourlyIcon = `wi wi-day-thunderstorm`;
                } else if (icon == '11n') {
                    hourlyIcon = `wi wi-night-alt-thunderstorm`;
                } else if (icon == '13d') {
                    hourlyIcon = `wi wi-day-snow`;
                } else if (icon == '13n') {
                    hourlyIcon = `wi wi-night-alt-snow`;
                }

                hourlyData += `
                     <div class="card">
                            <div class="icon">
                                <i class="${hourlyIcon}"></i>
                            </div>
                            <div class="data">
                                <h1 id="c-temp">${hcen} °C</h1>
                                <h1 id="f-temp" style="display: none;">${hfeh} °F</h1>
                                <span>${time}</span>
                            </div>
                        </div>

                `;
            });
            document.getElementsByClassName('hourly-weather')[0].innerHTML = hourlyData;

            // 7 Day Weather Data Fetch
            let dailyData = '';
            weather.daily.slice(1, 8).map(data => {
                //date
                let date = moment.unix(data.dt).format("ddd - DD-MM-YYYY");
                //celsius
                let dcen = data.temp.day;
                dcen = Math.round(dcen);
                //fahrenheit
                let dfeh = (dcen * 1.8) + 32;
                dfeh = Math.round(dfeh);
                // sunrise and sunset time
                let dsunrise = moment.unix(data.sunrise).format("hh:mm A");
                let dsunset = moment.unix(data.sunset).format("hh:mm A");

                // icon
                let iconId = data.weather[0].id;
                let icon = data.weather[0].icon;
                let dailyIcon = '';
                if (iconId == '800' && icon == '01d') {
                    dailyIcon = `wi wi-day-sunny`;
                } else if (iconId == '800' && icon == '01n') {
                    dailyIcon = `wi wi-night-clear`;
                } else if (iconId == '801' && icon == '02d') {
                    dailyIcon = `wi wi-day-cloudy`;
                } else if (iconId == '801' && icon == '02n') {
                    dailyIcon = `wi wi-night-alt-cloudy`;
                } else if (iconId == '802' && icon == '03d') {
                    dailyIcon = `wi wi-day-cloudy-gusts`;
                } else if (iconId == '802' && icon == '03n') {
                    dailyIcon = `wi wi-night-alt-cloudy-gusts`;
                } else if (iconId == '803' && icon == '04d') {
                    dailyIcon = `wi wi-day-cloudy-windy`;
                } else if (iconId == '803' && icon == '04n') {
                    dailyIcon = `wi wi-night-alt-cloudy-windy`;
                } else if (iconId == '804' && icon == '04d') {
                    dailyIcon = `wi wi-day-fog`;
                } else if (iconId == '804' && icon == '04n') {
                    dailyIcon = `wi wi-night-fog`;
                } else if (icon == '50d' || icon == '50n') {
                    dailyIcon = `wi wi-dust`;
                } else if (icon == '09d') {
                    dailyIcon = `wi wi-day-showers`;
                } else if (icon == '09n') {
                    dailyIcon = `wi wi-night-alt-showers`;
                } else if (icon == '10d') {
                    dailyIcon = `wi wi-day-rain-mix`;
                } else if (icon == '10n') {
                    dailyIcon = `wi wi-night-alt-rain-mix`;
                } else if (icon == '11d') {
                    dailyIcon = `wi wi-day-thunderstorm`;
                } else if (icon == '11n') {
                    dailyIcon = `wi wi-night-alt-thunderstorm`;
                } else if (icon == '13d') {
                    dailyIcon = `wi wi-day-snow`;
                } else if (icon == '13n') {
                    dailyIcon = `wi wi-night-alt-snow`;
                }

                dailyData += `
                     <div class="card">
                            <div class="row b-line">
                                <div class="col-50">
                                    <i class="${dailyIcon}"></i>
                                    <span>${data.weather[0].description}</span>
                                </div>
                                <div class="col-50">
                                    <h1>${dcen} °C</h1>
                                    <h1>${dfeh} °F</h1>
                                </div>
                            </div>
                            <div class="block">
                                <h4><i class="wi wi-sunrise"></i> Sunrise</h4>
                                <span>${dsunrise}</span>
                            </div>
                            <div class="block">
                                <h4><i class="wi wi-sunset"></i> Sunset</h4>
                                <span>${dsunset}</span>
                            </div>
                            <div class="block">
                                <h4><i class="fa fa-thermometer-1"></i> Min Temp.</h4>
                                <span>${data.temp.min} °C</span>
                            </div>
                            <div class="block">
                                <h4><i class="fa fa-thermometer"></i> MaxTemp.</h4>
                                <span>${data.temp.max} °C</span>
                            </div>
                            <div class="block">
                                <h4><i class="fa fa-calendar"></i> Date</h4>
                                <span>${date}</span>
                            </div>
                        </div>
                `;

            });
            document.getElementsByClassName('daily-weather')[0].innerHTML = dailyData;
        });

    if (label) {
        document.getElementById('addressLabel').innerHTML = `<h4><i class="fa fa-map-marker"></i> ${label}</h4>`;
    }



}

// Temperature Button
$(".c").on('click', function() {
    $('.c').addClass('active');
    $('.f').removeClass('active');
    $('*#c-temp').css("display", "block");
    $('*#f-temp').css("display", "none");
});
$(".f").on('click', function() {
    $('.f').addClass('active');
    $('.c').removeClass('active');
    $('*#c-temp').css("display", "none");
    $('*#f-temp').css("display", "block");
});


// Pages 'home', 'about us' & 'contact us'
function pageTitle(cen, feh) {
    $('#home').css("display", "block");
    $('#about').css("display", "none");
    $('#contact').css("display", "none");
    $('title').html(`${cen}°C / ${feh}°F - Weather App | Find Your Weather`);

    $("#homebtn").on('click', function() {
        $('#home').css("display", "block");
        $('#about').css("display", "none");
        $('#contact').css("display", "none");
        $('title').html(`${cen}°C / ${feh}°F - Weather App | Find Your Weather`);
    });
    $("#aboutbtn").on('click', function() {
        $('#home').css("display", "none");
        $('#about').css("display", "block");
        $('#contact').css("display", "none");
        $("title").html(`About US - Weather App | Find Your Weather`);
    });
    $("#contactbtn").on('click', function() {
        $('#home').css("display", "none");
        $('#about').css("display", "none");
        $('#contact').css("display", "block");
        $("title").html(`Contact Us - Weather App | Find Your Weather`);

    });
}