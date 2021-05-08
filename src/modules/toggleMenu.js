const toggleMenu = () => {
        const handlerMenu = () => {
            const target = event.target;
            const displayMenu = () => {
                document.querySelector('menu').classList.add('active-menu');
            };
            const closeMenu = () => {
                document.querySelector('menu').classList.remove('active-menu');
            };
            if (target.closest('.menu')) {
                displayMenu();
            } else if (target.closest('[href^="#"]')) {
                closeMenu();
                if (target.classList.contains('close-btn')) {
                    closeMenu();
                }
            } else if (!target.closest('menu')) {
                closeMenu();
            }
        };
        document.body.addEventListener('click', handlerMenu);
};
    
export default toggleMenu;