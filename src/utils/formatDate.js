export function formatDate(dateString) {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short', // Example: 'Oct'
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true, // AM/PM format
    });

    return formattedDate;
}


