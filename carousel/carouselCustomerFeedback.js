let customersArr = Array.from(
  document.querySelectorAll("li.customer-statement-card")
);

customersArr = customersArr.map((customer, index) => {
  customer.setAttribute("index", index);
  return customer;
});

// Get the elem containing ALL carousel items.
const carouselContainerC = document.querySelector(
  ".customers-statement-carousel-container"
);

const carouselSlidesC = document.querySelector(
  "ul.customers-statement-carousel-slides"
);

const btnNextC = document.querySelector(".customers-next-arrow");
const btnPrevC = document.querySelector(".customers-prev-arrow");

const circlesContainerC = document.querySelector(
  ".customers-statement-index-container"
);

// This event handler set ul slides tag to that of its sibling title h2 tag, plus each slide's to 100% of its parent ul. It is executed on page load & on window resize.
const setCustomerSlideWidth = () => {
  if (window.innerWidth > 581) return;

  carouselSlidesC.style.width = window.getComputedStyle(
    document.querySelector(".customer-feedback-box > h2")
  ).width;
  customersArr.forEach((customer) => {
    customer.style.width = "100%";
    customer.style.height = "unset";
  });
};

window.onload = setCustomerSlideWidth();
window.addEventListener("resize", () => setCustomerSlideWidth());

// Get width of a slide elem.
const slideWidthC = customersArr[0].getBoundingClientRect().width;

// The number of slides
const lastIndexC = customersArr.length - 1;

// Get gap between slides.
const slidesGapC = parseInt(window.getComputedStyle(carouselSlidesC).gap, 10);

// To get the total gap distance, multiply each gap with the number of slides
const slidesTotalGapC = slidesGapC * lastIndexC;

// Get margin or padding between slides.
const carContPaddingRightC = parseInt(
  window.getComputedStyle(carouselContainerC).paddingRight,
  10
);
const carContPaddingLeftC = parseInt(
  window.getComputedStyle(carouselContainerC).paddingLeft,
  10
);

// Get width of the carousel parent container.
let carContWidthC = carouselContainerC.getBoundingClientRect().width;

// Compute the combined width of all slides + their gaps.
const slidesWidthC = slideWidthC * customersArr.length + slidesTotalGapC;

// Disable carousel when all items are visible.
if (carContWidthC > slidesWidthC) {
  btnNextC.disabled = true;
  btnPrevC.disabled = true;
}

// Get the leftmost position of the carousel parent container.
let carContLeftPosC = carouselContainerC.getBoundingClientRect().left;

// Get current time, to handle fast clicks.
let currentTimeC = Date.now();

btnNextC.addEventListener("click", () => {
  // 600ms is the translateX transition, so I need to stop clicks if the transition hasn't finished.
  if (Date.now() - currentTimeC < 600) return;

  // Update time for future clicks
  currentTimeC = Date.now();

  // Get the rightmost position of the elem based on the viewport by adding to its left position its width value.
  let carContRightPosC = carContLeftPosC + carContWidthC;

  // Get the rightmost position of the last arr elem(slide). This is needed to reset the carousel when the last slide comes into view & the forward btn is pressed.
  let lastSlideRightPosC =
    customersArr[lastIndexC].getBoundingClientRect().left + slideWidthC;

  // While last elem of the slides arr is more to the right of the carousel container keep pushing all slides to the left, else reset!
  // Or else if the last elem of the arr is not visible push slides to the left until it is. The value the carousel is pushed is the width of the slide + the gap margin.

  if (carContRightPosC < lastSlideRightPosC) {
    carouselSlidesC.style.transform += `translateX(-${
      slideWidthC + slidesGapC
    }px)`;
  } else {
    carouselSlidesC.style.transform = `translateX(0px)`;
  }

  //   Update last slide's most right position, for when the btn is clicked again.
  lastSlideRightPosC =
    customersArr[lastIndexC].getBoundingClientRect().left + slideWidthC + 10;

  // Move current circle one right.
  // Get index value of current circle.
  const currentCircleIndexC = circlesCustomers.findIndex((circle) =>
    circle.classList.contains("active")
  );
  // Reset active status of all circles.
  circlesCustomers[currentCircleIndexC].classList.remove("active");

  if (currentCircleIndexC < circlesCustomers.length - 1) {
    circlesCustomers[currentCircleIndexC + 1].classList.add("active");
  } else {
    // Edge case, go to the start.
    circlesCustomers[0].classList.add("active");
  }
});

btnPrevC.addEventListener("click", () => {
  // 600ms is the translateX transition, so I need to stop clicks if the transition hasn't finished.
  if (Date.now() - currentTimeC < 600) return;

  // Update time for future clicks
  currentTimeC = Date.now();

  // Update the leftmost position of the carousel parent container.
  carContLeftPosC = carouselContainerC.getBoundingClientRect().left;

  // Get the leftmost position of the first slide. This is needed to reset the carousel when the first elem comes into view & the previous btn is pressed.
  let firstSlideLeftPosC = customersArr[0].getBoundingClientRect().left;

  // While first elem of the slides arr is more to the left of the carousel container keep pushing right, else move all slides the width of the container + the right padding.

  if (carContLeftPosC > firstSlideLeftPosC) {
    carouselSlidesC.style.transform += `translateX(${
      slideWidthC + slidesGapC
    }px)`;
  } else {
    // Move the carousel to the end of the slides. The total distance of the slides minus the one already in view.
    carouselSlidesC.style.transform = `translateX(${
      -slidesWidthC + slideWidthC
    }px)`;
  }

  //   Update last slide's most right position.
  firstSlideLeftPosC = customersArr[0].getBoundingClientRect().left;

  // Move current circle one left.
  // Get index value of current circle.
  const currentCircleIndexC = circlesCustomers.findIndex((circle) =>
    circle.classList.contains("active")
  );
  // Reset active status of all circles.
  circlesCustomers[currentCircleIndexC].classList.remove("active");

  if (currentCircleIndexC > 0) {
    circlesCustomers[currentCircleIndexC - 1].classList.add("active");
  } else {
    // Edge case, go to the end.
    circlesCustomers[circlesCustomers.length - 1].classList.add("active");
  }
});

let circlesCustomers = [];

// Create carousel index circles.
const carouselCircles = (carouselSlides, parent) => {
  carouselSlides.forEach((slide, index) => {
    const circle = document.createElement("div");
    circle.classList.add("index-circle");
    circle.setAttribute("index", index);
    parent.appendChild(circle);
    circlesCustomers.push(circle);
    // On load first slide is visible, hence the first circle.
    circlesCustomers[0].classList.add("active");
    circle.addEventListener("click", (e) => circleMoveToSlide(e));
  });
};

const circleMoveToSlide = (e) => {
  // Reset active class for all circles.
  circlesCustomers.forEach((circle) => circle.classList.remove("active"));
  // To the circle clicked add active class.
  e.currentTarget.classList.add("active");
  // Reset carousel position.
  carouselSlidesC.style.transform = `translateX(0px)`;
  // Get the clicked circle's index value
  const targetIndexC = parseInt(e.currentTarget.getAttribute("index"), 10);

  // Move carousel to this slide. For example the 3rd circle is clicked, so 2nd index multiplied by the slide's width plus the gaps btw them.
  carouselSlidesC.style.transform = `translateX(-${
    slideWidthC * targetIndexC + slidesGapC * targetIndexC
  }px)`;
};

carouselCircles(customersArr, circlesContainerC);
