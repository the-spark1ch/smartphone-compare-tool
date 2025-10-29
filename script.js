// script.js
const phones = [
    {
        name: "iPhone 15",
        specs: {
            antutu: 1500000,      // AnTuTu score (higher better)
            battery: 20,          // Battery life in hours (higher better)
            weight: 171,          // Weight in grams (lower better)
            zoom: 2,              // Camera zoom factor (higher better)
            refresh: 60           // Display refresh rate in Hz (higher better)
        }
    },
    {
        name: "Samsung Galaxy S23",
        specs: {
            antutu: 1200000,      // AnTuTu score (higher better)
            battery: 18,          // Battery life in hours (higher better)
            weight: 168,          // Weight in grams (lower better)
            zoom: 3,              // Camera zoom factor (higher better)
            refresh: 120          // Display refresh rate in Hz (higher better)
        }
    },
    {
        name: "Google Pixel 8",
        specs: {
            antutu: 1148000,      // AnTuTu score (higher better)
            battery: 18,          // Battery life in hours (higher better)
            weight: 187,          // Weight in grams (lower better)
            zoom: 2,              // Camera zoom factor (higher better)
            refresh: 120          // Display refresh rate in Hz (higher better)
        }
    },
    {
        name: "OnePlus 12",
        specs: {
            antutu: 2100000,      // AnTuTu score (higher better)
            battery: 22,          // Battery life in hours (higher better)
            weight: 220,          // Weight in grams (lower better)
            zoom: 3,              // Camera zoom factor (higher better)
            refresh: 120          // Display refresh rate in Hz (higher better)
        }
    },
    {
        name: "Xiaomi 14",
        specs: {
            antutu: 2000000,      // AnTuTu score (higher better)
            battery: 20,          // Battery life in hours (higher better)
            weight: 193,          // Weight in grams (lower better)
            zoom: 3,              // Camera zoom factor (higher better)
            refresh: 120          // Display refresh rate in Hz (higher better)
        }
    },
    {
        name: "iPhone 16 Pro",
        specs: {
            antutu: 2056260,      // AnTuTu score (higher better)
            battery: 28,          // Battery life in hours (higher better)
            weight: 199,          // Weight in grams (lower better)
            zoom: 5,              // Camera zoom factor (higher better)
            refresh: 120          // Display refresh rate in Hz (higher better)
        }
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        specs: {
            antutu: 1918239,      // AnTuTu score (higher better)
            battery: 26,          // Battery life in hours (higher better)
            weight: 232,          // Weight in grams (lower better)
            zoom: 5,              // Camera zoom factor (higher better)
            refresh: 120          // Display refresh rate in Hz (higher better)
        }
    },
    {
        name: "Google Pixel 9 Pro",
        specs: {
            antutu: 1125355,      // AnTuTu score (higher better)
            battery: 22,          // Battery life in hours (higher better)
            weight: 199,          // Weight in grams (lower better)
            zoom: 5,              // Camera zoom factor (higher better)
            refresh: 120          // Display refresh rate in Hz (higher better)
        }
    },
    {
        name: "Nothing Phone (2)",
        specs: {
            antutu: 1200612,      // AnTuTu score (higher better)
            battery: 23,          // Battery life in hours (higher better)
            weight: 201,          // Weight in grams (lower better)
            zoom: 2,              // Camera zoom factor (higher better)
            refresh: 120          // Display refresh rate in Hz (higher better)
        }
    },
    {
        name: "Motorola Edge 50 Pro",
        specs: {
            antutu: 807658,      // AnTuTu score (higher better)
            battery: 23,          // Battery life in hours (higher better)
            weight: 186,          // Weight in grams (lower better)
            zoom: 3,              // Camera zoom factor (higher better)
            refresh: 144          // Display refresh rate in Hz (higher better)
        }
    }
    // Add more phones here in the future with the same spec structure
];

const specTypes = {
    antutu: 'higher',
    battery: 'higher',
    weight: 'lower',
    zoom: 'higher',
    refresh: 'higher'
    // Add more specs and their types as needed
};

const perSpecBetter = 18;  // Even, not round (changed from 20)
const perSpecWorse = 8;    // Even, not round (changed from 10)
const perSpecEqual = 13;   // Average, though odd to keep balance

// Populate dropdowns with available phones
function populateSelects() {
    const options = phones.map(phone => `<option value="${phone.name}">${phone.name}</option>`).join('');
    document.getElementById('phone1').innerHTML = options;
    document.getElementById('phone2').innerHTML = options;
}

populateSelects();

function comparePhones() {
    const phone1Name = document.getElementById('phone1').value;
    const phone2Name = document.getElementById('phone2').value;
    
    if (phone1Name === phone2Name) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<p>Please select two different smartphones.</p>';
        resultDiv.classList.remove('show');
        setTimeout(() => resultDiv.classList.add('show'), 10);
        return;
    }
    
    const phone1 = phones.find(p => p.name === phone1Name);
    const phone2 = phones.find(p => p.name === phone2Name);
    
    let score1 = 0;
    let score2 = 0;
    let details = '<h3>Comparison Details:</h3>';
    
    Object.keys(specTypes).forEach(spec => {
        const val1 = phone1.specs[spec];
        const val2 = phone2.specs[spec];
        
        if (val1 === undefined || val2 === undefined) return;  // Skip if spec missing
        
        const type = specTypes[spec];
        const diff = Math.abs(val1 - val2);
        let unit = '';  // Can customize units per spec if needed
        
        if (spec === 'antutu') unit = 'points';
        else if (spec === 'battery') unit = 'hours';
        else if (spec === 'weight') unit = 'grams';
        else if (spec === 'zoom') unit = 'x';
        else if (spec === 'refresh') unit = 'Hz';
        
        const isBetter1 = (type === 'higher' && val1 > val2) || (type === 'lower' && val1 < val2);
        const isBetter2 = (type === 'higher' && val2 > val1) || (type === 'lower' && val2 < val1);
        
        if (isBetter1) {
            score1 += perSpecBetter;
            score2 += perSpecWorse;
            details += `<p>${spec.charAt(0).toUpperCase() + spec.slice(1)}: ${phone1.name} is better by ${diff} ${unit}.</p>`;
        } else if (isBetter2) {
            score1 += perSpecWorse;
            score2 += perSpecBetter;
            details += `<p>${spec.charAt(0).toUpperCase() + spec.slice(1)}: ${phone2.name} is better by ${diff} ${unit}.</p>`;
        } else {
            score1 += perSpecEqual;
            score2 += perSpecEqual;
            details += `<p>${spec.charAt(0).toUpperCase() + spec.slice(1)}: Equal (${val1} ${unit}).</p>`;
        }
    });
    
    // Highlight scores - only green for winner
    let class1 = 'score';
    let class2 = 'score';
    if (score1 > score2) {
        class1 += ' score1'; // Green for winner
    } else if (score2 > score1) {
        class2 += ' score1'; // Green for winner
    }
    
    // Max possible per phone is number_of_specs * perSpecBetter (e.g., 5 * 18 = 90), but keeping /100 for display
    const resultHtml = `
        <h3>Scores:</h3>
        <p class="${class1}">${phone1.name}: ${score1}/100</p>
        <p class="${class2}">${phone2.name}: ${score2}/100</p>
        ${details}
    `;
    
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('show');
    setTimeout(() => {
        resultDiv.innerHTML = resultHtml;
        resultDiv.classList.add('show');
    }, 500);  // Increased timeout to allow fade out (0.5s transition)
}