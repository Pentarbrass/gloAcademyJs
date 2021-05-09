const toggleMenu = () => {
    const menu = document.querySelector('menu');
    let menuLink = document.querySelectorAll('menu a');
    window.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.menu') || target.matches('menu>ul>li>a')) {
            menu.classList.toggle('active-menu');
        } else if (!target.closest('menu') || target.matches('.close-btn')) {
            menu.classList.remove('active-menu');
        }
    })

menuLink.forEach(event => {
    let targer = event.targer;
    event.addEventListener('click', (e) => {
        e.preventDefault();
        let id = event.getAttribute('href');
        if (id !== '#') {
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        }
    });
});


};

export default toggleMenu;