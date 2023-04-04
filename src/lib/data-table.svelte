<script>
    export let rows;
    export let headers;
</script>

<table>
    <tr>
        {#each headers as header}
            <th>{header}</th>
        {/each}
    </tr>
    
    {#each rows as row}
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