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
