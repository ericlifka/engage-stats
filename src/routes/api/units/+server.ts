import { subtract } from '$lib/array-math';
import { json } from '@sveltejs/kit';
import { CLASS_STATS_RAW, UNITS_GROWTHS_RAW, UNITS_RAW } from '../raw-data';

export function GET() {
    let units = UNITS_RAW.map(([name, lvl, startingClass, ...stats]) => ({
        name, lvl, startingClass, 
        bases: subtract(stats, CLASS_STATS_RAW[startingClass]),
        growths: UNITS_GROWTHS_RAW[name]
    }));
    return json(units);
}