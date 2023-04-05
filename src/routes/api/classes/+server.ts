import { json } from '@sveltejs/kit';
import { CLASS_GROWTHS_RAW, CLASS_STATS_RAW } from '../raw-data';

export function GET() {
    let data = Object.keys(CLASS_STATS_RAW).map(className => ({
        className, 
        stats: CLASS_STATS_RAW[className],
        growths: CLASS_GROWTHS_RAW[className],
    }));

    return json(data);
}