const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;
const themeIcon = themeToggleButton.querySelector('i'); // Select the icon inside the button

// Check for saved theme preference in localStorage and apply it
let currentTheme = localStorage.getItem('theme') || 'dark-theme';
bodyElement.classList.add(currentTheme);
updateIcons(currentTheme);

// Add event listener to toggle button
themeToggleButton.addEventListener('click', () => {
  // Toggle between themes
  currentTheme = (currentTheme === 'light-theme') ? 'dark-theme' : 'light-theme';

  // Update body class and save the new theme in localStorage
  bodyElement.className = currentTheme; // directly set the class to currentTheme
  localStorage.setItem('theme', currentTheme);

  // Update icon based on the new theme
  updateIcons(currentTheme);
});

// Function to update the icon based on theme
function updateIcons(theme) {
  if (theme === 'light-theme') {
    themeIcon.classList.replace('fa-sun', 'fa-moon'); // Show moon icon for dark mode
  } else {
    themeIcon.classList.replace('fa-moon', 'fa-sun'); // Show sun icon for light mode
  }
}


// Game behavior
// Game behavior
let currentChoiceId = 'start'; // Start from the first choice

// Choices data
const choices = [
  {
    id: 'start',
    text: 'You wake up in a dark, quiet forest. What do you do?',
    options: [
      { text: 'Look around', nextId: 'look_around' },
      { text: 'Look around', nextId: 'look_around' }
    ]
  },
  {
    id: 'look_around',
    text: 'You see trees all around. There seems to be a cabin ahead.',
    options: [
      { text: 'Go to the cabin', nextId: 'go_to_cabin' },
      { text: 'Go to the cabin', nextId: 'go_to_cabin' }
    ]
  },
  {
    id: 'go_to_cabin',
    text: 'You arrive at the cabin and find a locked door. What will you do?',
    options: [
      { text: 'Look for a key', nextId: 'find_key' },
      { text: 'Look for a key', nextId: 'find_key' }
    ]
  },
  {
    id: 'find_key',
    text: 'You find a key under the doormat and open the cabin door.',
    options: [
      { text: 'Enter the cabin', nextId: 'enter_cabin' },
      { text: 'Enter the cabin', nextId: 'enter_cabin' }
    ]
  }
];

// Get HTML elements
const currentChoiceContainer = document.getElementById('current-choice');
const currentChoiceButtonContainer = document.getElementById('button-container')
const journalContainer = document.getElementById('journal');
const inventoryContainer = document.getElementById('inventory');

// Function to display current choice
function displayChoice(choiceId) {
  const choice = choices.find(c => c.id === choiceId);

  // Check if `choice-text` div exists, if not, create it
  let choiceTextContainer = document.getElementById('choice-text');
  if (!choiceTextContainer) {
    choiceTextContainer = document.createElement('div');
    choiceTextContainer.id = 'choice-text';
    choiceTextContainer.className = 'game-section';
    currentChoiceContainer.prepend(choiceTextContainer); // Add it as the first child
  }

  // Update the content of choice-text without affecting button-container
  choiceTextContainer.textContent = choice.text; // Directly setting the text content

  // Clear previous buttons in button-container
  currentChoiceButtonContainer.innerHTML = "";

  // Add new buttons for each option
  choice.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option.text;
    button.onclick = () => handleChoice(option.nextId);
    currentChoiceButtonContainer.appendChild(button);
  });

  // Scroll to current choice
  currentChoiceContainer.scrollIntoView({ behavior: 'smooth' });
}

// Handle choice selection
function handleChoice(nextId) {
  const choice = choices.find(c => c.id === currentChoiceId);

  // Move to next choice
  displayChoice(nextId);
}

// Start the game
window.onload = function() {
  displayChoice(currentChoiceId);
};
