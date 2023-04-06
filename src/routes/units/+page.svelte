<script lang="ts">
    import DataTable from "$lib/data-table.svelte";

    export let data;

    let headers = ["Unit", "Level", "Class", "HP", "Str", "Mag", "Dex", "Spd", "Def", "Res", "Lck", "Bld"];
    let showGrowths = false;

    let  stats = data.units.map(({name, lvl, startingClass, bases}) => [name, lvl, startingClass, ...bases]);
    let  growths = data.units.map(({name, lvl, startingClass, growths}) => [name, lvl, startingClass, ...growths]);
</script>

<div>
    <button on:click={() => showGrowths = false} class={showGrowths ? '' : 'active'}>Bases</button>
    <button on:click={() => showGrowths = true} class={showGrowths ? 'active' : ''}>Growths</button>
</div>

{#if showGrowths}
    <DataTable data={growths} headers={headers} />
{:else}
    <DataTable data={stats} headers={headers} />
{/if}
