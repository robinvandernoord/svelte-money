export function debouncer(duration) {
        let timer;

        function debounce(fn) {
            clearTimeout(timer);
            timer = setTimeout(fn, duration);
        }

        return debounce;
    }