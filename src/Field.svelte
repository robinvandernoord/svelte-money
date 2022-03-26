<script>
    import {debouncer} from "./debounce";

    export let input_value;
    export let calculated_value;
    export let name;
    export let grouped = false;

    let _input_value = input_value;


    const debounce = debouncer(250);

    $: {
        debounce(_ => {
            input_value = _input_value;
        });
    }
</script>

<style>
    div.grouped {
        display: inline-block;
    }
    input {
        color: darkred;
    }
</style>

<div class:grouped={grouped}>
    <label for="{name}">{name}</label>
    <!---->
    <input id="{name}"
           bind:value={_input_value}
           placeholder="{calculated_value}">
</div>