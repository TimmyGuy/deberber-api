export const createEvent = (event) => {
    return fetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(event)
    }).then(response => response.json());
}
export const updateEvent = (event) => {
    return fetch('/api/events', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(event)
    }).then(response => response.json());
}
export const createActivity = (activity, event) => {
    activity = fetch('/api/activities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: activity.name,
            description: activity.description,
            price: parseInt(activity.price),
        })
    }).then(response => response.json());
    activity.then(activity => {
        fetch('/api/event_activities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({event: '\/api\/events\/' + event.id, activity: '\/api\/activities\/' + activity.id})
        }).then(response => response.json());
    })
}
export const headers = [
    {field: 'name', name: 'Naam'},
    {field: 'description', name: 'Omschrijving'},
    {field: 'price', name: 'Prijs'}
];
export async function getFromApi(uri) {
    return fetch(uri, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => data);
}