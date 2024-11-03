/**
 * svgSeparator -> svg container
 * svg -> the white overlay
 * heroPartnersBox -> The blue overlay
 *
 * The handler works only on screens above 900px. First selects the DOM Elements. Then resizes the SVG based on the window's width & the automatic resize of it's path child element. Finaly moves upwards the svgSeparator & the heroPartnersBox. The 1st based on the height of the above hero element. The 2nd an additional 140 px, to account for the uneven svg border.
 *
 * Also resizes the hero-section container to roughly have the same size as its content.
 *
 * Finaly the handler is called on window load & on window resize.
 *
 * */


const heroSVGPlacement = function () {
  const heroSection = document.querySelector("section.hero-section");
  const svgSeparator = document.querySelector("div.svg-separator");
  const svg = document.querySelector("div.svg-separator > svg");
  const heroPartnersBox = document.querySelector(".heroPartners-box");

  // This value is the aspect ratio of the svg's viewbox container.
  let svgHeight = window.innerWidth * 0.5265625;

  svg.setAttribute("width", window.innerWidth);
  svg.setAttribute("height", svgHeight);

  svgSeparator.style.top = `${svgHeight * -1}px`;
  
  if (window.innerWidth >= 1035) {
    // Negate, subtract 180 & convert to string
    heroPartnersBox.style.top = `${svgHeight * -1 - 230}px`;
    
    heroPartnersBox.style.height = "440px";
    heroSection.style.height = "850px";
  } else if (window.innerWidth >= 515) {
    heroPartnersBox.style.top = `${svgHeight * -1 - 180}px`;
    heroPartnersBox.style.height = "500px";
    if (window.innerWidth < 900) {
      heroSection.style.height = "1300px";
    } else { 
      heroSection.style.height = "1000px";
    }
  } else if (window.innerWidth < 515) {
    heroPartnersBox.style.top = `${svgHeight * -1 - 80}px`;
    heroPartnersBox.style.height = "650px";
    heroSection.style.height = "1450px";
  }
};


window.onload = heroSVGPlacement();
window.addEventListener("resize", heroSVGPlacement);
