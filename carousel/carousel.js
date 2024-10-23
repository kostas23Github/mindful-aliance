// Content
slides = [
  {
    header: {
      icon: "<i class='fa-solid fa-people-group'></i>",
      title: "1 Experienced team with deep domain insight",
    },
    text: "Our founder's international experience at top law firms, government regulators, and corporations, coupled with our team's software development and delivery experience. We fully understand the legal sector's business model and operational challenges and ensure our solutions are relevant and strategically effective.",
  },
  {
    header: {
      icon: "<i class='fa-regular fa-star'></i>",
      title: "2 Unparalleled Expertise",
    },
    text: "We offer a unique blend of deep legal knowledge and technical proficiency, positioning ourselves as experts in improving information flow and streamlining processes in your firm.",
  },
  {
    header: {
      icon: "<i class='fa-regular fa-lightbulb'></i>",
      title: "3 Comprehensive Solution Provider",
    },
    text: "Not only can we expertly analyze challenges, design bespoke solutions, resolve data issues, and develop specialized software for your firm, but our end-to-end services also ensure faster development times and lower total costs for a smooth, efficient, and cost-effective transformation.",
  },
  {
    header: {
      icon: "<i class='fa-solid fa-robot'></i>",
      title: "4 Al Mastery",
    },
    text: "We leverage cutting-edge Al technology to revolutionize your knowledge management and client services efforts to make your firm more efficient, innovative, and responsive to your client's needs.",
  },
  {
    header: {
      icon: "<i class='fa-solid fa-chart-line'></i>",
      title: "5 Tangible Results",
    },
    text: "Focusing on delivering real-world returns, we improve operational efficiency, strengthen client relationships, and help carve out a competitive edge for your firm.",
  },
  {
    header: {
      icon: "<i class='fa-solid fa-brain'></i>",
      title: "6 Ontology of Legal Services",
    },
    text: "Not only can we expertly analyze challenges, design bespoke solutions, resolve data issues, and develop specialized software for your firm, but our end-to-end services also ensure faster development times and lower total costs for a smooth, efficient, and cost-effective transformation.",
  },
];

// Get/Create content from HTML file.
const list = document.querySelector("ul.carousel-slides-container");

const circlesContainer = document.querySelector("div.carousel-index-container");
const circlesContainer2 = document.querySelector(
  "div.customer-feedback-box > div.carousel-index-container"
);

// Add content to each slide
const qualitiesArr = slides.map((slide, index) => {
  let li = document.createElement("li");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");

  li.append(h3, p);
  li.setAttribute("index", index);
  li.classList.add("carousel-slide", "teamQuality-content-container");
  h3.innerHTML = slide.header.icon + slide.header.title;
  p.textContent = slide.text;

  list.appendChild(li);
  return li;
});

// Populate ul list.
// qualitiesArr.forEach((slide) => {
//     list.appendChild(slide);
//   });
let customersArr = Array.from(
  document.querySelectorAll("li.customer-statement-card")
);

customersArr = customersArr.map((customer, index) => {
  customer.setAttribute("index", index);
  return customer;
});

let circlesQualities = [];
let circlesCustomers = [];

// Create carousel index circles.
const carouselCircles = (carouselSlides, parent, circleParent) => {
  carouselSlides.forEach((slide, index) => {
    const circle = document.createElement("div");
    circle.classList.add("index-circle");
    circle.setAttribute("index", index);
    parent.appendChild(circle);
    circleParent == 1 ? circlesQualities.push(circle) : circlesCustomers.push(circle);
    // Todo
    circle.addEventListener("click", (e) => circleMoveToSlide(e));
  });
};

carouselCircles(qualitiesArr, circlesContainer, 1);
carouselCircles(customersArr, circlesContainer2, 2);

// Reset carousel on page load.
window.addEventListener("load", () => {
  qualitiesArr[0].classList.add("active");
  customersArr[0].classList.add("active");
  circlesQualities[0].classList.add("active");
  circlesCustomers[0].classList.add("active");
});

