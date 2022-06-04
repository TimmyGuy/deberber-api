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
    return fetch('/api/events/' + event.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(event)
    }).then(response => response.json())
        .catch(error => console.log(error));
}
export const createActivity = (activity, event) => {
    fetch('/api/activities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: activity.name,
            description: activity.description,
            price: parseInt(activity.price),
            events: [
                '\/api\/events\/' + event.id
            ]
        })
    }).then(response => response.json());
}
export const headers = [
    {field: 'name', name: 'Naam'},
    {field: 'description', name: 'Omschrijving'},
    {field: 'price', name: 'Prijs'}
];
export function getFromApi(uri) {
    return fetch(uri, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json()
        })
}