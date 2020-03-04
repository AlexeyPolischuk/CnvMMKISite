'use strict';
let dynCnv = {
    cnvCount: 3,
    url: 'http://localhost:8080/dyncnv',
    cnv: document.querySelector('.cnv'),
    row: document.querySelector('.row'),
    rowCashe: document.querySelector('.row').cloneNode(true),
    btn: document.querySelector(' #cnv-btn'),
};
let spinner = document.querySelector(' #spinner');
let timerIdCnv;
function drawCnv(i, json) {
    let currentNode = dynCnv.cnv.cloneNode(true);
    currentNode.querySelector(`.title`).innerText = `Конвертер ${i}`;
    currentNode.querySelector(`.pl_num`).innerText = json[`PL_NUM_${i}`];
    currentNode.querySelector(`.name`).innerText = json[`name_${i}`];
    const src = './img/cnv/1.jpg';
    currentNode.querySelector('.code_oper').setAttribute('src', src.replace('1', json[`code_oper_${i}`]));
    currentNode.querySelector('.code_oper').setAttribute('alt', json[`name_${i}`]);
    dynCnv.rowCashe.append(currentNode);
};
function showCnvDyn() {
    spinner.hidden = false;
    dynCnv.rowCashe = dynCnv.row.cloneNode(true);
    dynCnv.cnv.hidden = false;
    dynCnv.rowCashe.innerHTML = '';
    fetch(dynCnv.url)
        .then(res => {
            if (!res.ok) {
                dynCnv.url = './json/dyncnv.json';
                return null;
            } 
            else return res.json();
        }, err => {
            console.log(err);
                dynCnv.url = './json/dyncnv.json';
        }
        )
        .then(json => {
            for (let i = 1; i < dynCnv.cnvCount + 1; i++) {
                drawCnv(i, json[0]);
            }
            
            dynCnv.row.innerHTML = dynCnv.rowCashe.innerHTML;
            spinner.hidden = true;
        }
        );
};


let dynMnlz = {
    mnlzCount: 4,
    url: 'http://localhost:8080/dynmnlz',
    mnlz: document.querySelector('.mnlz'),
    row: document.querySelector('.row'),
    currentNode: document.querySelector('.mnlz'),
    btn: document.querySelector(' #mnlz-btn'),
};
let timerIdMnlz;
function showMnlzDyn() {
    spinner.hidden = false;     
    let row = dynMnlz.row.cloneNode(true);
    dynMnlz.mnlz.hidden = false;    
    row.innerHTML = '';
    fetch(dynMnlz.url)
        .then(res => res.status != 200 ? null : res.json(), err => console.log(err)
        )
        .then(json => {
            for (let i = 0; i < dynMnlz.mnlzCount; i++) {
                dynMnlz.currentNode = dynMnlz.mnlz.cloneNode(true);
                dynMnlz.currentNode.querySelector(` .title`).innerText = `МНЛЗ-${i + 1}`
                // console.log(json.filter(par => par.V1));                
                dynMnlz.currentNode.querySelector(` .num_pl`).innerText =
                    json.filter(par => par.V1)[0].V1[i].num_pl;
                json.forEach(param => {
                    drawMnlz(param, i)
                });
                row.append(dynMnlz.currentNode);
            }
            
            dynMnlz.row.innerHTML = row.innerHTML;
            spinner.hidden = true;
        });
};


function drawMnlz(param, i) {
    for (const nameParam in param) {
        let paramValue = dynMnlz.currentNode.querySelector(` .${nameParam}`);
        if (paramValue) {
            paramValue.innerText = param[nameParam][i].msg;
        }
    };
};


function showCnv(show) {
    if (show) {
        if (!dynCnv.btn.classList.contains("active")) {
            dynCnv.btn.classList.add("active");
            showCnvDyn();
            timerIdCnv = setInterval(showCnvDyn, 3000)
        }
    }
    else {
        dynCnv.btn.classList.remove("active");
        clearInterval(timerIdCnv);
    }

};

function showMnlz(show) {
    if (show) {
        if (!dynMnlz.btn.classList.contains("active")) {
            dynMnlz.btn.classList.add("active");
            showMnlzDyn();
            timerIdMnlz = setInterval(showMnlzDyn, 3000);
        }
    }
    else {
        dynMnlz.btn.classList.remove("active");
        clearInterval(timerIdMnlz);
    }
};




showCnv(1);
// showMnlz(true);

dynMnlz.btn.addEventListener('click',
    event => {
        showCnv(0);
        showMnlz(1);
    }
);
dynCnv.btn.addEventListener('click',
    event => {
        showCnv(1);
        showMnlz(0);
    }
);