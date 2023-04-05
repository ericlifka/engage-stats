<script lang="ts">
    import DataTable from "$lib/data-table.svelte";

    export let data;

    let headers = ["Unit", "Level", "Class", "HP", "Str", "Mag", "Dex", "Spd", "Def", "Res", "Lck", "Bld"];
    let showGrowths = false;

    $: slice = data.units.map(({name, lvl, startingClass, bases, growths}) => [name, lvl, startingClass, ...(showGrowths ? growths : bases)]);
</script>

<div>
    <button on:click={() => showGrowths = false} class={showGrowths ? '' : 'active'}>Bases</button>
    <button on:click={() => showGrowths = true} class={showGrowths ? 'active' : ''}>Growths</button>
</div>

<DataTable rows={slice} headers={headers} />