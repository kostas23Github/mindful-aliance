const hamburgerBtn = document.querySelector("div.menu-toggle-btn");
const menuBox = document.querySelector("div.menu-box");
const ul = document.querySelector("ul.main-menu");
const closeBtn = document.querySelector("div.menu-close-btn");
const overlay = document.querySelector("div.overlay");
const menuBoxContainer = document.querySelector("div.menu-box-container");
const nav = document.querySelector("nav");
const ulItems = Array.from(ul.children).slice(0, -1);

// Add to every list item an index & a click/hover listener that shows/hides a dropdown/submenu menu.
ulItems.forEach((item, index) => {
  item.setAttribute("index", index);

  item.addEventListener("mouseover", (e) => {
    ulItems.forEach((elem, i) => {
      e.currentTarget.getAttribute("index") != i &&
        elem.classList.remove("show");
      e.currentTarget.getAttribute("index") == i &&
        elem.classList.toggle("show");
    });
  });
  item.addEventListener("mouseout", (e) => {
    ulItems.forEach((elem, i) => {
      elem.classList.remove("show");
    });
  });
});

hamburgerBtn.addEventListener("click", () => {
  menuBoxContainer.insertBefore(menuBox, menuBoxContainer.children[0]);
  ul.classList.add("mobile");
  overlay.classList.add("show");
  menuBoxContainer.classList.add("show");
  closeBtn.style.display = "block";
});

const closeMobileMenu = () => {
  nav.insertBefore(menuBox, nav.children[1]);
  ul.classList.remove("mobile");
  overlay.classList.remove("show");
  menuBoxContainer.classList.remove("show");
  closeBtn.style.display = "none";
};

closeBtn.addEventListener("click", closeMobileMenu);
overlay.addEventListener("click", closeMobileMenu);


let lastScrollTop = 0;

const setNavHeight = function () {
  let currentScrollTop = document.documentElement.scrollTop;
  if (currentScrollTop > lastScrollTop) {
    nav.style.maxHeight = "60px";
    nav.style.minHeight = "60px";
  } else {
    nav.style.minHeight = "90px";
    nav.style.maxHeight = "90px";
  }
  lastScrollTop = currentScrollTop
  if (lastScrollTop != 0) {
    nav.style.backgroundColor = 'white';
  } else {
    nav.style.backgroundColor = 'transparent';
  }
}

// Change size of navbar when user scrolls from top. The 2 functions(throttle, debounce) are used for optimization. To handle when the event handler is executed. The throttle sets an interval to the execution of the handler. Since it has a limitation to whether it will catch the user scrolling to top, the debounce func is used which executes only after a set period of time that the user has stopped scrolling(i.e. the event has finished). If the event is triggered many times, such as the scroll event, the delay timer restarts, hence stopping the execution of the handler.
// According to ChatGPT the lodash library handles these functionalities with less code.

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

window.addEventListener(
  "scroll",
  throttle(setNavHeight, 100)
); // Executes the function at most once every .5s.

function debounce(func, delay) {
  let debounceTimer;
  return function () {
    const args = arguments;
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

window.addEventListener(
  "scroll",
  debounce(setNavHeight, 100)
); // Executes the function 20ms after the user stops scrolling.