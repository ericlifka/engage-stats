<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import DataTable from './data-table.svelte';

    export let unit;
    export let classes: any[];

    let { name, lvl, startingClass, bases, growths } = unit;
    let targetClass = startingClass;
    let targetLevel = lvl;
    let targetClassCap = 20;
    calcMax();
    
    function calcMax() {
        targetClassCap = targetClass == "Fell Child" || targetClass == "Thief" ? 40 : 20;
        if (targetLevel > targetClassCap) {
            targetLevel = targetClassCap;
        }
    }

	const dispatch = createEventDispatcher();
    function close() {
        dispatch('close');
    }

</script>

<div class="card">
    <div class="header">
        <span class="title">{name}</span>
        <button class="close" on:click={close}>X</button>
    </div>
    <div class="class-chooser">
        <span>{startingClass} lvl {lvl}</span>
        <span>⟶</span>
        <span>
            <select bind:value={targetClass} on:change={calcMax}>
                {#each classes as cls}
                    <option value={cls.className}>
                        {cls.className}
                    </option>
                {/each}
            </select>
        </span>
        <span>
            lvl 
            {#key targetClassCap}
                <input type="number" 
                    min=1 max={targetClassCap}
                    bind:value={targetLevel} 
                    on:change={() => console.log('target level changed')}/>
            {/key}
        </span>
    </div>
    <DataTable 
        disableSort={true}
        data={[["bases", ...bases], ["growths", ...growths]]} 
        headers={["", "HP", "Str", "Mag", "Dex", "Spd", "Def", "Res", "Lck", "Bld"]}/>
</div>

<style>
    .card {
        border: 1px solid #667;
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #667;
    }
    .title {
        font-size: 24px;
        line-height: 24px;
        padding: 0 16px;
    }
    .close {
        border-radius: 0;
        border: none;
        border-left: 1px solid #667;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 55px;
        height: 55px;
    }
    .class-chooser {
        padding: 24px 28px;
    }
    input[type=number] {
        max-width: 45px;
    }
</style>