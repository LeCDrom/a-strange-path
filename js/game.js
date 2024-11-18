let currentChoiceId = 'start'; // Start from the first choice

// Choices data
const choices = [
  {
    id: 'start',
    text: 'Everything feels like a dream. This place appears to be very unusual...',
    options: [
      { text: 'Look around', nextId: 'look_around' }
    ],
    description: '"Ugh, not the best wake-up call ever... Everything looks fuzzy and dark, I feel disoriented. What is this place?"'
  },
  {
    id: 'look_around',
    text: 'The forest looks strangely desaturated. It sure does not look very joyful.',
    options: [
      { text: 'Look again', nextId: 'look_around2' }
    ],
    description: '"It appears to be a dense forest? It looks quite strange though, I know what a forest is supposed to look like and that is deninitely unusual. There is no wind, no noise, and the trees look tinted gray??"'
  },
  {
    id: 'look_around2',
    text: 'This place is starting to give me the creeps...',
    options: [
      { text: 'Check pockets', nextId: 'check_pockets' },
      { text: 'Call for someone', nextId: 'call_help' }
    ],
    description: '"The sky is hidden by the large amount of leaves in the trees. It makes everything look pretty gloomy and dark."'
  },
  {
    id: 'check_pockets',
    text: 'I have definitely seen this before. Familiar but not really helping...',
    options: [
      { text: 'Look closer', nextId: 'analyze_bracelet' },
      { text: 'Look around', nextId: 'look_around2' }
    ],
    description: '"What is this? A bracelet? It looks oddly familiar for some reason. I wonder to whom it belonged..."'
  },
  {
    id: 'analyze_bracelet',
    text: 'No matter how hard I try, I cannot read these characters.',
    options: [
      { text: 'Call for someone', nextId: 'call_help' },
      { text: 'Start walking', nextId: 'start_walking' }
    ],
    description: '"Huh, some strange characters are printed on it. This langage does not seem to be readable, though. That\'s too bad, I could\'ve gotten more information on who I am..."'
  },
  {
    id: 'call_help',
    text: 'No response... What should I do now?',
    options: [
      { text: 'Try again', nextId: 'but_no_one_came' },
      { text: 'Start walking', nextId: 'start_walking' }
    ],
    description: '"Nothing... Not even a single sound"'
  },
  {
    id: 'but_no_one_came',
    text: 'I guess I really am alone... What did I get myself into?',
    options: [
      { text: 'Try again', nextId: 'call_help' },
      { text: 'Start walking', nextId: 'start_walking' }
    ],
    description: '"Still no response. I am completely alone, in an unknown place, without any memories of who I am. *Sigh*, that\'s just great..."'
  },
  {
    id: 'start_walking',
    text: 'That... That does not look normal.',
    options: [
      { text: 'Walk towards the clearing', nextId: 'walk_mushrooms' },
      { text: 'Walk towards the torn stump', nextId: 'walk_stump' }
    ],
    description: '"I see two oddities in the distance : a stump that seems to have been completely ripped from the ground, and a glowing mushroom clearing. I have a feeling I\'m going to see this kind of thing a lot here."'
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

  // Update the current choice's description
  let currentChoiceDescription = document.getElementById('choice-description')
  currentChoiceDescription.textContent = choice.description

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
