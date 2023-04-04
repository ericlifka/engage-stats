<script lang="ts">
    type UnitData = (string|number)[];

    export let rows: UnitData[];
    export let headers: string[];

    let sortColumn = -1;
    let sortDirection = 1;

    function changeSort(column: number) {
        if (sortColumn === column) {
            sortDirection *= -1;
        } else {
            sortColumn = column;
            sortDirection = 1;
        }
    }

    function sorter<T>(a: T, b: T): number {
        if (typeof a === "string" && typeof b === "string") {
            return a.localeCompare(b);
        } else if (typeof a === "number" && typeof b === "number") {
            return a - b;
        } else {
            return 0;
        }
    }

    $: sortedRows = [...rows].sort((a: UnitData, b: UnitData) => sorter(a[sortColumn], b[sortColumn]) * sortDirection);
</script>

<table>
    <tr>
        {#each headers as header, i}
            <th>
                <button on:click={() => changeSort(i)}>{header}</button>
            </th>
        {/each}
    </tr>
    
    {#each sortedRows as row}
        <tr>
            {#each row as cell}
                <td>{cell}</td>
            {/each}
        </tr>
    {/each}
</table>

<style>
    th, td {
        border: 1px solid #667;
        padding: 8px;
        min-width: 52px;
    }
</style>