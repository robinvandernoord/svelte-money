<script>
    import {magic, nerdamer} from './magic';
    import Field from "./Field.svelte";
    import Center from "./Center.svelte";
    // import {spring} from "svelte/motion";


    export let values;

    let feedback = '';
    let rules = [];

    rules.push(`{dag} = {uur} * {uren_per_dag}`);
    rules.push(`{uren_per_week} = {uren_per_dag} * {dagen_per_week}`);
    rules.push(`{week} = {dag} * {dagen_per_week}`);

    // 174 uur ~= avg fulltime maand ; uren_per_week / 40 * 174 = part time maand
    rules.push(`{maand} = {uur} * (174 / 40 * {uren_per_week})`);
    // rules.push(`{naive_maand} = {week} * 4`)
    rules.push(`{jaar} = {maand} * 12`); // 12 maanden jwz

    let _uur, _dag, _week, _maand, _jaar, _uren_per_dag, _dagen_per_week, _uren_per_week;

    let {uur, dag, week, maand, jaar, uren_per_dag, dagen_per_week, uren_per_week} = values;

    $: { // update on each var change
        let args = {
            uren_per_dag,
            dagen_per_week,
            uren_per_week,

            uur,
            dag,
            week,
            maand,
            jaar,
        };
        try {
            feedback = 'calculating...';
            magic(args, rules);

            _uur = args.uur;
            _dag = args.dag;
            _week = args.week;
            _maand = args.maand;
            _jaar = args.jaar;

            values = args;

            _uren_per_dag = args.uren_per_dag;
            _uren_per_week = args.uren_per_week;
            _dagen_per_week = args.dagen_per_week;

            feedback = '';
        } catch (e) {
            feedback = e;
        }

    }

</script>

<style>
    p {
        color: darkred;
    }

</style>

<Center>
    <Field grouped="1" bind:input_value={uren_per_dag} bind:calculated_value={_uren_per_dag} name="Uur per dag" />
    <Field grouped="1" bind:input_value={uren_per_week} bind:calculated_value={_uren_per_week} name="Uur per week" />
    <Field grouped="1" bind:input_value={dagen_per_week} bind:calculated_value={_dagen_per_week}
           name="Dagen per week" />

    <br />

    <Field grouped="1" bind:input_value={uur} bind:calculated_value={_uur} name="Per Uur" />
    <!--<Field bind:input_value={dag} bind:calculated_value={_dag} name="Per Dag" />-->
    <!--<Field bind:input_value={week} bind:calculated_value={_week} name="Per Week" />-->
    <Field grouped="1" bind:input_value={maand} bind:calculated_value={_maand} name="Per Maand" />
    <Field grouped="1" bind:input_value={jaar} bind:calculated_value={_jaar} name="Per Jaar" />
</Center>

<p>{feedback}</p>