const phones = [
    {
        name: "iPhone 15",
        specs: { antutu: 1500000, battery: 20, weight: 171, zoom: 2, refresh: 60 }
    },
    {
        name: "Samsung Galaxy S23",
        specs: { antutu: 1200000, battery: 18, weight: 168, zoom: 3, refresh: 120 }
    },
    {
        name: "Google Pixel 8",
        specs: { antutu: 1148000, battery: 18, weight: 187, zoom: 2, refresh: 120 }
    },
    {
        name: "OnePlus 12",
        specs: { antutu: 2100000, battery: 22, weight: 220, zoom: 3, refresh: 120 }
    },
    {
        name: "Xiaomi 14",
        specs: { antutu: 2000000, battery: 20, weight: 193, zoom: 3, refresh: 120 }
    },
    {
        name: "iPhone 16 Pro",
        specs: { antutu: 2056260, battery: 28, weight: 199, zoom: 5, refresh: 120 }
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        specs: { antutu: 1918239, battery: 26, weight: 232, zoom: 5, refresh: 120 }
    },
    {
        name: "Google Pixel 9 Pro",
        specs: { antutu: 1125355, battery: 22, weight: 199, zoom: 5, refresh: 120 }
    },
    {
        name: "Nothing Phone (2)",
        specs: { antutu: 1200612, battery: 23, weight: 201, zoom: 2, refresh: 120 }
    },
    {
        name: "Motorola Edge 50 Pro",
        specs: { antutu: 807658, battery: 23, weight: 186, zoom: 3, refresh: 144 }
    },
    {
        name: "Asus ROG Phone 8 Pro",
        specs: { antutu: 2200000, battery: 25, weight: 225, zoom: 3, refresh: 165 }
    },
    {
        name: "Vivo X100 Pro",
        specs: { antutu: 2080000, battery: 21, weight: 221, zoom: 4.3, refresh: 120 }
    },
    {
        name: "Honor Magic 6 Pro",
        specs: { antutu: 2050000, battery: 24, weight: 229, zoom: 5, refresh: 120 }
    },
    {
        name: "Huawei Pura 70 Ultra",
        specs: { antutu: 980000, battery: 22, weight: 226, zoom: 3.5, refresh: 120 }
    },
    {
        name: "Realme GT 5 Pro",
        specs: { antutu: 2020000, battery: 22, weight: 218, zoom: 3, refresh: 144 }
    }
];

const specConfig = {
    antutu: { label: 'AnTuTu Benchmark', unit: 'pts', type: 'higher' },
    battery: { label: 'Автономность', unit: 'ч', type: 'higher' },
    weight: { label: 'Вес', unit: 'г', type: 'lower' },
    zoom: { label: 'Оптический зум', unit: 'x', type: 'higher' },
    refresh: { label: 'Частота экрана', unit: 'Гц', type: 'higher' }
};

const perSpecBetter = 18;
const perSpecWorse = 8; 
const perSpecEqual = 13;  

function populateSelects() {
    const sortedPhones = [...phones].sort((a, b) => a.name.localeCompare(b.name));
    const options = sortedPhones.map(phone => `<option value="${phone.name}">${phone.name}</option>`).join('');
    document.getElementById('phone1').innerHTML = options;
    document.getElementById('phone2').innerHTML = options;
    
    if (sortedPhones.length > 1) {
        document.getElementById('phone2').value = sortedPhones[1].name;
    }
}

populateSelects();

function comparePhones() {
    const phone1Name = document.getElementById('phone1').value;
    const phone2Name = document.getElementById('phone2').value;
    const resultDiv = document.getElementById('result');
    
    if (phone1Name === phone2Name) {
        resultDiv.innerHTML = '<div style="text-align:center; padding: 20px; color: var(--danger);">Пожалуйста, выберите два разных смартфона.</div>';
        resultDiv.classList.add('show');
        return;
    }
    
    const phone1 = phones.find(p => p.name === phone1Name);
    const phone2 = phones.find(p => p.name === phone2Name);
    
    let score1 = 0;
    let score2 = 0;
    let specsHtml = '';
    
    Object.keys(specConfig).forEach(spec => {
        const val1 = phone1.specs[spec];
        const val2 = phone2.specs[spec];
        const config = specConfig[spec];
        
        let isBetter1 = false;
        let isBetter2 = false;
        
        if (config.type === 'higher') {
            if (val1 > val2) isBetter1 = true;
            else if (val2 > val1) isBetter2 = true;
        } else { 
            if (val1 < val2) isBetter1 = true;
            else if (val2 < val1) isBetter2 = true;
        }

        if (isBetter1) {
            score1 += perSpecBetter;
            score2 += perSpecWorse;
        } else if (isBetter2) {
            score1 += perSpecWorse;
            score2 += perSpecBetter;
        } else {
            score1 += perSpecEqual;
            score2 += perSpecEqual;
        }

        const maxVal = Math.max(val1, val2);
        let width1 = (val1 / maxVal) * 100;
        let width2 = (val2 / maxVal) * 100;
        
        // Обновленный HTML шаблон с оберткой bar-wrapper
        specsHtml += `
            <div class="spec-item">
                <div class="spec-header">
                    <span>${config.label}</span>
                    <span style="color: var(--text-muted); font-weight: 400; font-size: 0.9em;">${config.unit}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size: 1em; font-weight:600;">
                    <span style="color: ${isBetter1 ? 'var(--primary)' : 'var(--text-muted)'}">${val1}</span>
                    <span style="color: ${isBetter2 ? 'var(--accent)' : 'var(--text-muted)'}">${val2}</span>
                </div>
                <div class="bar-wrapper">
                    <div class="bar-container">
                        <div class="bar bar-1" style="width: ${width1}%; opacity: ${isBetter1 || (!isBetter1 && !isBetter2) ? 1 : 0.5}"></div>
                    </div>
                    <div class="bar-container">
                        <div class="bar bar-2" style="width: ${width2}%; opacity: ${isBetter2 || (!isBetter1 && !isBetter2) ? 1 : 0.5}"></div>
                    </div>
                </div>
            </div>
        `;
    });
    
    const class1 = score1 >= score2 ? 'winner' : 'loser';
    const class2 = score2 >= score1 ? 'winner' : 'loser';
    
    const resultHtml = `
        <div class="score-card">
            <div class="phone-score">
                <h3>${phone1.name}</h3>
                <div class="big-number ${class1}">${score1}</div>
            </div>
            <div style="font-weight:800; color:var(--border); font-size: 1.5em;">:</div>
            <div class="phone-score">
                <h3>${phone2.name}</h3>
                <div class="big-number ${class2}">${score2}</div>
            </div>
        </div>
        
        <div class="specs-list">
            ${specsHtml}
        </div>
    `;
    
    resultDiv.classList.remove('show');
    setTimeout(() => {
        resultDiv.innerHTML = resultHtml;
        resultDiv.classList.add('show');
    }, 50); 

}