const circleMoveToSlide = (e) => {
  // Add clicking to circle moves to appropriate slide.
  // Get the 1st element which indicates the specific carousel, in this case the grandparent of event.target.
  let teamQualitiesCarousel =
    e.currentTarget.parentElement.parentElement.classList.contains(
      "teamQualities-box"
    );
  let customerCarousel = e.currentTarget.parentElement.parentElement.classList.contains(
    "customer-feedback-box"
  );
  
  // Get e.target's index
  let currentIndex = e.currentTarget.getAttribute("index");

  // Display the slide with same index
  if (teamQualitiesCarousel) {
    qualitiesArr.forEach((slide) => slide.classList.remove("active"));
    qualitiesArr[currentIndex].classList.add("active");
    circlesQualities.forEach(circle => circle.classList.remove("active"));
    circlesQualities[currentIndex].classList.add("active");

  } else if (customerCarousel) {
    customersArr.forEach(slide => slide.classList.remove("active"));
    customersArr[currentIndex].classList.add("active");
    
    circlesCustomers.forEach(circle => circle.classList.remove("active"));
    circlesCustomers[currentIndex].classList.add("active");
  }
};

const nextSlide = (arr, circleArr, direction) => {
  let index = arr.findIndex((slide) => slide.classList.contains("active"));

  let endIndex = arr.length - 1;
  let prevIndex, nextIndex;

  if (direction == "prev") {
    if (index == 0) {
      // Marginal condition
      prevIndex = 0;
      nextIndex = endIndex;
    } else {
      // Normal condition
      prevIndex = index;
      nextIndex = index - 1;
    }
    arr[prevIndex].animate(oovToRight, outDuration);
    arr[nextIndex].animate(invToRight, inDuration);
  } else if (direction == "next") {
    if (index == endIndex) {
      // Marginal condition
      prevIndex = endIndex;
      nextIndex = 0;
    } else {
      // Normal condition
      prevIndex = index;
      nextIndex = index + 1;
    }
    arr[prevIndex].animate(oovToLeft, outDuration);
    arr[nextIndex].animate(invToLeft, inDuration);
  }
  arr[prevIndex].classList.remove("active");
  arr[nextIndex].classList.add("active");

  circleArr[prevIndex].classList.remove("active");
  circleArr[nextIndex].classList.add("active");
};

// ANIMATION LOGIC
// Out of view to right - The middle intervals perform a simple "bounce" effect.
const oovToRight = [
  { transform: "translateX(0%)", opacity: 1 },
  { opacity: 0, offset: 0.6 },
  { transform: "translateX(100%)" },
];

const invToRight = [
  { transform: "translateX(-100%)", opacity: 0 },
  { transform: "translateX(4%)", opacity: 0.9, offset: 0.8 },
  { transform: "translateX(8%)", opacity: 0.9, offset: 0.85 },
  { transform: "translateX(10%)", opacity: 0.9, offset: 0.9 },
  { transform: "translateX(0%)", opacity: 1 },
];

const invToLeft = [
  { transform: "translateX(100%)", opacity: 0 },
  { transform: "translateX(-4%)", opacity: 0.9, offset: 0.8 },
  { transform: "translateX(-8%)", opacity: 0.9, offset: 0.85 },
  { transform: "translateX(-10%)", opacity: 0.9, offset: 0.9 },
  { transform: "translateX(0%)", opacity: 1 },
];

const oovToLeft = [
  { transform: "translateX(0%)", opacity: 1 },
  { opacity: 0, offset: 0.6 },
  { transform: "translateX(-100%)" },
];

const outDuration = {
  duration: 1300,
  easing: "ease-in-out",
};
const inDuration = {
  duration: 1270,
  easing: "ease-in-out",
};

// Carousel arrows - Event targets
// The target is told which carousel(arr) to handle, its circles below and finally the direction(i.e. which button was pressed).
// Without the callback the handler is called immediately.
document
  .querySelector("div.teamQualities-prev-arrow")
  .addEventListener("click", (e) =>
    nextSlide(qualitiesArr, circlesQualities, "prev")
  );
document
  .querySelector("div.teamQualities-next-arrow")
  .addEventListener("click", (e) =>
    nextSlide(qualitiesArr, circlesQualities, "next")
  );
document
  .querySelector("div.customers-prev-arrow")
  .addEventListener("click", (e) =>
    nextSlide(customersArr, circlesCustomers, "prev")
  );
document
  .querySelector("div.customers-next-arrow")
  .addEventListener("click", (e) =>
    nextSlide(customersArr, circlesCustomers, "next")
  );
