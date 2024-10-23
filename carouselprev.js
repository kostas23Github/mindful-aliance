// DELETE
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

const list = document.querySelector("ul.carousel-slides-container");

// Create each slide
const htmlSlides = slides.map((slide, index) => {
  let li = document.createElement("li");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");

  li.append(h3, p);
  li.setAttribute("index", index);
  li.classList.add("carousel-slide", "teamQuality-content-container");
  h3.innerHTML = slide.header.icon + slide.header.title;
  p.textContent = slide.text;

  return li;
});

const circlesContainer = document.querySelector("div.carousel-index-container");

const circlesHandler = (e, array) => {
  let targetIndex = e.target.getAttribute("index");

  Array.from(array.children).forEach((circle, i) => {
    targetIndex == i
      ? circle.classList.add("active")
      : circle.classList.remove("active");
  });

  htmlSlides.forEach((slide, i) => {
    if (targetIndex == i) {
      slide.style.opacity = 1;
    } else {
      // Hide slide - All slides are stacked on top of each other.
      slide.style.opacity = 0;
    }
  });
};

// For smaller screens arrows are hidden, so navigate only with circles.
htmlSlides.forEach((slide, index) => {
  let circle = document.createElement("div");
  circle.classList.add("index-circle");
  circle.setAttribute("index", index);
  circlesContainer.appendChild(circle);

  circle.addEventListener("click", (e) => circlesHandler(e, circlesContainer));
});

// Populate ul list.
// htmlSlides = <li>
htmlSlides.forEach((slide) => {
  list.appendChild(slide);
});

// Based on counter variable, displays the right li item.
let counter = 0;
const displaySlide = function (counter) {
  // Makes visible the slide which corresponds to the counter.

  // Iterate through the array of li items.
  htmlSlides.forEach((slide, i) => {
    // Find the right item.
    if (slide.getAttribute("index") == counter) {
      // All items are there but opacity = 0.
      slide.style.opacity = 1;
    } else {
      slide.style.opacity = 0;
    }

    let condition = circlesContainer.children[i].getAttribute("index") == counter;
    if (condition) { 
      circlesContainer.children[i].classList.add('active');
    } else {
      circlesContainer.children[i].classList.remove('active');
    }
  });
};

displaySlide(counter);

// The counter variable initialy is 0, when this function is called again the counter keeps its last value. If I 'd placed it as parameter it would reset to 0.
const nextSlide = function (direction) {
  if (direction == "prev") {
    // If backward arrow is pressed.
    if (counter == 0) {
      // Checks if it is at the start.
      counter = htmlSlides.length - 1; // Update to the end.

      // Add animation objects.
      htmlSlides[0].animate(oovToLeft, outDuration); // The one leaving the view.
      htmlSlides[counter].animate(invToLeft, inDuration); // The current, entering.
    } else {
      counter--; // Decrement value, since going backwards.

      htmlSlides[counter + 1].animate(oovToLeft, outDuration);
      htmlSlides[counter].animate(invToLeft, inDuration);
    }
  } else if (direction == "next") {
    if (counter == htmlSlides.length - 1) {
      counter = 0;

      htmlSlides[htmlSlides.length - 1].animate(oovToRight, outDuration);

      htmlSlides[counter].animate(invToRight, inDuration);
    } else {
      counter++;

      htmlSlides[counter - 1].animate(oovToRight, outDuration);
      htmlSlides[counter].animate(invToRight, inDuration);
    }
  }
  displaySlide(counter);
};

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

// Without the callback the handler is called immediately.
document
  .querySelector(".carousel-prev-arrow")
  .addEventListener("click", () => nextSlide("prev"));
document
  .querySelector(".carousel-next-arrow")
  .addEventListener("click", () => nextSlide("next"));
