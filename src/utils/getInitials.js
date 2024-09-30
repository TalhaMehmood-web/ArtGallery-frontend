function getInitials(fullName) {
    // Trim any extra spaces and split the name into parts based on spaces
    const nameParts = fullName.trim().split(" ");

    // If there's only one part (single name), return the first capitalized letter
    if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
    }

    // If there are multiple parts, return the first letter of the first two parts
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const secondInitial = nameParts[1].charAt(0).toUpperCase();

    // Return the initials combined (e.g., "TM")
    return `${firstInitial}${secondInitial}`;
}
export default getInitials;