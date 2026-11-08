// SELECT HTML ELEMENTS
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");


// FETCH MEMBERS DATA USING ASYNC/AWAIT
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);
        membersContainer.textContent = "Unable to load business directory.";
    }
}


// DISPLAY MEMBERS
function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}"
                 alt="${member.name} logo"
                 loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.description}</p>

            <p><strong>Address:</strong> ${member.address}</p>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <p>
                <strong>Membership:</strong>
                ${getMembership(member.membership)}
            </p>

            <a href="${member.website}"
               target="_blank"
               rel="noopener noreferrer">
               Visit Website
            </a>
        `;

        membersContainer.appendChild(card);
    });
}


// MEMBERSHIP LEVEL
function getMembership(level) {

    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
}


// GRID VIEW
gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("list-view");
    membersContainer.classList.add("grid-view");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    // ACCESSIBILITY: UPDATE ARIA PRESSED
    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");

});


// LIST VIEW
listButton.addEventListener("click", () => {

    membersContainer.classList.remove("grid-view");
    membersContainer.classList.add("list-view");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    // ACCESSIBILITY: UPDATE ARIA PRESSED
    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");

});


// MOBILE NAVIGATION
menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});


// FOOTER: CURRENT YEAR
document.querySelector("#current-year").textContent =
    new Date().getFullYear();


// FOOTER: LAST MODIFICATION
document.querySelector("#last-modified").textContent =
    document.lastModified;


// INITIALIZE DIRECTORY
getMembers();