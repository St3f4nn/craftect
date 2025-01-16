"use strict";

// Elements
const header = document.querySelector("header");

const toggleMenuBtn = document.querySelector("#toggle-menu-button");

// Events
toggleMenuBtn.addEventListener("click", function () {
  header.classList.toggle("active");
});
