"use strict";

// ELEMENTS
const header = document.querySelector("header");

const toggleMenuBtn = document.querySelector("#toggle-menu-button");

const yearEl = document.querySelector("#year");

// FUNCTIONS

// Update the current year in the footer every new year
yearEl.textContent = new Date().getFullYear();

// EVENTS

// Toggle navigation on mobile screen
toggleMenuBtn.addEventListener("click", function () {
  header.classList.toggle("active");
});
