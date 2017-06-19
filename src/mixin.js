export default {
    methods: {
        focusToNext(elem) {
            if (!this.$refs[elem][0]) this.$refs[elem].$el.children[0].focus();
            else this.$refs[elem][0].$el.children[0].focus();
        },
        scrollDown(el, height) {
            let start = 0;

            const scr = setInterval(() => {
                start += 1;
                el.scrollTop += start;

                if (start > height) clearInterval(scr);

            }, 17);
        },
        round(num) {
             return Math.round((num * 100) / 100);
        }
    }
}
