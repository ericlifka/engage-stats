import { json } from '@sveltejs/kit';
import { CLASSES_RAW } from '../raw-data';

export function GET() {
    return json(CLASSES_RAW);
}