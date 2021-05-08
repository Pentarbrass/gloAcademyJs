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
    
export default animateScroll;