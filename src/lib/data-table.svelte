<script lang="ts">
    type UnitData = (string|number)[];

    export let data: UnitData[];
    export let headers: string[];
    export let disableSort: boolean;

    let sortColumn = -1;
    let sortDirection = -1;

    let firstRow = data[0];
    let columns = [...headers.map((name, i) => ({
        name,
        numeric: typeof firstRow[i] == "number",
        include: typeof firstRow[i] == "number"
    })), { name: 'Total', numeric: false, include: false }];

    $: rows = calcRows();
    $: sortedRows = [...rows].sort((a: UnitData, b: UnitData) => sorter(a[sortColumn], b[sortColumn]) * sortDirection);

    function calcRows() {
        return data.map( row => [...row, sumRow(row)]);
    }

    function sumRow(row: UnitData): number {
        return row.reduce((sum, val, i) => columns[i].include ? sum + val : sum, 0);
    }

    function changeInclude(i: number) {
        columns[i].include = !columns[i].include;
        rows = calcRows();
    }

    function changeSort(column: number) {
        if (sortColumn === column) {
            sortDirection *= -1;
        } else {
            sortColumn = column;
            sortDirection = -1;
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

    
</script>

<table>
    <tr>
        {#each columns as column, i}
            <th>
                <div>
                    {#if column.numeric}
                        <input type=checkbox checked={column.include} on:click={() => changeInclude(i)}>
                    {/if}
                    <span>{column.name}</span>
                    {#if !disableSort}
                        <button on:click={() => changeSort(i)} class={i == sortColumn ? 'active' : ''}>↕</button>
                    {/if}
                </div>
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
        min-width: 100px;
    }
    th div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    button {
        padding: 6px 4px;
        border-radius: 50px;
    }
    button.active {
        cursor: pointer;
    }
</style>