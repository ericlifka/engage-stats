
export function subtract(left: number[], right: number[]): number[] {
    return left.map((l, i) => l - right[i]);
}

export function add(left: number[], right: number[]): number[] {
    return left.map((l, i) => l + right[i]);
}