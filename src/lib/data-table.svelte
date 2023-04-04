<script>
    export let rows;
    export let headers;

    let sortColumn = -1;
    let sortReverse = false;

    function changeSort(column) {
        if (sortColumn === column) {
            sortReverse = !sortReverse;
        } else {
            sortColumn = column;
            sortReverse = false;
        }
    }

    $: sorter = typeof rows[0][sortColumn] == "string"
        ? (a, b) => a.localeCompare(b)
        : (a, b) => a - b;

    $: sortedRows = [...rows].sort((a, b) => sortReverse ? sorter(b[sortColumn], a[sortColumn]) : sorter(a[sortColumn], b[sortColumn]));
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