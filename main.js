document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    // 2. Function to calculate attribute modifiers
    function calculateModifier(score) {
        if (score < 1) return 0;
        // For scores >= 1, the modifier increases by 1 for every odd number reached (1, 3, 5, ...)
        // The pattern is (score + 1) / 2, rounded down.
        return Math.floor((score + 1) / 2);
    }

    const attributeInputs = document.querySelectorAll('#attributes input[type="number"]');

    function updateActionPoints() {
 const agilityScore = parseInt(document.getElementById('agility').value, 10) || 0;
 const comprehensionScore = parseInt(document.getElementById('comprehension').value, 10) || 0;
 const actionPointsElement = document.getElementById('action-points-value');
 if (actionPointsElement) {
 const actionPoints = calculateModifier(agilityScore) + calculateModifier(comprehensionScore);
 actionPointsElement.textContent = actionPoints;
        }
    }

    function updateFocusPoints() {
        const comprehensionScore = parseInt(document.getElementById('comprehension').value, 10) || 0;
        const presenceScore = parseInt(document.getElementById('presence').value, 10) || 0;
        const willpowerScore = parseInt(document.getElementById('willpower').value, 10) || 0;
        const focusPointsElement = document.getElementById('focus-points-value');
        if (focusPointsElement) {
 const focusPoints = calculateModifier(comprehensionScore) + calculateModifier(presenceScore) + calculateModifier(willpowerScore);
 focusPointsElement.textContent = focusPoints;
        }
    }

    function updateAwarenessScore() {
        const comprehensionScore = parseInt(document.getElementById('comprehension').value, 10) || 0;
        const judgementScore = parseInt(document.getElementById('judgement').value, 10) || 0;
        const presenceScore = parseInt(document.getElementById('presence').value, 10) || 0;
        const awarenessScoreElement = document.getElementById('awareness-score-value');
        if (awarenessScoreElement) {
 const awarenessScore = calculateModifier(comprehensionScore) + calculateModifier(judgementScore) + calculateModifier(presenceScore);
 awarenessScoreElement.textContent = awarenessScore;
        }
    }

    function updateOnomatopoeiaLimit() {
        const comprehensionScore = parseInt(document.getElementById('comprehension').value, 10) || 0;
        const willpowerScore = parseInt(document.getElementById('willpower').value, 10) || 0;
        const agilityScore = parseInt(document.getElementById('agility').value, 10) || 0; // Make sure this is defined
        const onomatopoeiaLimitElement = document.getElementById('onomatopoeia-limit-value');
        if (onomatopoeiaLimitElement) {
 const onomatopoeiaLimit = calculateModifier(comprehensionScore) + calculateModifier(willpowerScore) + calculateModifier(agilityScore);
 onomatopoeiaLimitElement.textContent = onomatopoeiaLimit;
        }
    }

    function updatePowerLevel() {
        let totalAttributeScore = 0;
        attributeInputs.forEach(input => {
 const value = parseInt(input.value, 10);
 if (!isNaN(value)) {
 totalAttributeScore += value;
            }
        });
        const powerLevelElement = document.getElementById('power-level-value');
        if (powerLevelElement) {
            powerLevelElement.textContent = totalAttributeScore;
        }
    }

    attributeInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const inputElement = event.target; // Access target from the event object
            const attribute = inputElement.id;
            const score = parseInt(inputElement.value, 10) || 0; // Specify radix 10 for parseInt
            const modifier = calculateModifier(score);

            // Update individual attribute modifier
            const modifierElement = document.getElementById(`${attribute}-mod`);
            if (modifierElement) {
 modifierElement.textContent = `Mod: ${modifier}`;
            }

            // Calculate and update Success Requirement for the current attribute
            const successRequirement = modifier * 3;
            const successRequirementElement = document.getElementById(`${attribute}-success`);
            console.log(`Updating ${attribute}-success with: ${successRequirement}`); // Added for debugging
            if (successRequirementElement) {
 successRequirementElement.textContent = successRequirement;
            }

            // Speed calculation
            if (attribute === 'agility') {
                const speed = score * 2;
                const speedElement = document.getElementById('speed-value');
                if (speedElement) {
                    speedElement.textContent = speed;
                }
            }

            // Max Hit Points calculation (based on Willpower)
            if (attribute === 'willpower') {
                const maxHpElement = document.getElementById('max-hp-value');
                if (maxHpElement) {
 maxHpElement.textContent = score;
                }
            }

            // Recalculate all derived stats that depend on any attribute change
            updateActionPoints();
            updateFocusPoints();
            updateAwarenessScore();
            updateOnomatopoeiaLimit();
            updatePowerLevel();
        });
    });

    // Initial calculation on page load
    updatePowerLevel();
});

