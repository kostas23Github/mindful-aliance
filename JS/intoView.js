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

// Creates a mouse

// A callback function to handle when the element comes into view
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
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

        accomplismentArr.forEach((hugeText, i) => {
          // Initialize counter to 0
          let currentNumber = 0;
          let intervalTime = 900 / finalNumbers[i]; // Have the animation finish at roughly the same time.

          let intervalId = setInterval(() => {
            // This callback increments p.semi-huge text's value at set periods of time.
            if (parseInt(currentNumber) >= finalNumbers[i]) {
              hugeText.textContent = finalNumbers[i] + "+"; // At the final iteration add + sign.
              clearInterval(intervalId);
            } else {
              currentNumber++; // Increment the number
              hugeText.textContent = currentNumber; // Update the text content of the <p> element
            }
          }, intervalTime);

          hugeText.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 1100,
            easing: "ease-in",
          });
        });
      } 
      else if (entry.target.classList.contains("teamQualities-section")) {
        // Start the interval if it hasn't been started yet
        let intervalId; // Variable to store the interval ID
        if (!intervalId) {
          intervalId = setInterval(function () {
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
          }, 10000); // Trigger the event every 5 seconds
        }
      } else {
        // Clear the interval when the element is out of view
        if (intervalId) {
          clearInterval(intervalId);
          console.log("Element is out of view, interval cleared.");
        }
      }
    }
  });
};

// Create an instance of the IntersectionObserver
const observer = new IntersectionObserver(observerCallback);

// Start observing the element
observer.observe(readMoreText);
observer.observe(whyUsBox);
observer.observe(qualitiesSection);
