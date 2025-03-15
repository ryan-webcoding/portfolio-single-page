//dynamically update time
function updateTime() {
  const timeElement = document.getElementById("time");
  const now = new Date();

  // Get hours and minutes
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Format minutes to always have two digits (e.g., 9 -> 09)
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Set formatted time
  timeElement.textContent = `${hours}:${minutes}`;
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 1000);

//adding button functionality
document.addEventListener("DOMContentLoaded", function () {
  function setupButton(button, defaultText, toggledText) {
    let isToggled = false;

    button.addEventListener("click", function () {
      isToggled = !isToggled;
      button.textContent = isToggled ? toggledText : defaultText;
      button.style.transform = "scale(1)";
    });

    button.addEventListener("mouseover", function () {
      if (!isToggled) button.style.transform = "scale(0.9)";
    });

    button.addEventListener("mouseleave", function () {
      if (!isToggled) button.style.transform = "scale(1)";
    });
  }

  setupButton(
    document.getElementById("friend-request-button"),
    "Send Friend Request",
    "Friend Request Sent"
  );

  setupButton(
    document.getElementById("report-spam-button"),
    "Report Spam",
    "Spam Reported"
  );
});

//scroll effect
const scrollContainer = document.getElementById("scroll-container");
const scrollContent = document.getElementById("entire-chatlog-container");

let currentTop = 0;
let isMouseInside = false;

// Detect if the mouse is inside the scrollable div
scrollContainer.addEventListener("mouseenter", () => (isMouseInside = true));
scrollContainer.addEventListener("mouseleave", () => (isMouseInside = false));

document.addEventListener(
  "wheel",
  function (event) {
    if (isMouseInside) {
      event.preventDefault(); // Prevent viewport scrolling
      let maxScroll = scrollContainer.clientHeight - scrollContent.clientHeight;
      currentTop -= event.deltaY; // Adjust position based on scroll

      if (currentTop > 0) {
        currentTop = 0; // Prevent scrolling beyond top
      } else if (currentTop < maxScroll) {
        currentTop = maxScroll; // Prevent scrolling beyond bottom
      }

      scrollContent.style.top = currentTop + "px";
    }
    // If mouse is outside, allow default page scrolling
  },
  { passive: false }
);

//below are the implementation of input triggering keyboard showing and hiding
const keyboard = document.getElementById("keyboard");
const chatlog = document.getElementById("entire-chatlog-container");
const bottomMenu = document.getElementById("bottom-menu");
const toggleKeyboard = document.getElementById("toggleKeyboard");
let isKeyboardVisible = false;

toggleKeyboard.addEventListener("focus", () => {
  isKeyboardVisible = true;
  keyboard.style.top = "37.6vh";
  bottomMenu.style.top = "30vh";
  chatlog.style.transform = "translateY(-20vh)";
});

chatlog.addEventListener("click", () => {
  if (isKeyboardVisible) {
    isKeyboardVisible = false;
    keyboard.style.top = "57.6vh";
    bottomMenu.style.top = "50vh";
    chatlog.style.transform = "translateY(0)";
    toggleKeyboard.blur();
  }
});

chatlog.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    chatlog.scrollTop += event.deltaY;
  },
  { passive: false }
);

//below is the implementation of date
document.addEventListener("DOMContentLoaded", function () {
  const dateDiv = document.getElementById("date");
  if (dateDiv) {
    const today = new Date();
    const options = { day: "2-digit", month: "long", year: "numeric" };
    dateDiv.textContent = today.toLocaleDateString("en-GB", options);
  }
});

