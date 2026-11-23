// MEMBERSHIP MODALS

// Get all Learn More buttons
const learnMoreButtons = document.querySelectorAll(".learn-more");

// Open the corresponding modal
learnMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }
    });
});

// Close modal buttons
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});

// Set timestamp when the form page loads
const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}