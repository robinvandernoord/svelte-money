<script>
    import Group from "./Group.svelte";
    import GroupReadonly from "./GroupReadonly.svelte";

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
    button {
        float: right;
    }
</style>

{#each values as value}
    <Group bind:values={value} />
    <hr />
{/each}

<button on:click={remove_value}>-</button>
<button on:click={add_value}>+</button>


{#if values.length > 1}
    <GroupReadonly values={sum} />
{/if}