//experimenting, clicking button and send message
const entries = [
  {
    "chat-username": "cool guy",
    "button-text": "Say hello👋",
    "image-path": "./img/cute-cat.png",
    "dialogue-text":
      "Hey, I saw your post about Ryan. His profile looks interesting—Computer Science grad from Melbourne, passionate about web development. Can you tell me more about him?",
  },
  {
    "chat-username": "becky",
    "button-text": "Say hello👋",
    "image-path": "./img/profile-pic.png",
    "dialogue-text":
      "Oh, John, you’ve got good taste! Ryan’s a gem—sharp mind, always upskilling, and knows his way around React like it’s his second language. You looking for a front-end wizard? ✨",
  },
  {
    "chat-username": "cool guy",
    "button-text": "soft skill?",
    "image-path": "./img/cute-cat.png",
    "dialogue-text":
      "That’s exactly what we need. We have a React-heavy stack, so someone who’s deep into it is ideal. How’s his problem-solving and teamwork?",
  },
  {
    "chat-username": "becky",
    "button-text": "soft skill?",
    "image-path": "./img/profile-pic.png",
    "dialogue-text":
      "Oh, he’s the kind of guy who sees a bug and fixes it before you even realize it’s there. And teamwork? Let’s just say, if React was a rock band, he’d be the lead guitarist—skilled but plays well with others. 🎸",
  },
  {
    "chat-username": "cool guy",
    "button-text": "experience level?",
    "image-path": "./img/cute-cat.png",
    "dialogue-text":
      "Sounds promising. How’s his experience level? I see he’s a recent grad. Has he built anything substantial?",
  },
  {
    "chat-username": "becky",
    "button-text": "experience level?",
    "image-path": "./img/profile-pic.png",
    "dialogue-text":
      "Oh, you bet. He’s got projects on GitHub that’ll make your dev team drool. Some pretty slick UI work, clean code, and an eye for detail. Honestly, I’d hire him myself if I wasn’t too busy being dangerously charming. 😏",
  },
  {
    "chat-username": "cool guy",
    "button-text": "we need fast learner.",
    "image-path": "./img/cute-cat.png",
    "dialogue-text":
      "Haha, noted. But seriously, what’s his learning curve like? We move fast, so we need someone who can keep up.",
  },
  {
    "chat-username": "becky",
    "button-text": "we need fast learner.",
    "image-path": "./img/profile-pic.png",
    "dialogue-text":
      "Oh, trust me, Ryan learns faster than I swipe left on bad LinkedIn pitches. 🚀 New tech? He’ll be up to speed before your morning coffee even kicks in.",
  },
  {
    "chat-username": "cool guy",
    "button-text": "let's do it then💪",
    "image-path": "./img/cute-cat.png",
    "dialogue-text":
      "That’s what I like to hear. Okay, let’s set up a call. I’d love to meet him and see if he’s a fit.",
  },
  {
    "chat-username": "becky",
    "button-text": "let's do it then💪",
    "image-path": "./img/profile-pic.png",
    "dialogue-text":
      "Ooooh, business mode activated. Alright, John, I’ll set it up. But only if you promise to bring your A-game, ‘cause Ryan? He’s already bringing his. 😉",
  },
];

let currentIndex = 0;
const button = document.getElementById("dialogue-button");
const originalDiv = document.getElementById("chat-container");
const typingComponent = document.getElementById("typing-banner");

// Hide the original div
originalDiv.style.display = "none";

// Set initial button text
button.textContent = entries[currentIndex]["button-text"];

// Create spacer div (10vh, stays at the bottom)
const spacerDiv = document.createElement("div");
spacerDiv.style.height = "10vh"; // Set height to 10vh
spacerDiv.style.width = "100%"; // Ensure it spans the full width

// Append the spacer div initially
originalDiv.parentNode.appendChild(spacerDiv);

function createEntry(index) {
  if (index >= entries.length) return;

  let clonedDiv = originalDiv.cloneNode(true);
  clonedDiv.style.display = "flex"; // Ensure cloned divs are visible
  clonedDiv.querySelector(".cute-cat").src = entries[index]["image-path"];
  clonedDiv.querySelector(".chat-body").textContent =
    entries[index]["dialogue-text"];

  // Update chat-username with the value from the list
  clonedDiv.querySelector(".chat-username").textContent =
    entries[index]["chat-username"];

  let now = new Date();
  let formattedDate =
    now.toLocaleDateString("en-GB") +
    ", " +
    now
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  clonedDiv.querySelector(".chat-date-time").textContent = formattedDate;

  // Append the cloned chat entry
  originalDiv.parentNode.appendChild(clonedDiv);

  // Create a 1vh spacer div for each entry
  const spacer1vh = document.createElement("div");
  spacer1vh.style.height = "1vh"; // Set height to 1vh
  spacer1vh.style.width = "100%"; // Ensure it spans the full width
  originalDiv.parentNode.appendChild(spacer1vh);

  // Move the 10vh spacer to the bottom after the entry
  originalDiv.parentNode.appendChild(spacerDiv);
}

button.addEventListener("click", function () {
  if (currentIndex >= entries.length) return; // Stop if out of bounds

  // Immediately create the first div
  createEntry(currentIndex);

  // Generate a random initial delay between 1 to 2 seconds
  let initialDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

  setTimeout(() => {
    // Show typing indicator
    typingComponent.style.visibility = "visible";

    // Generate a random delay between 2 to 4 seconds
    let delay = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;

    setTimeout(() => {
      currentIndex++;
      createEntry(currentIndex);

      // Hide typing indicator
      typingComponent.style.visibility = "hidden";

      // Move to the next entry
      currentIndex++;
      if (currentIndex < entries.length) {
        button.textContent = entries[currentIndex]["button-text"];
      } else {
        button.textContent = "time to leave..";
        button.disabled = true; // Optionally disable button after all entries are used
      }
    }, delay);
  }, initialDelay);
});
