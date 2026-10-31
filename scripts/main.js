// Get current year
const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

// Get last modified date
document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;