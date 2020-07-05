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
    ],
    durations: [
        { minutes: 45, color: 'red' },
        { minutes: 30, color: 'yellow' },
        { minutes: 10, color: 'green' },
    ]
}


function getUrl(lat, lng, day, hour, durationSeconds) {
    // const baseURL = "http://localhost:8989/isochrone?";
    const baseURL = "http://ec2-15-236-204-111.eu-west-3.compute.amazonaws.com:8989/isochrone?";
    const mainParams = "type=json&locale=fr&profile=pt&result=polygon&buckets=1",
        durationParam = "&time_limit=" + durationSeconds,
        posititionParam = "&point=" + lat + "," + lng,
        timeParam = "&pt.earliest_departure_time=" + day + "T" + hour;

    const URL = baseURL + mainParams + durationParam + posititionParam + timeParam;
    return URL;
}

export function getIsochrone(lat, lng, day, hour, durationSeconds, color) {
    const URL = getUrl(lat, lng, day, hour, durationSeconds)
    return fetch(URL).then(response => response.json()).then(data => {
        const geojson = data.polygons
        geojson.style = {
            'color': color,
            // "fill": "red",
            // "stroke-width": 3,
            // "fill-opacity": 0.6
        }
        return geojson
    })
}

export function getIsochrones(lat, lng, day, hour) {
    const promises = parameterConfig.durations.map(duration => getIsochrone(lat, lng, day, hour, duration.minutes * 60, duration.color));

    return Promise.all(promises);
}