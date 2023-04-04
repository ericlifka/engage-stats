export async function load({ fetch }) {
  let req = await fetch('/api/units');
  let units = await req.json();

  return { units };
}