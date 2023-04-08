<script lang="ts">
    import UnitBuilder from "$lib/unit-builder.svelte";

    export let data;

    let { units, classes } = data;

    let activeUnits: any[] = [];
    let nextId = 1;

    function addUnit(unitIndex: number) {
        activeUnits = [ {id: nextId++, ...units[unitIndex]}, ...activeUnits ];
    }
    function removeUnit(unitId: number) {
        activeUnits = activeUnits.filter(unit => unitId !== unit.id);
    }
</script>

<content>
    <aside>
        <ul>
            {#each units as unit, i}
                <li>
                    <button on:click={() => addUnit(i)}>{unit.name}</button>
                </li>
            {/each}
        </ul>
    </aside>


    <section>
        {#each activeUnits as unit (unit.id)}
            <UnitBuilder unit={unit} classes={classes} on:close={() => removeUnit(unit.id)}/>
        {/each}
    </section>
</content>

<style>
    content {
        display: flex;
    }
    aside {
        flex-grow: 0;
    }
    section {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0 4px;
    }
    aside button {
        min-width: 150px;
        text-align: left;
        margin-bottom: 8px;
    }
</style>