// script.js
const phones = [
    {
        name: "iPhone 15",
        specs: {
            antutu: 1500000, 
            battery: 20,      
            weight: 171,     
            zoom: 2,      
            refresh: 60  
        }
    },
    {
        name: "Samsung Galaxy S23",
        specs: {
            antutu: 1200000, 
            battery: 18,         
            weight: 168,      
            zoom: 3,     
            refresh: 120   
        }
    },
    {
        name: "Google Pixel 8",
        specs: {
            antutu: 1148000,  
            battery: 18,  
            weight: 187,  
            zoom: 2,              
            refresh: 120   
        }
    },
    {
        name: "OnePlus 12",
        specs: {
            antutu: 2100000,      
            battery: 22,        
            weight: 220,         
            zoom: 3,    
            refresh: 120
        }
    },
    {
        name: "Xiaomi 14",
        specs: {
            antutu: 2000000,
            battery: 20,
            weight: 193,
            zoom: 3, 
            refresh: 120 
        }
    },
    {
        name: "iPhone 16 Pro",
        specs: {
            antutu: 2056260,
            battery: 28,
            weight: 199,
            zoom: 5,
            refresh: 120
        }
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        specs: {
            antutu: 1918239,
            battery: 26,
            weight: 232,
            zoom: 5,
            refresh: 120
        }
    },
    {
        name: "Google Pixel 9 Pro",
        specs: {
            antutu: 1125355,
            battery: 22,
            weight: 199,
            zoom: 5,
            refresh: 120
        }
    },
    {
        name: "Nothing Phone (2)",
        specs: {
            antutu: 1200612,
            battery: 23,
            weight: 201,
            zoom: 2, 
            refresh: 120 
        }
    },
    {
        name: "Motorola Edge 50 Pro",
        specs: {
            antutu: 807658,
            battery: 23,
            weight: 186,
            zoom: 3,
            refresh: 144
        }
    }
];

const specTypes = {
    antutu: 'higher',
    battery: 'higher',
    weight: 'lower',
    zoom: 'higher',
    refresh: 'higher'
};

const perSpecBetter = 18;
const perSpecWorse = 8; 
const perSpecEqual = 13;  

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
        
        if (val1 === undefined || val2 === undefined) return;
        
        const type = specTypes[spec];
        const diff = Math.abs(val1 - val2);
        let unit = '';
        
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
    
    let class1 = 'score';
    let class2 = 'score';
    if (score1 > score2) {
        class1 += ' score1';
    } else if (score2 > score1) {
        class2 += ' score1';
    }
    
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
    }, 500); 
}