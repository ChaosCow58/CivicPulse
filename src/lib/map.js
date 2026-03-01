let lat = 0;
let lng = 0;

export function setLatLng(newLat, newLng) {
    lat = newLat;
    lng = newLng;
    console.log(`LatLng updated: ${lat}, ${lng}`);
}

export function getLatLng() {
    return { lat, lng };
}
