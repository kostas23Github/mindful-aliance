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
const carouselSlides = document.querySelector("ul.carousel-slides");

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

  carouselSlides.appendChild(li);
  return li;
});

// Get the elem containing ALL carousel items.
const carouselContainer = document.querySelector(".carousel-container");

const btnNext = document.querySelector(".teamQualities-next-arrow");
const btnPrev = document.querySelector(".teamQualities-prev-arrow");

const circlesContainer = document.querySelector("div.carousel-index-container");
const circlesContainer2 = document.querySelector(
  "div.customer-feedback-box > div.carousel-index-container"
);

// Get width of a slide elem.
const slideWidth = qualitiesArr[0].getBoundingClientRect().width;

// The number of slides
const lastIndex = qualitiesArr.length - 1;

// Get gap between slides.
const slidesGap = parseInt(window.getComputedStyle(carouselSlides).gap, 10);

// To get the total gap distance, multiply each gap with the number of slides
const slidesTotalGap = slidesGap * lastIndex;

// Get margin or padding between slides.
const carContPaddingRight = parseInt(
  window.getComputedStyle(carouselContainer).paddingRight,
  10
);
const carContPaddingLeft = parseInt(
  window.getComputedStyle(carouselContainer).paddingLeft,
  10
);

// Get width of the carousel parent container.
let carContWidth = carouselContainer.getBoundingClientRect().width;

// Compute the combined width of all slides + their gaps.
const slidesWidth = slideWidth * qualitiesArr.length + slidesTotalGap;

// Disable carousel when all items are visible.
if (carContWidth > slidesWidth) {
  btnNext.disabled = true;
  btnPrev.disabled = true;
}

// Get the leftmost position of the carousel parent container.
let carContLeftPos = carouselContainer.getBoundingClientRect().left;

btnNext.addEventListener("click", () => {
  // Get the rightmost position of the elem based on the viewport by adding to its left position its width value.
  let carContRightPos = carContLeftPos + carContWidth;

  // Get the rightmost position of the last arr elem(slide). This is needed to reset the carousel when the last slide comes into view & the forward btn is pressed.
  let lastSlideRightPos =
    qualitiesArr[lastIndex].getBoundingClientRect().left + slideWidth;

  // While last elem of the slides arr is more to the right of the carousel container keep pushing all slides to the left, else reset!
  // Or else if the last elem of the arr is not visible push slides to the left until it is. The value the carousel is pushed is the width of the slide + the gap margin.
  //   console.log(carContRightPos, lastSlideRightPos);

  // Add a buffer(100) if the user clicks too fast & the slide transition(600ms) isn't complete so the lastSlideRightPos is not yet in place.

  if (carContRightPos + 100 < lastSlideRightPos) {
    carouselSlides.style.transform += `translateX(-${
      slideWidth + slidesGap
    }px)`;
  } else {
    carouselSlides.style.transform = `translateX(0px)`;
  }

  //   Update last slide's most right position, for when the btn is clicked again.
  lastSlideRightPos =
    qualitiesArr[lastIndex].getBoundingClientRect().left + slideWidth + 10;
});

btnPrev.addEventListener("click", () => {
  
  // Update the leftmost position of the carousel parent container.
  carContLeftPos = carouselContainer.getBoundingClientRect().left;

  // Get the leftmost position of the first slide. This is needed to reset the carousel when the first elem comes into view & the previous btn is pressed.
  let firstSlideLeftPos = qualitiesArr[0].getBoundingClientRect().left;

  // While first elem of the slides arr is more to the left of the carousel container keep pushing right, else move all slides the width of the container + the right padding.

  if (carContLeftPos > firstSlideLeftPos) {

    carouselSlides.style.transform += `translateX(${slideWidth + slidesGap}px)`;

  } else {
    console.log(slidesWidth);

    // Move the carousel to the end of the slides. The total distance of the slides minus the one already in view.
    carouselSlides.style.transform = `translateX(${
      -slidesWidth + slideWidth
    }px)`;
    
  }

  //   Update last slide's most right position.
  firstSlideLeftPos = qualitiesArr[0].getBoundingClientRect().left;
});

let circlesQualities = [];

// Create carousel index circles.
const carouselCircles = (carouselSlides, parent) => {
  carouselSlides.forEach((slide, index) => {
    const circle = document.createElement("div");
    circle.classList.add("index-circle");
    circle.setAttribute("index", index);
    parent.appendChild(circle);
    circlesQualities.push(circle);
    // On load first slide is visible, hence the first circle.
    circlesQualities[0].classList.add('active');
    circle.addEventListener("click", (e) => circleMoveToSlide(e));
  });
};

const circleMoveToSlide = (e) => {
    // Reset active class for all circles.
    circlesQualities.forEach(circle => circle.classList.remove('active'));
    // To the circle clicked add active class.
    e.currentTarget.classList.add('active');
    // Reset carousel position.
    carouselSlides.style.transform = `translateX(0px)`;
    // Get the clicked circle's index value
    const targetIndex = parseInt(e.currentTarget.getAttribute('index'), 10);

    // Move carousel to this slide. For example the 3rd circle is clicked, so 2nd index multiplied by the slide's width plus the gaps btw them.
    carouselSlides.style.transform = `translateX(-${slideWidth * targetIndex + slidesGap * targetIndex}px)`;
    console.log(    carouselSlides.style.transform = `translateX(-${slideWidth * targetIndex + slidesGap * targetIndex}px)`)    
}

carouselCircles(qualitiesArr, circlesContainer);