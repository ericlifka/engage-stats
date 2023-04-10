<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import DataTable from './data-table.svelte';
    import { applyStarsphere, convertGrowthsToPercentage, addClassBases, calcClassPath, isExceptionClass, isPromotedClass, applyClassGrowths, gainLevels, applyClassGrowths2x } from './class-logic';

	const dispatch = createEventDispatcher();
    function close() {
        dispatch('close');
    }

    export let unit;
    export let classes: any[];

    let { name, lvl, startingClass, bases, growths } = unit;
    let targetClass = startingClass;
    let targetLevel = lvl;
    let targetClassMin = 1;
    let targetClassMax = 20;
    let useStarsphere = false;
    let promoteFirst = true;
    let simulationSummary = '';

    let startingGrowthsRow: any[];
    let startingStatsRow: any[];
    let finalClassGrowthsRow: any[];
    let finalStats: any[];
    let dataRows: any[][];

    function recalculate() {
        let startingClassGrowths = name == "Jean" ? applyClassGrowths2x(growths, startingClass) : applyClassGrowths(growths, startingClass);
        if (useStarsphere) {
            startingClassGrowths = applyStarsphere(startingClassGrowths);
        }
        startingGrowthsRow = [`${startingClass} growths`, ...startingClassGrowths];

        let finalClassGrowths = name == "Jean" ? applyClassGrowths2x(growths, targetClass) : applyClassGrowths(growths, targetClass);
        if (useStarsphere) {
            finalClassGrowths = applyStarsphere(finalClassGrowths);
        }
        finalClassGrowthsRow = [`${targetClass} growths`, ...finalClassGrowths];

        startingStatsRow = ["Starting stats", ...addClassBases(bases, startingClass)];

        if (targetClass == startingClass) {
            targetClassMin = lvl;
        } else if (isExceptionClass(targetClass) && 
                    (isPromotedClass(startingClass) || 
                     (isExceptionClass(startingClass) && lvl >= 21))) {
            targetClassMin = 21;
        } else {
            targetClassMin = 1;
        }

        targetClassMax = isExceptionClass(targetClass) ? 40 : 20;

        if (targetLevel < targetClassMin) {
            targetLevel = targetClassMin;
        }
        if (targetLevel > targetClassMax) {
            targetLevel = targetClassMax;
        }

        let classPath = calcClassPath(startingClass, lvl, targetClass, targetLevel, promoteFirst);
        simulationSummary = classPath.map(([cls, levels]) => `${cls} for ${levels} level${levels == 1 ? '' : 's'}`).join(' → ');
        
        let stats = gainLevels(bases, convertGrowthsToPercentage(growths), 1); // single implicit level at character growths in fixed growth mode
        classPath.forEach(([cls, levels]) => {
            let clsGrowths = name == "Jean" ? applyClassGrowths2x(growths, cls) : applyClassGrowths(growths, cls);
            if (useStarsphere) {
                clsGrowths = applyStarsphere(clsGrowths);
            }
            stats = gainLevels(stats, clsGrowths, levels);
        });
        stats = addClassBases(stats, targetClass);

        finalStats = [`Final stats`, ...stats];

        if (startingClass == targetClass) {
            dataRows = [startingGrowthsRow, startingStatsRow, finalStats];
        } else {
            dataRows = [startingGrowthsRow, finalClassGrowthsRow, startingStatsRow, finalStats];
        }
    }

    recalculate();
</script>

<div class="card">
    <div class="row header">
        <span class="title">{name}</span>
        <button class="close" on:click={close}>X</button>
    </div>
    <div class="row class-chooser">
        <div>
            <span>{startingClass} lvl {lvl}</span>
            <span>⟶</span>
            <span>
                <select bind:value={targetClass} on:change={recalculate}>
                    {#each classes as cls}
                        <option value={cls.className}>
                            {cls.className}
                        </option>
                    {/each}
                </select>
            </span>
            <span>
                lvl 
                {#key targetClass}
                    <input type="number" 
                        min={targetClassMin}
                        max={targetClassMax}
                        bind:value={targetLevel} 
                        on:change={recalculate} />
                {/key}
            </span>
        </div>
        <div>
            {simulationSummary}
        </div>
    </div>
    <div class="row options">
        <span>
            <label>
                <input type=checkbox bind:checked={useStarsphere} on:change={recalculate} />
                Starsphere
            </label>
            <label>
                <input type=checkbox bind:checked={promoteFirst} on:change={recalculate} />
                {#if promoteFirst}
                    Promote before reclassing
                {:else}
                    Reclass before promoting
                {/if}
            </label>
        </span>
    </div>
    {#key dataRows}
        <DataTable 
            disableSort={true}
            data={dataRows} 
            headers={["", "HP", "Str", "Mag", "Dex", "Spd", "Def", "Res", "Lck", "Bld"]} />
    {/key}
</div>

<style>
    .card {
        border: 1px solid #667;
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
    }
    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 28px;
    }
    .header {
        border-bottom: 1px solid #667;
        padding: 0;
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
    input[type=number] {
        max-width: 45px;
    }
    input[type=checkbox] {
        margin-left: 16px;
    }
    .options label:first-child input {
        margin-left: 0;
    }
    .options {
        padding-top: 0;
    }
</style>