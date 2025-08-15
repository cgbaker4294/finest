document.addEventListener('DOMContentLoaded', () => {
    // 1. Define constants or variables for game rules
    const BASE_HUMAN_ATTRIBUTE_SCORE = 1;

    // 2. Function to calculate attribute modifiers
    function calculateModifier(score) {
        // Modifier starts at 1 for a score of 1 and increases by 1 for every subsequent odd number.
        if (score < BASE_HUMAN_ATTRIBUTE_SCORE) return 0;
        if (score === BASE_HUMAN_ATTRIBUTE_SCORE) return 1;
        // For scores > 1, calculate based on the odd number increments
        return Math.floor((score + 1) / 2);
    }

    // Function to update derived stats
    function updateDerivedStats() {
        // Get current attribute scores and modifiers
        const brawnScore = parseInt(document.getElementById('brawn').value) || 0;
        const willpowerScore = parseInt(document.getElementById('willpower').value) || 0;
        const agilityScore = parseInt(document.getElementById('agility').value) || 0;
        const judgementScore = parseInt(document.getElementById('judgement').value) || 0;
        const comprehensionScore = parseInt(document.getElementById('comprehension').value) || 0;
        const presenceScore = parseInt(document.getElementById('presence').value) || 0;

        const brawnMod = calculateModifier(brawnScore);
        const willpowerMod = calculateModifier(willpowerScore);
        const agilityMod = calculateModifier(agilityScore);
        const judgementMod = calculateModifier(judgementScore);
        const comprehensionMod = calculateModifier(comprehensionScore);
        const presenceMod = calculateModifier(presenceScore);

        // Speed: Agility Score * 2
        const speed = agilityScore * 2;
        document.getElementById('speed').textContent = speed;

        // Action Points (AP): Agility Mod + Comprehension Mod
        const actionPoints = agilityMod + comprehensionMod;
        document.getElementById('action-points').textContent = actionPoints;

        // Max Focus: Comprehension Mod + Presence Mod + Willpower Mod
        const maxFocus = comprehensionMod + presenceMod + willpowerMod;
        document.getElementById('max-focus').textContent = maxFocus;

        // Awareness: Comprehension Mod + Judgement Mod + Presence Mod
        const awareness = comprehensionMod + judgementMod + presenceMod;
        document.getElementById('awareness').textContent = awareness;

        // Onomatopoeia Limit (OL): Comp Mod + Will Mod + Agi Mod
        const ol = comprehensionMod + willpowerMod + agilityMod;
        document.getElementById('ol').textContent = ol;

        // Max Hit Points (HP): Willpower Score
        const maxHp = willpowerScore;
        document.getElementById('max-hp').textContent = maxHp;

        // Power Level (PL): Sum of all attribute scores
        const powerLevel = brawnScore + willpowerScore + agilityScore + judgementScore + comprehensionScore + presenceScore;
        document.getElementById('power-level').textContent = powerLevel;
    }

    const attributeInputs = document.querySelectorAll('#attributes input[type="number"]');

    attributeInputs.forEach(input => {
        input.addEventListener('input', () => {
            const attribute = input.id;
            const score = parseInt(input.value) || 0;
            const modifier = calculateModifier(score);
            document.getElementById(`${attribute}-mod`).textContent = `Mod: ${modifier}`;
            updateDerivedStats();
        });
    });

    const addPowerBtn = document.getElementById('add-power-btn');
    const powersListContainer = document.getElementById('powers-list-container');
 
    if (openSidebarBtn) {
        openSidebarBtn.addEventListener('click', () => {
                overlay.classList.add('overlay-visible');
            } else {
                console.error('Sidebar or overlay element not found inside open button handler.');
            }
        });
    } else {
        console.error('Open sidebar button not found.');
    }


    const predefinedPowers = [
        { name: 'Super Strength', cost: 10, description: 'Grants incredible physical strength.' },
        { name: 'Flight', cost: 15, description: 'Allows the user to fly at high speeds.' },
        { name: 'Energy Blast', cost: 8, description: 'Fires bolts of concentrated energy.' },
        { name: 'Healing Factor', cost: 12, description: 'Rapidly regenerates from injuries.' }
    ];

    // Add null checks for power related elements
    if (addPowerBtn && powersListContainer && powerTemplate) {
        // Add power entry functionality
        addPowerBtn.addEventListener('click', () => {
            const powerNames = predefinedPowers.map(power => power.name).join(', ');
            const chosenPowerName = prompt(`Enter the name of the power to add:\n\nAvailable Powers: ${powerNames}`);

            if (chosenPowerName) {
                const selectedPower = predefinedPowers.find(power => power.name.toLowerCase() === chosenPowerName.trim().toLowerCase());

                if (selectedPower) {
                    const powerEntry = powerTemplate.content.cloneNode(true);
                    powerEntry.querySelector('.power-name').value = selectedPower.name;
                    powerEntry.querySelector('.power-cost').value = selectedPower.cost;
                    powerEntry.querySelector('.power-description').value = selectedPower.description;
                    powersListContainer.appendChild(powerEntry);
                } else {
                    alert(`Power "${chosenPowerName}" not found.`);
                }
            }
        });
    } else {
        console.error('Power related elements not found (addPowerBtn, powersListContainer, or powerTemplate).');
    }

    // Add null check for overlay
    if (overlay) {
        overlay.addEventListener('click', closeSidebar); // Use the closeSidebar function
    } else {
        console.error('Overlay element not found.');
    }