// IntersectionObserver API

// Here I should place all come-into-view animations.

// Select the element you want to observe
const readMoreText = document.querySelector(
  "section.readMore-section div.readMore-title-box"
);
const whyUsBox = document.querySelector("div.whyUs-box");
const qualitiesSection = document.querySelector(
  "section.teamQualities-section"
);

// A callback function to handle when the element comes into view
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // This variable must have a broader scope bc it depends on whether its section is visible(i.e. == entry.target)
      let intervalIdTeamQual;

      // Read More Section's entry animation
      if (entry.target.classList.contains("readMore-title-box")) {
        document.querySelector("div.readMore-title-box > p.huge-text").animate(
          [
            { transform: "translateY(-72px)", opacity: 0 },
            { transform: "translateY(0px)", opacity: 0.5 },
          ],
          { duration: 1000, easing: "ease-in" }
        );

        // Why Us Section's entry animation
      } else if (entry.target.classList.contains("whyUs-box")) {
        // Title's animation
        document.querySelector("div.whyUs-box > p.huge-text").animate(
          [
            { transform: "translateY(-80px)", opacity: 0 },
            { transform: "translateY(0px)", opacity: 0.5 },
          ],
          { duration: 1000, easing: "ease-in" }
        );

        // Accomplishment's animation
        const accomplismentArr = Array.from(
          document.querySelectorAll(
            "div.becauseList-container p.semi-huge-text"
          )
        );

        const finalNumbers = accomplismentArr.map((hugeText) =>
          parseInt(hugeText.textContent)
        );

        accomplismentArr.forEach((semiHugeText, i) => {
          // Initialize counter to 0
          let currentNumber = 0;
          let intervalTime = 900 / finalNumbers[i]; // Have the animation finish at roughly the same time.

          // Store interval id number and clear it when semi-huge-text numbers finish their animation
          const intervalIdWhyUs = setInterval(() => {
            // This callback increments p.semi-huge text's value at set periods of time.
            if (parseInt(currentNumber) >= finalNumbers[i]) {
              semiHugeText.textContent = finalNumbers[i] + "+"; // At the final iteration add + sign.
              clearInterval(intervalIdWhyUs);
            } else {
              currentNumber++; // Increment the number
              semiHugeText.textContent = currentNumber; // Update the text content of the <p> element
            }
          }, intervalTime);

          semiHugeText.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 1100,
            easing: "ease-in",
          });
        });
      }
    }
  });
};

// Initialize interval id variable which stores a value which can be cleared when element is out of view.
let intervalIdTeamQual;
const observerCallbackTeamQualities = (entries, observer) => {
  if (entries[0].isIntersecting) {
    // Start the interval if it hasn't been started yet(i.e. an id doesn't exist)
    if (!intervalIdTeamQual) {
      intervalIdTeamQual = setInterval(function () {
        // Checkes whether 4.5sec has passed from last click, if not waits another 5sec
        if (Date.now() - lastSlideChangeTimer > 4500) {
          // Create a new mouse event
          const event = new MouseEvent("click", {
            bubbles: true, // Whether the event bubbles up through the DOM
            cancelable: true, // Whether the event is cancelable
            view: window, // The window in which the event is being created
          });

          // Dispatch the event on the button
          document
            .querySelector("div.teamQualities-next-arrow")
            .dispatchEvent(event);
        }
      }, 5000); // Trigger the event every 5 seconds
    }
  } else if (intervalIdTeamQual) {
    // Clear the interval when the element is out of view
    clearInterval(intervalIdTeamQual);

    // Make id falsy so when section in view again, the if statement can start a new interval
    intervalIdTeamQual = false;
  }
};

// Create two instances of the IntersectionObserver API
const observer = new IntersectionObserver(observerCallback);
// This section needs a separate observer
const observerTeamQualities = new IntersectionObserver(
  observerCallbackTeamQualities
);

// Start observing the elements
observer.observe(readMoreText);
observer.observe(whyUsBox);
observerTeamQualities.observe(qualitiesSection);
