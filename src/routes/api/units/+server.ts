import { json } from '@sveltejs/kit';
import { UNITS_RAW } from '../raw-data';

export function GET() {
    return json(UNITS_RAW);
}