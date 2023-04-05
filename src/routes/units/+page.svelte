<script lang="ts">
    import DataTable from "../../lib/data-table.svelte";

    export let data;
</script>

<DataTable rows={data.units} headers={["Unit", "Level", "Class", "HP", "Str", "Mag", "Dex", "Spd", "Def", "Res", "Lck", "Bld", "Mov"]} />