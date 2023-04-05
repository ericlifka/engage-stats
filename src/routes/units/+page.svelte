<script lang="ts">
    import DataTable from "$lib/data-table.svelte";

    export let data;

    let headers = ["Unit", "Level", "Class", "HP", "Str", "Mag", "Dex", "Spd", "Def", "Res", "Lck", "Bld", "Mov"];
    let showGrowths = false;

    $: slice = data.units.map(({name, lvl, startingClass, bases, growths}) => [name, lvl, startingClass, ...(showGrowths ? growths : bases)]);
</script>

<div>
    <button on:click={() => showGrowths = true} class={showGrowths ? 'active' : ''}>Growths</button>
    <button on:click={() => showGrowths = false} class={showGrowths ? '' : 'active'}>Bases</button>
</div>

<DataTable rows={slice} headers={showGrowths ? headers.slice(0, -1) : headers} />