"use strict";

// ELEMENTS
const header = document.querySelector("header");

const toggleMenuBtn = document.querySelector("#toggle-menu-button");

const yearEl = document.querySelector("#year");

const tabsContainer = document.querySelector("#tabs");

const testimonialSlider = document.querySelector("#testimonial-slider");
const testimonials = document.querySelectorAll(".testimonial");

const arrs = document.querySelectorAll(".arr");
const slideDots = document.querySelector("#slide-dots");

// FUNCTIONS

// Update the current year in the footer every new year
yearEl.textContent = new Date().getFullYear();

// Slide the slider
const startSlidingHorizontally = (
  slider,
  sliderItemWidth,
  sliderGap,
  landmark = 0
) => {
  slider.style.transform = `translateX(-${
    (sliderItemWidth + sliderGap) * landmark
  }px)`;
};

function startSliding(slideBtn, slideLeft, slideRight) {
  const pressedSlideBtn = btn =>
    typeof slideBtn !== "string"
      ? slideBtn.classList.contains(btn)
      : slideBtn === btn;

  if (pressedSlideBtn(slideRight)) {
    sliderCounter++;

    if (sliderCounter === testimonials.length) sliderCounter = 0;
  } else if (pressedSlideBtn(slideLeft)) {
    sliderCounter--;

    if (sliderCounter < 0) sliderCounter = testimonials.length - 1;
  }

  startSlidingHorizontally(
    testimonialSlider,
    testimonialWidth,
    testimonialGap,
    sliderCounter
  );

  slideDots
    .querySelectorAll("button.slide-dot")
    .forEach(function (slideDot, slideDotIndex) {
      slideDot.classList.remove("active-slide-dot");

      slideDotIndex === sliderCounter &&
        slideDot.classList.add("active-slide-dot");
    });
}

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

// Sliding functionality
const testimonialWidth = document
  .querySelector(".testimonial")
  .getBoundingClientRect().width;

const testimonialGap = parseFloat(
  window
    .getComputedStyle(document.querySelector(".testimonial-gap"))
    .getPropertyValue("gap")
);

let sliderCounter = 0;

arrs.forEach(arr =>
  arr.addEventListener("click", () =>
    startSliding(arr, "arr-left", "arr-right")
  )
);

slideDots.addEventListener("click", function (e) {
  e.preventDefault();

  const slideDot = e.target.closest("button.slide-dot");

  if (!slideDot) {
    return;
  } else {
    const slideDotIndex = Number(slideDot.dataset.slide);

    slideDots
      .querySelectorAll("button.slide-dot")
      .forEach(slideDot => slideDot.classList.remove("active-slide-dot"));

    slideDot.classList.add("active-slide-dot");

    startSlidingHorizontally(
      testimonialSlider,
      testimonialWidth,
      testimonialGap,
      slideDotIndex
    );

    sliderCounter = slideDotIndex;
  }
});

window.addEventListener("keyup", function (e) {
  e.preventDefault();

  (e.key === "ArrowLeft" || e.key === "ArrowRight") &&
    startSliding(e.key, "ArrowLeft", "ArrowRight");
});
