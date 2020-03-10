'use strict';
const interval = 30000;
let dynCnv = {
    url: 'http://localhost:8080/dyncnv',
    realUrl: 'http://localhost:8080/dyncnv',
    localUrl: './json/dyncnv.json',
    cnv: document.querySelector('.cnv'),
    row: document.querySelector('#content-row'),
    rowCashe: document.querySelector('#content-row').cloneNode(true),
    btn: document.querySelector(' #cnv-btn'),
    errCount : 0,
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
function getCnvDyn() {
    spinner.hidden = false;
    dynCnv.rowCashe = dynCnv.row.cloneNode(true);
    dynCnv.cnv.hidden = false;
    dynCnv.rowCashe.innerHTML = '';
    fetch(dynCnv.url)
        .then(res => {
            if (!res.ok) {
                errCnvCatching();
                return null;
            }
            else {
                dynCnv.url = dynCnv.realUrl;
                dynCnv.errCount = 0;
                return res.json();
            }
        }, err => {
            console.log(err);
            errCnvCatching();
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
function errCnvCatching() {
    dynCnv.url = dynCnv.localUrl;
    dynCnv.errCount++;
    if (dynCnv.errCount < 2)
        getCnvDyn();
}

function showCnv(show) {
    $('.collapse').collapse('hide');
    if (show) {
        if (!dynCnv.btn.classList.contains("active")) {
            dynCnv.btn.classList.add("active");
            getCnvDyn();
            timerIdCnv = setInterval(getCnvDyn, interval)
        }
    }
    else {
        dynCnv.btn.classList.remove("active");
        clearInterval(timerIdCnv);
    }

};

let dynMnlz = {
    url: 'http://localhost:8080/dynmnlz',
    realUrl: 'http://localhost:8080/dynmnlz',
    localUrl: './json/dynmnlz.json',
    mnlz: document.querySelector('.mnlz'),
    row: document.querySelector('#content-row'),
    currentNode: document.querySelector('.mnlz'),
    btn: document.querySelector(' #mnlz-btn'),
    rowCashe: document.querySelector('#content-row').cloneNode(true),
    errCount: 0,
};
let timerIdMnlz;
function getMnlzDyn() {
    spinner.hidden = false;
    dynMnlz.rowCashe = dynMnlz.row.cloneNode(true);
    dynMnlz.mnlz.hidden = false;
    dynMnlz.rowCashe.innerHTML = '';
    fetch(dynMnlz.url)
        .then(res => {
            if (!res.ok) {
                errMnlzCatching();
                return null;
            }
            else {
                dynMnlz.url = dynMnlz.realUrl;
                dynMnlz.errCount = 0;
                return res.json();                
            }
        }, err => {
            console.log(err);
            errMnlzCatching();
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
function errMnlzCatching() {
    dynMnlz.url = dynMnlz.localUrl;
    dynMnlz.errCount++;
    if (dynMnlz.errCount < 2)
        getMnlzDyn();
}

function drawMnlzItem(i, mnlz) {
    dynMnlz.currentNode = dynMnlz.mnlz.cloneNode(true);
    dynMnlz.currentNode.querySelector(` .title`).textContent = `МНЛЗ-${i + 1}`;
    let mnlzRow = dynMnlz.currentNode.querySelector('.row');
    mnlzRow.querySelector(` .num_pl`).textContent = mnlz.num_pl;
    delete mnlz.num_pl;
    let paramName = mnlzRow.querySelector(` .param-name`);
    let paramValue = mnlzRow.querySelector(` .param-value`);
    for (const param in mnlz) {
        paramName.textContent = param;
        paramValue.textContent = mnlz[param];
        mnlzRow.append(paramName);
        mnlzRow.append(paramValue);
        paramName = paramName.cloneNode(true);
        paramValue = paramValue.cloneNode(true);

    }
    dynMnlz.currentNode.append(mnlzRow);
    dynMnlz.rowCashe.append(dynMnlz.currentNode);
}


function showMnlz(show) {
    $('.collapse').collapse('hide');
    if (show) {
        if (!dynMnlz.btn.classList.contains("active")) {
            dynMnlz.btn.classList.add("active");
            getMnlzDyn();
            timerIdMnlz = setInterval(getMnlzDyn, interval);
        }
    }
    else {
        dynMnlz.btn.classList.remove("active");
        clearInterval(timerIdMnlz);
    }
};


let him = {
    url: 'http://localhost:8080/him',
    realUrl: 'http://localhost:8080/him',
    localUrl: './json/him.json',
    prob: document.querySelector('.prob'),
    row: document.querySelector('#content-row'),
    currentNode: document.querySelector('.prob'),
    him: document.querySelector('.him'),
    btn: document.querySelector(' #him-btn'),
    pair: document.querySelector(` .pair`),
    btns: document.querySelector(` #prev-next-btns`),
    probscount: 10,
    rowStart: 0,
    rowEnd: 10,
    errCount: 0,
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
                him.url = him.localUrl;
                errHimCatching();
                return null;
            }
            else {
                him.url = him.realUrl;
                him.errCount = 0;
                return res.json();
            }

        },
            err => {
                console.log(err);
                errHimCatching();
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
function errHimCatching() {
    him.url = him.localUrl;
    him.errCount++;
    if (him.errCount < 2)
        getHim();
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
        prevPageHim();
    };
});




function prevPageHim() {
    him.rowStart = Math.max(him.rowStart - him.probscount - 1, 0);
    him.rowEnd = Math.max(him.rowEnd - him.probscount - 1, him.probscount);
    const url = him.url;
    him.url = url + `?rowstart=${him.rowStart}&rowend=${him.rowEnd}`;
    getHim();
    him.url = url;
}

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

