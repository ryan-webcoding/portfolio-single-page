function interpolateColor(color1, color2, factor) {
  return color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
}

function getScrollFraction() {
  let scrollTop = window.scrollY;
  let maxScroll = Math.min(
    200 * window.innerHeight,
    document.body.scrollHeight - window.innerHeight
  );
  return maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0; // Normalize to [0,1] and lock at 200vh
}

function computeBackgroundColors(scrollFraction) {
  let nightStart = [0, 0, 0]; // Black at 0vh
  let morningTop = [0, 255, 255]; // Cyan at 10vh
  let morningBottom = [227, 255, 255]; // Light Blue at 60vh
  let sunsetTop = [255, 55, 0]; // #FF3700
  let sunsetBottom = [255, 196, 180]; // #FFC4B4
  let nightTop = [0, 0, 0]; // #000000
  let nightBottom = [0, 0, 139]; // #00008B

  let newTopColor, newBottomColor;

  if (scrollFraction < 0.05) {
    // Black to Cyan (0vh - 10vh)
    let factor = scrollFraction / 0.05;
    newTopColor = interpolateColor(nightStart, morningTop, factor);
    newBottomColor = interpolateColor(nightStart, morningTop, factor);
  } else if (scrollFraction < 0.3) {
    // Cyan to Light Blue (10vh - 60vh)
    let factor = (scrollFraction - 0.05) / 0.25;
    newTopColor = interpolateColor(morningTop, morningBottom, factor);
    newBottomColor = interpolateColor(morningTop, morningBottom, factor);
  } else if (scrollFraction < 0.6) {
    // Light Blue to Sunset (60vh - 120vh)
    let factor = (scrollFraction - 0.3) / 0.3;
    newTopColor = interpolateColor(morningBottom, sunsetTop, factor);
    newBottomColor = interpolateColor(morningBottom, sunsetBottom, factor);
  } else if (scrollFraction < 0.9) {
    // Sunset to Night (120vh - 200vh) - Ensuring transition finishes at 200vh
    let factor = (scrollFraction - 0.6) / 0.3;
    newTopColor = interpolateColor(sunsetTop, nightTop, factor);
    newBottomColor = interpolateColor(sunsetBottom, nightBottom, factor);
  } else {
    // Fully night at 200vh
    newTopColor = nightTop;
    newBottomColor = nightBottom;
  }

  return {
    top: `rgb(${newTopColor.join(",")})`,
    bottom: `rgb(${newBottomColor.join(",")})`,
  };
}

function updateBackground() {
  let scrollFraction = getScrollFraction();
  let colors = computeBackgroundColors(scrollFraction);

  let backgroundElement = document.querySelector(".sky-background");
  backgroundElement.style.background = `linear-gradient(to bottom, ${colors.top}, ${colors.bottom})`;
}

function smoothUpdate() {
  requestAnimationFrame(() => {
    updateBackground();
  });
}

// Set initial background color
document.addEventListener("DOMContentLoaded", () => {
  updateBackground(); // Ensures smooth transition from the start
  document.querySelector(".sky-background").style.transition =
    "background 0.5s linear"; // Smooth color change
});

// Listen for scroll events and update the background smoothly
window.addEventListener("scroll", smoothUpdate);
