"use strict";

// ELEMENTS
const header = document.querySelector(`header`);

const toggleMenuBtn = document.querySelector("#toggle-menu-button");

const yearEl = document.querySelector("#year");

const tabsContainer = document.querySelector("#tabs");

const testimonialSlider = document.querySelector("#testimonial-slider");
const testimonials = document.querySelectorAll(".testimonial");

const arrs = document.querySelectorAll(".arr");
const slideDots = document.querySelector("#slide-dots");

const requiredFields = [
  ...document.querySelectorAll("#contact-form [required]"),
];
const formSubmitBtn = document.querySelector(
  "#contact-form button[type='submit']"
);

const notePopups = document.querySelector("#note-popups");

const emptyFieldsNote = document.querySelector("#empty-fields-note");
const incorrectEmailNote = document.querySelector("#incorrect-email-note");
const submissionSuccessNote = document.querySelector(
  "#submission-success-note"
);

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

// Get the email field
const emailField = requiredFields.filter(field => field.type === "email")[0];

// Display note
function displayNote(note) {
  note.classList.remove("hidden");
  note.classList.add("flex");
}

// Hide note
function hideNote(note) {
  note.classList.add("hidden");
  note.classList.remove("flex");
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

// Form validation
formSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (requiredFields.some(field => !field.value)) {
    hideNote(incorrectEmailNote);
    hideNote(submissionSuccessNote);

    displayNote(emptyFieldsNote);

    requiredFields.forEach(function (field) {
      if (!field.value) {
        field.classList.add("empty-field");
      } else {
        field.classList.remove("empty-field");

        if (
          field.type === "email" &&
          !field.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
        ) {
          field.classList.toggle("empty-field");

          displayNote(incorrectEmailNote);
        }
      }
    });
  } else {
    hideNote(emptyFieldsNote);
    hideNote(submissionSuccessNote);

    requiredFields.forEach(field => field.classList.remove("empty-field"));

    if (
      !emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
    ) {
      emailField.classList.toggle("empty-field");

      displayNote(incorrectEmailNote);

      return;
    }

    hideNote(incorrectEmailNote);

    displayNote(submissionSuccessNote);

    document.querySelector("#contact-form").reset();
  }
});

notePopups.addEventListener("click", function (e) {
  e.preventDefault();

  const closeNoteBtn = e.target.closest(".close-note-btn");

  if (closeNoteBtn) hideNote(closeNoteBtn.parentElement);
});

requiredFields.forEach(field =>
  field.addEventListener("keyup", () => field.classList.remove("empty-field"))
);

// "smooth scrolling" effect
document.querySelector("body").addEventListener("click", function (e) {
  const link = e.target.closest("a");

  if (
    link &&
    link.hasAttribute("href") &&
    link.getAttribute("href").startsWith("#") &&
    link.getAttribute("target") !== "_blank"
  ) {
    e.preventDefault();

    header.classList.remove("active");

    if (!link.getAttribute("href").endsWith("#"))
      header.classList.add("sticky-nav");

    window.scrollTo({
      left: link.getAttribute("href").endsWith("#")
        ? 0
        : document
            .querySelector(link.getAttribute("href"))
            .getBoundingClientRect().left + window.scrollX,
      top: link.getAttribute("href").endsWith("#")
        ? 0
        : document
            .querySelector(link.getAttribute("href"))
            .getBoundingClientRect().top +
          window.scrollY -
          header.getBoundingClientRect().height,
      behavior: "smooth",
    });
  }
});

// Sticky navigation functionality
const heroSectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        header.classList.add("sticky-nav");
      } else {
        header.classList.remove("sticky-nav");
      }
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${
      header.getBoundingClientRect().height +
      document.querySelector("#logos").getBoundingClientRect().height
    }px`,
  }
);

heroSectionObserver.observe(document.querySelector("#hero"));

window.addEventListener("scroll", function () {
  if (this.scrollY > header.getBoundingClientRect().height) {
    header.classList.add("-translate-y-full");
  } else {
    header.classList.remove("-translate-y-full");
  }
});

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("intersected");
      } else {
        entry.target.classList.remove("intersected");
      }
    });
  },
  {
    root: null,
    threshold: 0.2,
  }
);

document
  .querySelectorAll("section")
  .forEach(section => sectionObserver.observe(section));
