export default {
    componentUpdated: (el, binding) => {

        if (binding.value) {

            const
                tooltip = document.createElement('span'),
                sizes = { height: el.offsetHeight, width: el.offsetWidth };

            let
                offsetTop = 0,
                offsetLeft = 0;

            el.style.position = 'relative';
            el.style.overflow = 'hidden';
            tooltip.classList.add('tooltip');
            tooltip.innerText = binding.value;
            el.appendChild(tooltip);

            if (binding.modifiers.top) {
                tooltip.classList.add('top');

                offsetTop = -tooltip.offsetHeight - 10;
                offsetLeft = (sizes.width - tooltip.offsetWidth) / 2;
            };
            if (binding.modifiers.right) {
                tooltip.classList.add('right');

                offsetTop = (sizes.height - tooltip.offsetHeight) / 2;
                offsetLeft = sizes.width + 10;
            };
            if (binding.modifiers.bottom) {
                tooltip.classList.add('bottom');

                offsetTop = sizes.height + 10;
                offsetLeft = (sizes.width - tooltip.offsetWidth) / 2;
            };

            if (binding.modifiers.left) {
                tooltip.classList.add('left');

                offsetTop = (sizes.height - tooltip.offsetHeight) / 2;
                offsetLeft = -tooltip.offsetWidth - 10;
            };

            tooltip.style.top = offsetTop + 'px';
            tooltip.style.left = offsetLeft + 'px';

            el.onmouseenter = (event) => {
                event.target.style.overflow = 'visible';
                tooltip.classList.add('active');
            }
            el.onmouseleave = (event) => {
                event.target.style.overflow = 'hidden';
                tooltip.classList.remove('active');
            }

        }

    }
}
