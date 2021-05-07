

window.addEventListener('DOMContentLoaded', () => {
    // Timer
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSecunds = document.querySelector('#timer-seconds');
        let idInterval = 0;

        const getTimeRemaining = () => {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000;
            let seconds = 0,
                minutes = 0,
                hours = 0;
            if (timeRemaining > 0) {
                seconds = Math.floor(timeRemaining % 60);
                minutes = Math.floor((timeRemaining / 60) % 60);
                hours = Math.floor(timeRemaining / 60 / 60);
            }
            return { timeRemaining, hours, minutes, seconds };
        };

        const addZero = elem => {
            if (String(elem).length === 1) { return '0' + elem; } else { return String(elem); }
        };

        const updateClock = () => {
            const timer = getTimeRemaining();
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSecunds.textContent = addZero(timer.seconds);

            if (timer.timeRemaining < 0) {
                clearInterval(idInterval);
            }
        };

        idInterval = setInterval(updateClock, 1000);
    };

    countTimer('2 May 2021');

    //Animated Scroll
    const animateScroll = () => {

        const target = event.target.closest('[href^="#"]'),
            speed = 0.15;

        if (target) {
            const pageY = window.pageYOffset,
                hash = target.href.replace(/[^#]*(.*)/, '$1'),
                distTopPosition = document.querySelector(hash).getBoundingClientRect().top;

            let start = 0;

            const step = time => {
                if (!start) start = time;

                const progress = time - start;

                const act = (distTopPosition < 0 ?
                    Math.max(pageY - progress / speed, pageY + distTopPosition) :
                    Math.min(pageY + progress / speed, pageY + distTopPosition));

                window.scrollTo(0, act);

                if (act < pageY + distTopPosition) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);

        }
    };

    //Menu

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
    toggleMenu();

    //Popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content'),
            popupData = {
                count: -445,
                speed: 24,
                startPos: -445,
                endPos: 0
            };

        const showPopup = () => {

            popupData.startPos > popupData.endPos ?
                popupData.count -= popupData.speed :
                popupData.count += popupData.speed;
            popupContent.style.transform = `translateY(${popupData.count}px)`;

            if (popupData.startPos > popupData.endPos ?
                popupData.count > popupData.endPos :
                popupData.count < popupData.endPos) {
                requestAnimationFrame(showPopup);
            }
        };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (screen.width > 768) {
                    popupData.count = popupData.startPos;
                    requestAnimationFrame(showPopup);
                }
            });
        });

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };
    togglePopUp();
    document.querySelector('main a').addEventListener('click', animateScroll);

    //Tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    //Slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });
        startSlide(1500);
    };

    // add dots
    const addDot = () => {
        const portfolioItem = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots');

        portfolioItem.forEach(() => {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            portfolioDots.appendChild(dot);
        });

        portfolioDots.children[0].classList.add('dot-active');
    };
    addDot();
    slider();

    //Change pic

    const setCommandImg = () => {
        const command = document.querySelector('#command .row');

        const changingPhotos = () => {
            const target = event.target;

            if (target.classList.contains('command__photo')) {
                const lastSrc = target.src;

                target.src = target.dataset.img;
                target.dataset.img = lastSrc;
            }
        };

        command.addEventListener('mouseover', changingPhotos);
        command.addEventListener('mouseout', changingPhotos);
    };

    //Validation
    const validateInputs = () => {
        const calcInputs = document.querySelectorAll('input.calc-item'),
            formName = document.querySelectorAll('[name=user_name]'),
            formMessage = document.querySelectorAll('[name=user_message]'),
            formEmail = document.querySelectorAll('[name=user_email]'),
            formPhone = document.querySelectorAll('[name=user_phone]');

        let error = new Set();

        const validateNumberInputs = () => {
            calcInputs.forEach(el => {
                el.value = el.value.replace(/[^\d]/g, '');
            });
        };

        const validateTextInputs = input => {
            input.value = input.value.replace(/[^а-яё\-\ ]/gi, '');
        };

        const inputsTotal = e => {
            if (e.target.matches('.calc-item')) {
                validateNumberInputs();
            }
            if (e.target.matches('[name=user_name]')) {
                validateTextInputs(e.target);
            }
            if (e.target.matches('#form2-message')) {
                validateTextInputs(e.target);
            }
            if (e.target.matches('[name=user_email]')) {
                e.target.value = e.target.value.replace(/[^a-z\@\_\-\.\!\~\*\']/gi, '');
            }
            if (e.target.matches('[name=user_phone]')) {
                e.target.value = e.target.value.replace(/[^\d\(\)\-\+]/g, '');
            }
        };


        const trimInputs = input => {
            input.value = input.value.replace(/\s+/g, ' ');
            input.value = input.value.replace(/\-+/g, '-');

            const inputToExp = new RegExp("ReGeX" + input.value + "ReGeX");
            if (/^[/ /-]/.test(inputToExp)) {
                input.value = input.value.replace(/^[/ /-]/, '');
            }
            if (/[/ /-]$/.test(inputToExp)) {
                input.value = input.value.replace(/[/ /-]$/, '');
            }
        };

        function capitalize(input) {
            const inputValue = input.value;
            return inputValue.split(' ').map(item =>
                item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');
        }

        const controlInputs = (input, exp) => {
            if (!input.value.match(exp)) {
                error.add(input.value);
                input.value = '';
            }
        };

        formName.forEach(el => {
            el.addEventListener('blur', () => {
                trimInputs(el);
                el.value = capitalize(el);
                controlInputs(el, /[а-яё]{2,}/gi);
            });
        });

        formMessage.forEach(el => {
            el.addEventListener('blur', () => {
                controlInputs(el, /[^а-яё0-9\.\,\:\-\!\? ]/gi);
                trimInputs(el);
            });
        });

        formEmail.forEach(el => {
            el.addEventListener('blur', () => {
                controlInputs(el, /\w+@\w+\.\w{2,3}/g);
                trimInputs(el);
            });
        });

        formPhone.forEach(el => {
            el.addEventListener('blur', () => {
                trimInputs(el);
                controlInputs(el, /\+?[78]([-()]*\d)/g);
            });
        });

        window.addEventListener('input', inputsTotal);
    };

    validateInputs();
    setCommandImg();

    //Calculator

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;

            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            animate({
                // скорость анимации
                duration: 2000,
                // Функция расчёта времени
                timing(timeFraction) {
                    return timeFraction;
                },
                // Функция отрисовки
                draw(progress) {
                    // в ней мы и производим вывод данных
                    totalValue.textContent = Math.floor(progress * total);

                }
            });
        };
        // функция запуска анимации
        function animate({ duration, draw, timing }) {

            const start = performance.now();

            requestAnimationFrame(function animate(time) {

                let timeFraction = (time - start) / duration;

                if (timeFraction > 1) timeFraction = 1;

                const progress = timing(timeFraction);

                draw(progress);

                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }

            });
        }

        calcBlock.addEventListener('change', event => {
            const target = event.target;

            if (target === calcType || target === calcSquare ||
                target === calcDay || target === calcCount) {
                countSum();
            }
        });
    };

    calc(100);

    // Send-Ajax-form

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так',
            succesMessage = 'Спасибо, мы скоро с вами свяжемся!';

        const form1 = document.getElementById('form1'),
            form2 = document.getElementById('form2'),
            form3 = document.getElementById('form3');

        const statusMessage = document.createElement('div');
        const circle = document.createElement('div');
        circle.classList.add('circle');
        statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

        const createRequest = (form) => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                form.appendChild(statusMessage);
                form.appendChild(circle);
                const formData = new FormData(form);
                let body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });

                postData(body, () => {
                    document.querySelector('.circle').remove();
                    statusMessage.textContent = succesMessage;
                    setTimeout(() => {
                        statusMessage.innerHTML = '';
                        document.querySelector('.popup').style.display = 'none';
                    }, 2000);
                    let formInputs = form.querySelectorAll('input');
                    formInputs.forEach(input => {
                        input.value = input.defaultValue;
                    });
                }, () => {
                    document.querySelector('.circle').remove();
                    statusMessage.textContent = errorMessage;
                    setTimeout(() => {
                        statusMessage.innerHTML = '';
                        document.querySelector('.popup').style.display = 'none';
                    }, 2000);
                    console.error(error);
                });
            });
        };

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };
        createRequest(form1);
        createRequest(form2);
        createRequest(form3);
    };

    sendForm();
});
