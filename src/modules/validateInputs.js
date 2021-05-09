    const validateInputs = () => {
        const calcInputs = document.querySelectorAll('input.calc-item'),
            formName = document.querySelectorAll('[name=user_name]'),
            formMessage = document.querySelectorAll('[name=user_message]'),
            formEmail = document.querySelectorAll('[name=user_email]'),
            formPhone = document.querySelectorAll('[name=user_phone]');

        const error = new Set();

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
                e.target.value = e.target.value.replace(/[^a-z0-9\@\_\-\.\!\~\*\']/gi, '');
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
                controlInputs(el, /[^а-яё0-9\.\,\:\-\!\? ]{10,}/gi);
                el.value = capitalize(el);
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
    
export default validateInputs;