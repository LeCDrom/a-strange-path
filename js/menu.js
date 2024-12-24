const open_button = document.getElementById('open-menu');
const simple_open_button = document.getElementById('simple-open-menu');
const close_button = document.getElementById('close');
const simple_close_button = document.getElementById('simple-close');

const menu = document.getElementById('main-nav-wrapper');
const simple_menu = document.getElementById('simple-nav-wrapper');


if (open_button && menu) {
    open_button.addEventListener('click', function () {
        menu.style.display = 'flex';
    });
}

if (simple_open_button && simple_menu) {
    simple_open_button.addEventListener('click', function () {
        simple_menu.style.display = 'flex';
    });
}

if (close_button && menu) {
    close_button.addEventListener('click', function () {
        menu.style.display = 'none';
    });
}

if (simple_close_button && simple_menu) {
    simple_close_button.addEventListener('click', function () {
        simple_menu.style.display = 'none';
    });
}
