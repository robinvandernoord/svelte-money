<script>
    import Field from "./Field.svelte";
    import Center from "./Center.svelte";

    export let values;

    $: {
        console.table(values);
    }

</script>

<Center>
    <h1>Totaal:</h1>
    <Field grouped="1" bind:calculated_value={values.uren_per_dag} name="Uur per dag" />
    <Field grouped="1" bind:calculated_value={values.uren_per_week} name="Uur per week" />
    <Field grouped="1" bind:calculated_value={values.dagen_per_week}
           name="Dagen per week" />

    <br />

    <Field grouped="1" bind:calculated_value={values.uur} name="Per Uur" />
    <Field grouped="1" bind:calculated_value={values.maand} name="Per Maand" />
    <Field grouped="1" bind:calculated_value={values.jaar} name="Per Jaar" />
</Center>