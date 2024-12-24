// Start from the first choice
let currentChoiceId = 'start';

// Choices data
const choices = [
  {
    id: 'start',
    text: 'Everything feels like a dream. This place appears to be very unusual...',
    options: [
      { text: 'Look around', nextId: 'look_around' }
    ],
    description: '"Ugh, not the best wake-up call ever... Everything looks fuzzy and dark, I feel disoriented.<br>What is this place?"'
  },
  {
    id: 'look_around',
    text: 'The forest looks strangely desaturated. It sure does not look very joyful.',
    options: [
      { text: 'Look again', nextId: 'look_around2' }  
    ],
    description: '"It appears to be a dense forest? It looks quite strange though, I know what a forest is supposed to look like and that is definitely unusual.<br>There is no wind, no noise, and the trees look tinted gray??"'
  },
  {
    id: 'look_around2',
    text: 'This place is starting to give me the creeps...',
    options: [
      { text: 'Check pockets', nextId: 'check_pockets' },
      { text: 'Call for someone', nextId: 'call_help' }
    ],
    description: '"The sky is hidden by the large amount of leaves in the trees. It makes everything look gloomy and dark."'
  },
  {
    id: 'check_pockets',
    text: 'I have definitely seen this before. Familiar but not really helping...',
    options: [
      { text: 'Look closer', nextId: 'analyze_bracelet' },
      { text: 'Call for someone', nextId: 'call_help' }
    ],
    description: '"What is this? A bracelet?<br>It looks oddly familiar for some reason. I wonder to whom it belonged..."'
  },
  {
    id: 'analyze_bracelet',
    text: 'No matter how hard I try, I cannot read these characters.',
    options: [
      { text: 'Call for someone', nextId: 'call_help' },
      { text: 'Start walking', nextId: 'start_walking' }
    ],
    description: '"Huh, some strange characters are printed on it. This langage does not seem to be readable, though<br>That\'s too bad, I could\'ve gotten more information on who I am..."'
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
    description: '"Still no response. I am completely alone, in an unknown place, without any memories of who I am.<br>*Sigh*, that\'s just great..."'
  },
  {
    id: 'start_walking',
    text: 'That... That does not look normal.',
    options: [
      { text: 'Walk towards the clearing', nextId: 'walk_mushrooms' },
      { text: 'Walk towards the torn stump', nextId: 'walk_stump' }
    ],
    description: '"I see two oddities in the distance : a stump that seems to have been completely ripped from the ground, and a glowing mushroom clearing<br>I have a feeling I\'m going to see this kind of thing a lot here."'
  },
  {
    id: 'walk_stump',
    text: 'Not reassuring...',
    options: [
      { text: 'Head back', nextId: 'start_walking' },
      { text: 'Approach the stump', nextId: 'check_stump' }
    ],
    description: '"A shiver runs down my spine. The stump does not seem very old.<br>The top part must have fallen because of the wind but where is the rest of the tree?<br>I hope someone chopped it off and brought it home..."'
  },
  {
    id: 'check_stump',
    text: 'The light comes from under.',
    options: [
      { text: 'Look under the stump', nextId: 'check_under_stump' }
    ],
    description: '"A faint yellowish light emanates from the stump.<br>What is this?"'
  },
  {
    id: 'check_under_stump',
    text: 'Interesting...',
    options: [
      { text: 'Head back to the clearing', nextId: 'walk_mushrooms' },
      { text: 'Look closer', nextId: 'analyze_lantern' }
      
    ],
    description: '"Huh? A lantern? What is it doing here?<br>It\'s still lit. The flame is burning vigorously..."'
  },
  {
    id: 'analyze_lantern',
    text: 'Very strange. I hope it\'ll last for a bit so I can see better.',
    options: [
      { text: 'Head back to the clearing', nextId: 'walk_mushrooms' }
    ],
    description: '"If I had to age this thing, I would say it\'s from the 19th century. I do not see any wear marks though.<br>An ancient relic from a distant past..."'
  },
  {
    id: 'walk_mushrooms',
    text: 'Stay tuned...',
    options: [
      { text: 'Go back home', nextId: 'none' }
    ],
    description: '[TO BE CONTINUED]'
  },
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
  choiceTextContainer.textContent = choice.text;

  // Update the current choice's description
  let currentChoiceDescription = document.getElementById('choice-description')
  currentChoiceDescription.innerHTML = choice.description

  // Clear previous buttons in button-container
  currentChoiceButtonContainer.innerHTML = "";

  // Add new buttons for each option
  choice.options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'choice-button';
    button.textContent = option.text;
    button.onclick = () => handleChoice(option.nextId);
    currentChoiceButtonContainer.appendChild(button);

    const choice_button = document.querySelectorAll('.choice-button');
    const choice_description = document.getElementById('choice-description');

    choice_button.forEach(button => {
        button.addEventListener('click', () => {
              choice_description.classList.add('flip-in-hor-top');

            setTimeout(() => {
                choice_description.classList.remove('flip-in-hor-top');
            }, 600);
        });
    });

  });

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
