let userAllergies = [];

const allergyTagsContainer = document.getElementById("allergyTags");
const ingredientsInput = document.getElementById("ingredientsInput");

function renderTags() {
    allergyTagsContainer.innerHTML = "";
    userAllergies.forEach((allergen, index) => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.innerHTML = `${allergen} <i class="fas fa-times"></i>`;
        tag.addEventListener("click", () => {
            userAllergies.splice(index, 1);
            renderTags();
        });
        allergyTagsContainer.appendChild(tag);
    });
}

document.getElementById("addAllergyBtn").addEventListener("click", () => {
    const input = document.getElementById("newAllergyInput");
    const newAllergen = input.value.trim().toLowerCase();

    if (newAllergen && !userAllergies.includes(newAllergen)) {
        userAllergies.push(newAllergen);
        renderTags();
        input.value = "";
    }
});

document.getElementById("scanBtn").addEventListener("click", () => {
    const ingredients = ingredientsInput.value.toLowerCase();
    const resultsBox = document.getElementById("resultsBox");
    const allergyResults = document.getElementById("allergyResults");
    const resultsHeader = document.getElementById("resultsHeader");

    allergyResults.innerHTML = "";

    const detectedAllergens = userAllergies.filter(allergen =>
        ingredients.includes(allergen)
    );

    if (detectedAllergens.length > 0) {
        resultsBox.className = "results-box warning-box";
        resultsHeader.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Allergy Alert!';
        allergyResults.innerHTML = `
      <p>🚫 <strong>This food contains allergens. Consumption is not safe.</strong></p>
      <p><strong>Safety Measures:</strong></p>
      <ul>
        <li>🛑 Avoid consuming the product.</li>
        <li>📞 Consult a doctor immediately if already consumed.</li>
        <li>💊 Carry an epinephrine auto-injector if prescribed.</li>
      </ul>
    `;
    } else {
        resultsBox.className = "results-box safe-box";
        resultsHeader.innerHTML = '<i class="fas fa-check-circle"></i> No Allergens Found!';
        allergyResults.innerHTML = "<p>✅ Safe to eat! 🎉</p>";
    }

    resultsBox.classList.remove("hidden");
});

renderTags();
