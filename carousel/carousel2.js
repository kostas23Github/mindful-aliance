// Content
const slideContent = [
  {
    header: {
      icon: "<i class='fa-solid fa-people-group'></i>",
      title: "Experienced team with deep domain insight",
    },
    text: "Our founder's international experience at top law firms, government regulators, and corporations, coupled with our team's software development and delivery experience. We fully understand the legal sector's business model and operational challenges and ensure our solutions are relevant and strategically effective.",
  },
  {
    header: {
      icon: "<i class='fa-regular fa-star'></i>",
      title: "Unparalleled Expertise",
    },
    text: "We offer a unique blend of deep legal knowledge and technical proficiency, positioning ourselves as experts in improving information flow and streamlining processes in your firm.",
  },
  {
    header: {
      icon: "<i class='fa-regular fa-lightbulb'></i>",
      title: "Comprehensive Solution Provider",
    },
    text: "Not only can we expertly analyze challenges, design bespoke solutions, resolve data issues, and develop specialized software for your firm, but our end-to-end services also ensure faster development times and lower total costs for a smooth, efficient, and cost-effective transformation.",
  },
  {
    header: {
      icon: "<i class='fa-solid fa-robot'></i>",
      title: "Al Mastery",
    },
    text: "We leverage cutting-edge Al technology to revolutionize your knowledge management and client services efforts to make your firm more efficient, innovative, and responsive to your client's needs.",
  },
  {
    header: {
      icon: "<i class='fa-solid fa-chart-line'></i>",
      title: "Tangible Results",
    },
    text: "Focusing on delivering real-world returns, we improve operational efficiency, strengthen client relationships, and help carve out a competitive edge for your firm.",
  },
  {
    header: {
      icon: "<i class='fa-solid fa-brain'></i>",
      title: "Ontology of Legal Services",
    },
    text: "Not only can we expertly analyze challenges, design bespoke solutions, resolve data issues, and develop specialized software for your firm, but our end-to-end services also ensure faster development times and lower total costs for a smooth, efficient, and cost-effective transformation.",
  },
];

// Get/Create content from HTML file.
const carouselSlidesT = document.querySelector("ul.teamQualities-carousel-slides");

// Add content to each slide
const qualitiesArr = slideContent.map((slide, index) => {
  let li = document.createElement("li");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");

  li.append(h3, p);
  li.setAttribute("index", index);
  li.classList.add("slide", "teamQuality-content-container");
  h3.innerHTML = slide.header.icon + slide.header.title;
  p.textContent = slide.text;

  carouselSlidesT.appendChild(li);
  return li;
});

// Get the elem containing ALL carousel items.
const carouselContainerT = document.querySelector(".teamQualities-carousel-container");

const btnNextT = document.querySelector(".teamQualities-next-arrow");
const btnPrevT = document.querySelector(".teamQualities-prev-arrow");

const circlesContainerT = document.querySelector(".teamQualities-index-container");

// Get width of a slide elem.
const slideWidthT = qualitiesArr[0].getBoundingClientRect().width;

// The number of slides
const lastIndexT = qualitiesArr.length - 1;

// Get gap between slides.
const slidesGapT = parseInt(window.getComputedStyle(carouselSlidesT).gap, 10);

// To get the total gap distance, multiply each gap with the number of slides
const slidesTotalGapT = slidesGapT * lastIndexT;

// Get margin or padding between slides.
const carContPaddingRightT = parseInt(
  window.getComputedStyle(carouselContainerT).paddingRight,
  10
);
const carContPaddingLeftT = parseInt(
  window.getComputedStyle(carouselContainerT).paddingLeft,
  10
);

// Get width of the carousel parent container.
let carContWidthT = carouselContainerT.getBoundingClientRect().width;

// Compute the combined width of all slides + their gaps.
const slidesWidthT = slideWidthT * qualitiesArr.length + slidesTotalGapT;

// Disable carousel when all items are visible.
if (carContWidthT > slidesWidthT) {
  btnNextT.disabled = true;
  btnPrevT.disabled = true;
}

// Get the leftmost position of the carousel parent container.
let carContLeftPosT = carouselContainerT.getBoundingClientRect().left;

// Get current time, to handle fast clicks.
let currentTimeT = Date.now();

