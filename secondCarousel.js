// DELETE

let customersArr = Array.from(
  document.querySelectorAll("li.customer-statement-card")
);

customersArr = customersArr.map((customer, index) => {
  customer.setAttribute("index", index);
  return customer;
});

const circlesContainer2 = document.querySelector(
  "div.customer-feedback-box > div.carousel-index-container"
);

let circlesArr = [];

customersArr.forEach((customer, index) => {
  const div = document.createElement("div");
  div.classList.add("index-circle");
  div.setAttribute("index", index);
  circlesContainer2.appendChild(div);
  circlesArr.push(div);
});

// Reset carousel on page load.
window.addEventListener("load", () => {
    customersArr[0].classList.add("active");
    circlesArr[0].classList.add("active");
});

const nextSlide2 = function (direction) {
  let index = customersArr.findIndex((customer) =>
    customer.classList.contains("active")
  );
  let endIndex = customersArr.length - 1;
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
    customersArr[prevIndex].animate(oovToRight, outDuration);
  customersArr[nextIndex].animate(invToRight, inDuration);

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
      customersArr[prevIndex].animate(oovToLeft, outDuration);
      customersArr[nextIndex].animate(invToLeft, inDuration);
  }
  customersArr[prevIndex].classList.remove("active");
  customersArr[nextIndex].classList.add("active");

  circlesArr[prevIndex].classList.remove("active");
  circlesArr[nextIndex].classList.add("active");

};

document
  .querySelector(".carousel2-prev-arrow")
  .addEventListener("click", (e) => nextSlide2("prev"));
document
  .querySelector(".carousel2-next-arrow")
  .addEventListener("click", (e) => nextSlide2("next"));
