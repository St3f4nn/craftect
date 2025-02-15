"use strict";

// ELEMENTS
const header = document.querySelector("header");

const toggleMenuBtn = document.querySelector("#toggle-menu-button");

const yearEl = document.querySelector("#year");

const tabsContainer = document.querySelector("#tabs");

// FUNCTIONS

// Update the current year in the footer every new year
yearEl.textContent = new Date().getFullYear();

// EVENTS

// Toggle navigation on mobile screen
toggleMenuBtn.addEventListener("click", () =>
  header.classList.toggle("active")
);

// Toggle tab contents
tabsContainer.addEventListener("click", function (e) {
  const tab = e.target.closest("button");

  if (!tab) {
    return;
  } else {
    tabsContainer
      .querySelectorAll("button")
      .forEach(tabBtn => tabBtn.classList.remove("active-tab"));

    document
      .querySelector("#services")
      .querySelectorAll(".service")
      .forEach(service => service.classList.remove("active-service"));

    tab.classList.add("active-tab");
    document
      .querySelector(`#service-${tab.dataset.tab}`)
      .classList.add("active-service");
  }
});
