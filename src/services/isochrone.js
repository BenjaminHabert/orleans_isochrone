export function getIsochrone(lat, lng) {
    const baseURL = "http://localhost:8989/isochrone?";
    const mainParams = "type=json&locale=fr&pt.earliest_departure_time=2020-07-04T10%3A21%3A00.000Z&profile=pt&time_limit=1000&result=polygon&buckets=3";
    const markerParams = "&point=" + lat + "," + lng;

    const URL = baseURL + mainParams + markerParams;

    return fetch(URL).then(response => response.json())
}