'use strict';
let dynCnv = {
    url: 'http://localhost:8080/dyncnv',
    cnv: document.querySelector('.cnv'),
    row: document.querySelector('.row'),
    rowCashe: document.querySelector('.row').cloneNode(true),
    btn: document.querySelector(' #cnv-btn'),
};
let spinner = document.querySelector(' #spinner');
let timerIdCnv;
function drawCnvItem(i, json) {
    let currentNode = dynCnv.cnv.cloneNode(true);
    currentNode.querySelector(`.title`).textContent = `Конвертер ${i + 1}`;
    currentNode.querySelector(`.pl_num`).textContent = json[`PL_NUM`];
    currentNode.querySelector(`.name`).textContent = json[`name`];
    const src = './img/cnv/1.jpg';
    currentNode.querySelector('.code_oper').setAttribute('src', src.replace('1', json[`code_oper`]));
    currentNode.querySelector('.code_oper').setAttribute('alt', json[`name`]);
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
            return null;
        }
        )
        .then(json => {
            if (json)
                json.forEach((cnv, i) => {
                    drawCnvItem(i, cnv);
                })

            dynCnv.row.innerHTML = dynCnv.rowCashe.innerHTML;
            spinner.hidden = true;
        }
        );
};


let dynMnlz = {
    url: 'http://localhost:8080/dynmnlz',
    mnlz: document.querySelector('.mnlz'),
    row: document.querySelector('.row'),
    currentNode: document.querySelector('.mnlz'),
    btn: document.querySelector(' #mnlz-btn'),
    rowCashe: document.querySelector('.row').cloneNode(true),
};
let timerIdMnlz;
function showMnlzDyn() {
    spinner.hidden = false;
    dynMnlz.rowCashe = dynMnlz.row.cloneNode(true);
    dynMnlz.mnlz.hidden = false;
    dynMnlz.rowCashe.innerHTML = '';
    fetch(dynMnlz.url)
        .then(res => {
            if (!res.ok) {
                dynMnlz.url = './json/dynmnlz.json';
                return null;
            }
            else return res.json();
        }, err => {
            console.log(err);
            dynMnlz.url = './json/dynmnlz.json';
            return null;
        }
        )
        .then(json => {
            if (json)
                json.forEach((mnlz, i) => {
                    drawMnlzItem(i, mnlz);
                });
            dynMnlz.row.innerHTML = dynMnlz.rowCashe.innerHTML;
            spinner.hidden = true;

        });

}

function drawMnlzItem(i, mnlz) {
    dynMnlz.currentNode = dynMnlz.mnlz.cloneNode(true);
    dynMnlz.currentNode.querySelector(` .title`).textContent = `МНЛЗ-${i + 1}`;
    for (const param in mnlz) {
        let paramElement = dynMnlz.currentNode.querySelector(` .${param}`);
        if (paramElement) {
            paramElement.textContent = mnlz[param];
        }
    }
    dynMnlz.rowCashe.append(dynMnlz.currentNode);
}

function showCnv(show) {
    $('.collapse').collapse('hide');
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
    $('.collapse').collapse('hide');
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


let him = {
    url: 'http://localhost:8080/him',
    prob: document.querySelector('.prob'),
    row: document.querySelector('.row'),
    currentNode: document.querySelector('.prob'),
    him: document.querySelector('.him'),
    btn: document.querySelector(' #him-btn'),
    pair: document.querySelector(` .pair`),
    btns: document.querySelector(` #prev-next-btns`),
    probscount: 10,
    rowStart: 0,
    rowEnd: 10,
};

function showHim(show) {
    $('.collapse').collapse('hide');
    if (show) {
        if (!him.btn.classList.contains("active")) {
            him.btn.classList.add("active");
            getHim();
        }
    }
    else {
        him.btn.classList.remove("active");
    }
};
function getHim() {
    spinner.hidden = false;
    him.rowCashe = him.row.cloneNode(true);
    him.him.hidden = false;
    him.btns.hidden = false;
    him.rowCashe.innerHTML = '';
    fetch(him.url)
        .then(res => {
            if (!res.ok) {
                him.url = './json/him.json';
                return null;
            }
            else return res.json();
        }, err => {
            console.log(err);
            him.url = './json/him.json';
            return null;
        }
        )
        .then(json => {
            if (json)
                json.forEach((prob, i) => {
                    drawHimItem(i, prob);
                });
            him.rowCashe.append(him.btns);
            him.row.innerHTML = him.rowCashe.innerHTML;
            spinner.hidden = true;
        });

}
function drawHimItem(i, prob) {
    him.currentNode = him.prob.cloneNode(true);
    him.currentNode.innerHTML = '';
    for (const element in prob) {
        if (prob[element]) {
            let currentpair = him.pair.cloneNode(true);
            currentpair.querySelector(` .key`).textContent = element;
            currentpair.querySelector(` .value`).textContent = prob[element];
            him.currentNode.append(currentpair);
        }
    }

    him.rowCashe.append(him.currentNode);
}


showCnv(1);
// showMnlz(true);

dynMnlz.btn.addEventListener('click', mnlzClick);

dynCnv.btn.addEventListener('click', cnvClick);


him.btn.addEventListener('click', himClick);

document.querySelector(` main`).addEventListener('click', (e) => {
    if (e.target.classList.contains('next')) {
        nextPageHim();
    };
    if (e.target.classList.contains('prev')) {
        him.rowStart = Math.max(him.rowStart - him.probscount - 1, 0);
        him.rowEnd = Math.max(him.rowEnd - him.probscount - 1, him.probscount);
        const url = him.url;
        him.url = url + `?rowstart=${him.rowStart}&rowend=${him.rowEnd}`;
        getHim();
        him.url = url;
    };
});




function nextPageHim() {
    him.rowStart += him.probscount + 1;
    him.rowEnd += him.probscount + 1;
    const url = him.url;
    him.url = url + `?rowstart=${him.rowStart}&rowend=${him.rowEnd}`;
    getHim();
    him.url = url;
}

function himClick() {
    showMnlz(0);
    showCnv(0);
    showHim(1);
}

function cnvClick() {
    showMnlz(0);
    showCnv(1);
    showHim(0);
}

function mnlzClick() {
    showCnv(0);
    showMnlz(1);
    showHim(0);
}

