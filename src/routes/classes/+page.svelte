<script lang="ts">
    import DataTable from "../../lib/data-table.svelte";

    export let data;
</script>

<DataTable rows={data.classes} headers={["Name", "HP", "Str", "Mag", "Dex", "Spd", "Def", "Res", "Lck", "Bld", "Mov"]} />