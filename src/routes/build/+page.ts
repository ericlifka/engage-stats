export async function load({ fetch }) {
    let unitReq = await fetch('/api/units');
    let units = await unitReq.json();

    let classReq = await fetch('/api/classes');
    let classes = await classReq.json();
  
    return { units, classes };
}