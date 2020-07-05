export const parameterConfig = {
    possibleDays: [
        ['2020-07-02', 'Lundi - Vendredi'],
        ['2020-07-04', 'Samedi'],
        ['2020-07-05', 'Dimanche'],
    ],
    possibleHours: [
        ['06%3A00%3A00.000Z', '8h'],
        ['11%3A00%3A00.000Z', '13h'],
        ['15%3A00%3A00.000Z', '17h'],
        ['18%3A00%3A00.000Z', '20h'],
        ['21%3A00%3A00.000Z', '23h'],
    ]
}


function getUrl(lat, lng, day, hour, durationSeconds) {
    const baseURL = "http://localhost:8989/isochrone?";
    const mainParams = "type=json&locale=fr&profile=pt&result=polygon&buckets=1",
        durationParam = "&time_limit=" + durationSeconds,
        posititionParam = "&point=" + lat + "," + lng,
        timeParam = "&pt.earliest_departure_time=" + day + "T" + hour;

    const URL = baseURL + mainParams + durationParam + posititionParam + timeParam;
    return URL;
}

export function getIsochrone(lat, lng, day, hour, durationSeconds) {
    const URL = getUrl(lat, lng, day, hour, durationSeconds)
    return fetch(URL).then(response => response.json()).then(data => data.polygons)
}

export function getIsochrones(lat, lng, day, hour) {
    const durations = [10 * 60, 30 * 60, 45 * 60],
        promises = durations.map(duration => getIsochrone(lat, lng, day, hour, duration));

    return Promise.all(promises);
}