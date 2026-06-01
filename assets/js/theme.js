
/* Change Theme */
const themeButton = document.getElementById("change-theme");

addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);  
  if (savedTheme === "dark") {
    themeButton.querySelector("img").setAttribute("src", "./assets/images/icon-sun.svg");
    themeButton.querySelector("img").setAttribute("alt", "Switch to light mode");
  } else {
    themeButton.querySelector("img").setAttribute("src", "./assets/images/icon-moon.svg");
    themeButton.querySelector("img").setAttribute("alt", "Switch to dark mode");
  }
});

themeButton.addEventListener("click", () => {
  const htmlElement = document.documentElement;
  if (htmlElement.getAttribute("data-theme") === "dark") {
    localStorage.setItem("theme", "light");
    htmlElement.setAttribute("data-theme", "light");
    themeButton.querySelector("img").setAttribute("src", "./assets/images/icon-moon.svg");
    themeButton.querySelector("img").setAttribute("alt", "Switch to dark mode");
  } else {
    localStorage.setItem("theme", "dark");
    htmlElement.setAttribute("data-theme", "dark");
    themeButton.querySelector("img").setAttribute("src", "./assets/images/icon-sun.svg");
    themeButton.querySelector("img").setAttribute("alt", "Switch to light mode");
  }


});
/* Change Theme */