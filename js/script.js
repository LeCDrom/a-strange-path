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
    text: 'Everything feels like, a dream. This place appears to be very unusual...',
    options: [
      { text: 'Look around', nextId: 'look_around' }
    ]
  },
  {
    id: 'look_around',
    text: 'The forest looks strangely desaturated. It sure does not look very joyful.',
    options: [
      { text: 'Check pockets', nextId: 'check_pockets' },
      { text: 'Call for someone', nextId: 'call_help' }
    ]
  },
  {
    id: 'check_pockets',
    text: 'I have definitely seen this before. Familiar but not really helping...',
    options: [
      { text: 'Look closer', nextId: 'analyze_bracelet' },
      { text: 'Look around', nextId: 'start' }
    ]
  },
  {
    id: 'analyze_bracelet',
    text: 'No matter how hard I try, I cannot read these characters.',
    options: [
      { text: 'Call for someone', nextId: 'call_help' },
      { text: 'Start walking', nextId: 'start_walking' }
    ]
  },
  {
    id: 'call_help',
    text: 'No response... What should I do now?',
    options: [
      { text: 'Try again', nextId: 'but_no_one_came' },
      { text: 'Start walking', nextId: 'start_walking' }
    ]
  },
  {
    id: 'but_no_one_came',
    text: 'I guess I really am alone... What did I get myself into?',
    options: [
      { text: 'Try again', nextId: 'call_help' },
      { text: 'Start walking', nextId: 'start_walking' }
    ]
  },
  {
    id: 'start_walking',
    text: 'That... That does not look normal.',
    options: [
      { text: 'Walk towards the glowing mushrooms', nextId: 'walk_mushrooms' },
      { text: 'Walk towards the torn stump', nextId: 'walk_stump' }
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
