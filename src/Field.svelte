<script>
    import {debouncer} from "./debounce";
    import {tweened} from "svelte/motion";
    import {float} from "./magic.js";
    import {expoOut} from "svelte/easing";
    import {round} from "./magic";

    export let input_value;
    export let calculated_value;
    export let name;
    export let grouped = false;

    let _input_value = input_value;


    const debounce = debouncer(200);

    $: {
        debounce(_ => {
            input_value = _input_value;
        });
    }

    let animated = tweened(0, {
        duration: 1000,
        easing: expoOut,
    });

    $: {
        animated.set(float(calculated_value));
    }
</script>

<style>
    div.grouped {
        display: inline-block;
    }

    input {
        color: darkred;
        max-width: 25vw;
    }
</style>

<div class:grouped={grouped}>
    <label for="{name}">{name}</label>
    <!---->
    <input id="{name}"
           type="number"
           bind:value={_input_value}
           placeholder="{round($animated, 2)}">
</div>