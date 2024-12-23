const about_section = document.getElementById('about-section')

const header_text = document.getElementById('about-h1');
const paragraph = document.getElementById('about-p');
const button = document.getElementById('about-button');

const aboutSets = [
    {
        h1: "Who am I?",
        p: "<div class='to-notice'>My name is Côme</div><hr id='dash-separator'>At the time of this website's creation, I am a french IT student in networks and telecommunications (freshman year).<br>As far as I can remember, I have always been a rational human. That did not prevent me from enjoying to imagine new worlds and to constantly have my head in the clouds !",
        button: "About the project"
    },
    {
        h1: "What is this project?",
        p: "<div class='to-notice'>This website is part of an assignment to discover web development</div><hr id='dash-separator'>It allowed me to learn HTML and CSS, but also web design.<br>I chose to go a bit further, and learnt JavaScript to implement button event handling, and created a simple game using the knowledge I gained from the course.",
        button: "The inspiration"
    },
    {
        h1: "Behind the project",
        p: "<div class='to-notice'>The website's design resulted from various choices</div><hr id='dash-separator'>The lack of context, the restricted color palette, and the flat design choices were made to add to the mystery.<br>Just like the character, the player does not know anything when they begin, immersing them deeper into the game.<br>This website was heavily inspired by <a href='https://raw.githubusercontent.com/LeCDrom/a-strange-path/refs/heads/main/images/liminal_example.jpg'>liminal spaces</a>. These are usually pictures of simple places that were shot in a way that create or amplify \"surreal\" and \"unsettling\" feelings. Each one tells a story, story that I never wrote down until now.",
        button: "About me"
    }
]

let currentIndex = 0;

function fadeAndUpdate() {
    currentIndex = (currentIndex + 1) % aboutSets.length;
    about_section.classList.add('hidden');

    setTimeout(() => {
        // Update the content
        updateContent();

        // Remove fade-in class after animation completes
        about_section.classList.remove('hidden');
    }, 500);
}

function updateContent() {
    const currentContent = aboutSets[currentIndex];
    
    header_text.textContent = currentContent.h1;
    paragraph.innerHTML = currentContent.p;
    button.textContent = currentContent.button;
}

updateContent();

button.addEventListener('click', fadeAndUpdate);
