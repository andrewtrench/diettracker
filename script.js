// A helper function to format the current date as a string
function getTodayString() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

// Set the state of the button based on stored data
function setButtonState(button) {
  const data = JSON.parse(localStorage.getItem(button.dataset.id)) || {};
  if (data.date === getTodayString()) {
    button.classList.add("active");
  } else {
    button.classList.remove("active");
  }
}

// Handle button click
function handleButtonClick(event) {
  const button = event.target;
  const data = JSON.parse(localStorage.getItem(button.dataset.id)) || {};
  if (data.date === getTodayString()) {
    // If the button has already been clicked today, do nothing
    return;
  }
  // Otherwise, save the click in localStorage and change the button state
  localStorage.setItem(
    button.dataset.id,
    JSON.stringify({ date: getTodayString() })
  );
  setButtonState(button);
}

// Attach the click handler to every button
const buttons = document.querySelectorAll(".food-button");
buttons.forEach((button) => {
  setButtonState(button); // Set the initial state of the button
  button.addEventListener("click", handleButtonClick);
});

// At midnight, reset the state of all buttons
const now = new Date();
const timeUntilMidnight =
  new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
setTimeout(() => location.reload(), timeUntilMidnight);
