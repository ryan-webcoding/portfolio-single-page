document.addEventListener("DOMContentLoaded", () => {
  let isScrolling = false;
  let hasSnappedToCity = false;
  let hasSnappedToUnderground = false;
  let isScrollLocked = false; // Prevents user scrolling away during lock

  window.addEventListener("scroll", () => {
    if (isScrolling || isScrollLocked) return; // Prevents unnecessary triggers

    const middleOfViewport = window.innerHeight / 2;

    const citySection = document.querySelector(".city");
    const undergroundSection = document.querySelector(".underground");

    const cityTop = citySection.getBoundingClientRect().top;
    const undergroundTop = undergroundSection.getBoundingClientRect().top;

    // Snap to .city (Section 2)
    if (!hasSnappedToCity && cityTop < middleOfViewport && cityTop > 0) {
      isScrolling = true;
      hasSnappedToCity = true; // Prevents re-triggering when scrolling back up
      smoothSnapScroll(citySection.offsetTop, () => {
        isScrolling = false;
        lockScroll(2000); // Lock scrolling for 2 seconds after snapping to city
      });
    }

    // Snap to .underground (Section 3) at 15vh (halfway through its 30vh height)
    else if (
      !hasSnappedToUnderground &&
      hasSnappedToCity &&
      undergroundTop < window.innerHeight * 0.85 &&
      undergroundTop > 0
    ) {
      isScrolling = true;
      hasSnappedToUnderground = true; // Prevents re-triggering when scrolling back up
      smoothSnapScroll(undergroundSection.offsetTop, () => {
        isScrolling = false;
        lockScroll(1500); // Lock scrolling for 1.5 seconds after snapping to underground
      });
    }
  });
});

// Custom smooth snapping function with acceleration
function smoothSnapScroll(targetPosition, callback) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;
  const duration = 300; // Adjust for snappiness (lower = faster snap)

  function animationStep(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsedTime = currentTime - startTime;
    const progress = elapsedTime / duration;

    // Ease-in acceleration: Faster at start, snaps into place at end
    const easeInOutCubic =
      progress < 0.5
        ? 4 * progress ** 3
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const newPosition = startPosition + distance * easeInOutCubic;
    window.scrollTo(0, newPosition);

    if (elapsedTime < duration) {
      requestAnimationFrame(animationStep);
    } else {
      window.scrollTo(0, targetPosition); // Snap exactly to target
      if (callback) callback();
    }
  }

  requestAnimationFrame(animationStep);
}

// Lock scrolling for a specified duration (in milliseconds)
function lockScroll(duration) {
  isScrollLocked = true;
  document.body.style.overflow = "hidden"; // Disable scrolling

  setTimeout(() => {
    isScrollLocked = false;
    document.body.style.overflow = ""; // Re-enable scrolling
  }, duration);
}
