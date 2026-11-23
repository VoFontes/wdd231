const params = new URLSearchParams(window.location.search);

const fields = [
    ["First Name", "firstName"],
    ["Last Name", "lastName"],
    ["Organizational Title", "organizationTitle"],
    ["Email", "email"],
    ["Mobile Phone", "phone"],
    ["Business Name", "organization"],
    ["Membership Level", "membership"],
    ["Business Description", "description"],
    ["Submitted At", "timestamp"]
];

const container = document.querySelector("#application-details");

fields.forEach(([label, name]) => {
    const value = params.get(name);

    if (value) {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${label}: ${value}`;
        container.appendChild(paragraph);
    }
});