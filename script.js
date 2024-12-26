// State management
let intervals = [{ minutes: '', speed: '' }];

// DOM Elements
const intervalsContainer = document.querySelector('.intervals-container');
const addIntervalBtn = document.getElementById('addIntervalBtn');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');
const totalDistanceSpan = document.getElementById('totalDistance');

// Initialize the first interval
renderIntervals();

// Event Listeners
addIntervalBtn.addEventListener('click', addInterval);
calculateBtn.addEventListener('click', calculateDistance);

// Functions
function createIntervalHTML(interval, index) {
    const intervalHTML = document.createElement('div');
    intervalHTML.className = 'interval-row';
    intervalHTML.innerHTML = `
        <span class="interval-number">${index + 1}.</span>
        <div class="input-group">
            <label class="input-label">Minutes</label>
            <input type="number" 
                   class="input-field" 
                   value="${interval.minutes}"
                   min="0"
                   step="0.1"
                   data-index="${index}"
                   data-field="minutes">
        </div>
        <div class="input-group">
            <label class="input-label">Speed (km/h)</label>
            <input type="number" 
                   class="input-field" 
                   value="${interval.speed}"
                   min="0"
                   step="0.1"
                   data-index="${index}"
                   data-field="speed">
        </div>
        ${intervals.length > 1 ? `
            <button class="btn-icon" data-index="${index}">
                <i class="ph ph-trash"></i>
            </button>
        ` : ''}
    `;

    // Add event listeners for inputs
    const inputs = intervalHTML.querySelectorAll('.input-field');
    inputs.forEach(input => {
        input.addEventListener('change', handleInputChange);
    });

    // Add event listener for delete button if it exists
    const deleteBtn = intervalHTML.querySelector('.btn-icon');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => removeInterval(index));
    }

    return intervalHTML;
}

function renderIntervals() {
    intervalsContainer.innerHTML = '';
    intervals.forEach((interval, index) => {
        intervalsContainer.appendChild(createIntervalHTML(interval, index));
    });
}

function addInterval() {
    intervals.push({ minutes: '', speed: '' });
    renderIntervals();
}

function removeInterval(index) {
    intervals = intervals.filter((_, i) => i !== index);
    renderIntervals();
}

function handleInputChange(event) {
    const { index, field } = event.target.dataset;
    const value = event.target.value;
    
    intervals[index] = {
        ...intervals[index],
        [field]: value
    };
}

function calculateDistance() {
    const distance = intervals.reduce((total, interval) => {
        const minutes = parseFloat(interval.minutes) || 0;
        const speed = parseFloat(interval.speed) || 0;
        return total + (speed / 60) * minutes;
    }, 0);

    totalDistanceSpan.textContent = distance.toFixed(2);
    resultDiv.classList.remove('hidden');
}