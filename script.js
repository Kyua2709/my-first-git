document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".practice-checkbox");
    const summary = document.getElementById("summary");
    const reward = document.getElementById("reward");
    const successThreshold = 12; // Minimum number of practices to unlock reward

    // Function to check progress
    function checkProgress() {
        const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

        // Update summary with progress
        summary.innerHTML = `<p>You have completed ${checkedCount} out of 15 best practices.</p>`;

        // Check if user meets the success threshold
        if (checkedCount >= successThreshold) {
            fetchAnimalImage();
        }
    }

    // Function to fetch a random animal image
    function fetchAnimalImage() {
        const apiUrl = "https://zoo-animal-api.herokuapp.com/animals/rand"; // Public API for random animal

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Display the animal image and name as a reward
                reward.innerHTML = `
                    <h2>Congratulations! Here's your reward:</h2>
                    <img src="${data.image_link}" alt="${data.name}" style="max-width: 100%; height: auto;">
                    <p><strong>${data.name}</strong>: ${data.habitat}</p>
                `;
            })
            .catch(error => {
                console.error("Error fetching animal image:", error);
                reward.innerHTML = `<p>Sorry, we couldn't fetch your reward. Please try again later.</p>`;
            });
    }

    // Add event listeners to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", checkProgress);
    });

    // Initial check on page load
    checkProgress();
});