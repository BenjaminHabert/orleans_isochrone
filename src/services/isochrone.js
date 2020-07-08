export const parameterConfig = {
    possibleDays: [
        ['2020-07-02', 'Lundi - Vendredi'],
        ['2020-07-04', 'Samedi'],
        ['2020-07-05', 'Dimanche'],
    ],
    possibleHours: [
        ['08:00:00', '8h'],
        ['13:00:00', '13h'],
        ['17:00:00', '17h'],
        ['20:00:00', '20h'],
        ['23:00:00', '23h'],
    ],
    durations: [
        { minutes: 45, color: 'red' },
        { minutes: 30, color: 'yellow' },
        { minutes: 10, color: 'green' },
    ]
}


function getUrl(lat, lng, day, hour, durationSeconds) {
    const baseURL = "https://benjexperiments.tech/gtfs-isochrone/isochrone?";
    const durationParam = "duration=" + durationSeconds,
        posititionParam = "&lat=" + lat + "&lon=" + lng,
        timeParam = "&start=" + day + "T" + hour;

    const URL = baseURL + durationParam + posititionParam + timeParam;
    return URL;
}

export function getIsochrone(lat, lng, day, hour, durationSeconds, color) {
    const URL = getUrl(lat, lng, day, hour, durationSeconds);
    const fetchParams = { method: 'GET' }
    return fetch(URL, fetchParams).then(response => response.json()).then(data => {
        const geojson = data
        console.log(data)
        geojson.style = {
            'color': color
        }
        return geojson
    })
}

export function getIsochrones(lat, lng, day, hour) {
    const promises = parameterConfig.durations.map(duration => getIsochrone(lat, lng, day, hour, duration.minutes * 60, duration.color));

    return Promise.all(promises);
}