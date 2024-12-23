const open_button = document.getElementById('open-menu');
const close_button = document.getElementById('close');

const menu = document.getElementById('wide-nav-container');


open_button.addEventListener('click', function () {
    menu.style.display = 'flex';
});

close_button.addEventListener('click', function () {
    menu.style.display = 'none';
});
