<script>
    import Group from "./Group.svelte";
    import GroupReadonly from "./GroupReadonly.svelte";
    import Center from "./Center.svelte";
    import Logo from "./Logo.svelte";

    function generate_defaults() {
        // initial:
        return {
            uren_per_dag: 8,
            dagen_per_week: 5,
            uur: 15,
        };
    }

    let values = [generate_defaults()];
    let sum = {};

    function add_value() {
        values = [...values, generate_defaults()];
    }

    function remove_value() {
        // removing specific index didn't work, so we just remove the last one now:
        values.pop();
        values = values;
    }

    const gemiddeld = ['uren_per_dag', 'uur'];
    $: {
        const _sum = {};

        for (let val of values) {
            for (let [key, value] of Object.entries(val)) {
                _sum[key] = (_sum[key] || 0) + value;
            }
        }

        for (let key of gemiddeld) {
            _sum[key] = _sum[key] / values.length;
        }

        sum = _sum;
    }

</script>

<style>

    @media (max-width: 825px) {
        .buttons {
            width: max-content;
            margin: auto;
            margin-bottom: 25px;
        }
    }

    @media (min-width: 825px) {
        .buttons {
            float: right;
        }
    }

    :global(body) {
        background: url('https://trialandsuccess.nl/TaS/static/images/banner.png');
        background-size: cover;
        backdrop-filter: brightness(0.75);
    }

    hr {
        border: 1px dashed white;
        border-top-width: 0;
    }

    button {
        width: 40px;
        height: 40px;
        border-radius: 180px;
        margin: 5px;
    }
</style>

<Logo />

<div class="buttons">
    <button on:click={remove_value}>-</button>
    <button on:click={add_value}>+</button>
</div>

<div>
    {#each values as value}
        <div>
            <Group bind:values={value} />
            <hr />
        </div>
    {/each}
</div>


{#if values.length > 1}
    <GroupReadonly values={sum} />
{/if}