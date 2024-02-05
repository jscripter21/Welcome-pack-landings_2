class MouseParallax {

    constructor(container) {
        this.$container = container;
        this.targets = [];

        this.bindEvents()
    }

    addTarget($el, movement, options = {}) {
        this.targets.push({
            $el: $el,
            movement: movement,
            options: options
        })
    }

    reset() {
        for (let target of this.targets) {
            TweenMax.set(target.$el, { x: 0, y: 0 })
        }
        this.targets = [];
    }

    bindEvents() {
        this.$container.addEventListener('mousemove', this.tilt.bind(this))
    }

    tilt(e) {
        let relX = e.pageX - this.offset(this.$container).left;
        let relY = e.pageY - this.offset(this.$container).top;
        let width = parseInt(getComputedStyle(this.$container).width);

        for (let target of this.targets) {
            let x = (relX - width / 2) / width * target.movement;
            let y = (relY - width / 2) / width * target.movement;

            if (target.options.max) {
                x = x > target.options.max ? target.options.max : x;
                x = x < -target.options.max ? -target.options.max : x;
                y = y > target.options.max ? target.options.max : y;
                y = y < -target.options.max ? -target.options.max : y;
            }
            TweenMax.to(target.$el, 1, { x, y })
        }
    }

    offset(elt) {
        let rect = elt.getBoundingClientRect(),
            bodyElt = document.body;

        return {
            top: rect.top + bodyElt.scrollTop,
            left: rect.left + bodyElt.scrollLeft
        }
    }

}

document.addEventListener("DOMContentLoaded", () => {

    const $container = document.getElementById("container");
    const $circle = $container.querySelector('.circle');
    const $title = $container.querySelector('.title');

    const parallax = new MouseParallax($container);
    parallax.addTarget($circle, -100);
    parallax.addTarget($title, 100);
});