// By default every slide has 100% content height, so since they contain different content, they end up having different heights. Simply setting the height of the tallest slide to all, isn't as good because when resizing screen, this value won't update.

// Event handler
const setSlideHeight = (e) => {
  // Get all slides into an array.
  const slidesArr = Array.from(
    document.querySelectorAll(".teamQuality-content-container")
  );

  // If window resized.
  if (e.type === "resize") {
    let height;

    // Get gap, padding-y height outside loop since their are the same for all slides.
    // parseInt converts 100px -> 100.
    // getComputedStyle get all element's styles.
    const gapPaddingHeight =
      parseInt(window.getComputedStyle(slidesArr[0]).gap, 10) +
      parseInt(window.getComputedStyle(slidesArr[0]).paddingBottom, 10) +
      parseInt(window.getComputedStyle(slidesArr[0]).paddingTop, 10);

    // Calculate every slide's height based on their content(h3, p, gap, padding-y).
    slidesArr.map((slide) => {
      // Add to each slide's height their text content height.
      height =
        gapPaddingHeight +
        parseInt(window.getComputedStyle(slide.children[0]).height, 10) +
        parseInt(window.getComputedStyle(slide.children[1]).height, 10);

      // Set slide's height
      slide.style.height = height + "px";
    });
  }

  // Get every slide's height & store in a separate array.
  const slidesHeightArr = slidesArr.map((slide) =>
    parseInt(window.getComputedStyle(slide).height, 10)
  );

  // Find the tallest(i.e. max height value) using spread operator.
  const maxHeight = Math.max(...slidesHeightArr);

  // Finally set the previously found max height value to all slides.
  slidesArr.forEach((slide) => (slide.style.height = maxHeight + "px"));

  // Arrows must be the same height as slides to cover the transitions happening below.
  document.querySelector('.teamQualities-prev-arrow').style.height = maxHeight + "px";
  document.querySelector('.teamQualities-next-arrow').style.height = maxHeight + "px";
};

window.onload = (e) => setSlideHeight(e);
window.onresize = (e) => setSlideHeight(e);
