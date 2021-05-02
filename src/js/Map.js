export async function getGeolocation() {
  const url = 'https://ipinfo.io/json?token=2169dc342a9619';
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export function showGeolocation(loc) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidGFuYW5pY2giLCJhIjoiY2thcjZqYWFkMDRkZTJycWQ3aG12ZnVhOCJ9.wfqMffqySQd_OesKy275eA';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: loc,
    zoom: 10,
  });
}