btnNextT.addEventListener("click", () => {
  // 600ms is the translateX transition, so I need to stop clicks if the transition hasn't finished.
  if (Date.now() - currentTimeT < 600) return;

  // Update time for future clicks
  currentTimeT = Date.now();

  // Get the rightmost position of the elem based on the viewport by adding to its left position its width value.
  let carContRightPosT = carContLeftPosT + carContWidthT;

  // Get the rightmost position of the last arr elem(slide). This is needed to reset the carousel when the last slide comes into view & the forward btn is pressed.
  let lastSlideRightPosT =
    qualitiesArr[lastIndexT].getBoundingClientRect().left + slideWidthT;

  // While last elem of the slides arr is more to the right of the carousel container keep pushing all slides to the left, else reset!
  // Or else if the last elem of the arr is not visible push slides to the left until it is. The value the carousel is pushed is the width of the slide + the gap margin.

  // Add a buffer(100) if the user clicks too fast & the slide transition(600ms) isn't complete so the lastSlideRightPos is not yet in place.

  if (carContRightPosT < lastSlideRightPosT) {
    carouselSlidesT.style.transform += `translateX(-${
      slideWidthT + slidesGapT
    }px)`;
  } else {
    carouselSlidesT.style.transform = `translateX(0px)`;
  }

  //   Update last slide's most right position, for when the btn is clicked again.
  lastSlideRightPosT =
    qualitiesArr[lastIndexT].getBoundingClientRect().left + slideWidthT + 10;

  // Move current circle one right.
  // Get index value of current circle.
  const currentCircleIndexT = circlesQualities.findIndex((circle) =>
    circle.classList.contains("active")
  );
  // Reset active status of all circles.
  circlesQualities[currentCircleIndexT].classList.remove("active");

  if (currentCircleIndexT < circlesQualities.length - 1) {
    circlesQualities[currentCircleIndexT + 1].classList.add("active");
  } else {
    // Edge case, go to the start.
    circlesQualities[0].classList.add("active");
  }
});

btnPrevT.addEventListener("click", () => {

  // 600ms is the translateX transition, so I need to stop clicks if the transition hasn't finished.
  if (Date.now() - currentTimeT < 600) return;

  // Update time for future clicks
  currentTimeT = Date.now();

  // Update the leftmost position of the carousel parent container.
  carContLeftPosT = carouselContainerT.getBoundingClientRect().left;

  // Get the leftmost position of the first slide. This is needed to reset the carousel when the first elem comes into view & the previous btn is pressed.
  let firstSlideLeftPosT = qualitiesArr[0].getBoundingClientRect().left;

  // While first elem of the slides arr is more to the left of the carousel container keep pushing right, else move all slides the width of the container + the right padding.

  if (carContLeftPosT > firstSlideLeftPosT) {
    carouselSlidesT.style.transform += `translateX(${slideWidthT + slidesGapT}px)`;
  } else {
    // Move the carousel to the end of the slides. The total distance of the slides minus the one already in view.
    carouselSlidesT.style.transform = `translateX(${
      -slidesWidthT + slideWidthT
    }px)`;
  }

  //   Update last slide's most right position.
  firstSlideLeftPosT = qualitiesArr[0].getBoundingClientRect().left;

  // Move current circle one left.
  // Get index value of current circle.
  const currentCircleIndexT = circlesQualities.findIndex((circle) =>
    circle.classList.contains("active")
  );
  // Reset active status of all circles.
  circlesQualities[currentCircleIndexT].classList.remove("active");

  if (currentCircleIndexT > 0) {
    circlesQualities[currentCircleIndexT - 1].classList.add("active");
  } else {
    // Edge case, go to the end.
    circlesQualities[circlesQualities.length - 1].classList.add("active");
  }
});

let circlesQualities = [];

// Create carousel index circles.
const carouselCirclesT = (carouselSlides, parent) => {

  carouselSlides.forEach((slide, index) => {
    const circle = document.createElement("div");
    circle.classList.add("index-circle");
    circle.setAttribute("index", index);
    parent.appendChild(circle);
    circlesQualities.push(circle);
    // On load first slide is visible, hence the first circle.
    circlesQualities[0].classList.add("active");
    circle.addEventListener("click", (e) => circleMoveToSlide(e));
  });

};

const circleMoveToSlideT = (e) => {
  // Reset active class for all circles.
  circlesQualities.forEach((circle) => circle.classList.remove("active"));
  // To the circle clicked add active class.
  e.currentTarget.classList.add("active");
  // Reset carousel position.
  carouselSlidesT.style.transform = `translateX(0px)`;
  // Get the clicked circle's index value
  const targetIndexT = parseInt(e.currentTarget.getAttribute("index"), 10);

  // Move carousel to this slide. For example the 3rd circle is clicked, so 2nd index multiplied by the slide's width plus the gaps btw them.
  carouselSlidesT.style.transform = `translateX(-${
    slideWidthT * targetIndexT + slidesGapT * targetIndexT
  }px)`;
};

carouselCirclesT(qualitiesArr, circlesContainerT);
