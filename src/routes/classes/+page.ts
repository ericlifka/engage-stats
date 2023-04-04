export async function load({ fetch }) {
    let req = await fetch('/api/classes');
    let classes = await req.json();
  
    return { classes };
}