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


function getUrl(lat, lng, day, hour, useBus, useTram, durationSeconds) {
    // const baseURL = "https://benjexperiments.tech/gtfs-isochrone/isochrone?";
    const baseURL = "http://localhost:9090/isochrone?"
    const durationParam = "duration=" + durationSeconds,
        posititionParam = "&lat=" + lat + "&lon=" + lng,
        timeParam = "&start=" + day + "T" + hour,
        transportationParameters = "&bus=" + useBus + "&tram=" + useTram;

    const URL = baseURL + durationParam + posititionParam + timeParam + transportationParameters;
    return URL;
}

export function getIsochrone(lat, lng, day, hour, useBus, useTram, durationSeconds, color) {
    const URL = getUrl(lat, lng, day, hour, useBus, useTram, durationSeconds);
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

export function getIsochrones(lat, lng, day, hour, useBus, useTram) {
    const promises = parameterConfig.durations.map(duration => getIsochrone(lat, lng, day, hour, useBus, useTram, duration.minutes * 60, duration.color));

    return Promise.all(promises);
}