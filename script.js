document.addEventListener("DOMContentLoaded", () => {
    // console.log("DOM fully loaded and parsed");

s = 1000
m = 60*s
h = 60*m
let date = new Date();
let hour = document.getElementById('hour')
let minute = document.getElementById('minutes')
let second = document.getElementById('seconds')
const weatherButton = document.getElementById('weather-button');
const weatherContent = document.getElementById('weather-content');
weatherButton.addEventListener('click', () => {
    if (!weatherContent.classList.contains('visible')) {
        weatherContent.classList.add('visible'); // Add visible class to expand height
        weatherContent.classList.remove('opacity-0'); // Remove opacity-0 to fade in
        weatherContent.classList.add('opacity-100'); // Set opacity to 100
    } else {
        weatherContent.classList.remove('opacity-100'); // Fade out
        weatherContent.classList.add('opacity-0');
        setTimeout(() => {
            weatherContent.classList.remove('visible'); // Collapse height after fading out
        }, 500); // Match duration to fade out
    }
});


setInterval(() => {
    let d = new Date()
    hour_val = d.getHours()
    min_val = d.getMinutes()
    sec_val = d.getSeconds()
    zone = d.getHours() > 12 ? 'PM' : 'AM';

    current_date = document.getElementById('current-date')
    current_date.innerHTML = `${d.toDateString()}`
    value = document.getElementById('digital-clock')
    value.innerHTML = `${hour_val.toString().padStart(2, '0')}:${min_val.toString().padStart(2, '0')}:${sec_val.toString().padStart(2, '0')} ${zone}`
}, s);

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.innerText = document.body.classList.contains('dark') ? '☀️' : '🌙'; // Change icon based on theme
});

});