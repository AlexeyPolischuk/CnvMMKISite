function dynTimerStart(func, enable) {
    let timerId = setInterval(func, 20000);
    if (!enable) {
        setTimeout(() => { clearInterval(timerId); alert('stop'); }, 0)
    }
}

// let cnv = document.querySelector('.aggregate');

showCnvDyn();
dynTimerStart(showCnvDyn, 1);

function showCnvDyn() {

    function drawCnv(i, json) {       
        currentNode = cnv.cloneNode(true);
        currentNode.querySelector(`.title`).innerText = `Конвертер ${i}`;
        currentNode.querySelector(`.pl_num`).innerText = json[`PL_NUM_${i}`];
        currentNode.querySelector(`.name`).innerText = json[`name_${i}`];
        const src = './img/cnv/1.jpg';
        currentNode.querySelector('.code_oper').setAttribute('src', src.replace('1', json[`code_oper_${i}`]));
        row.append(currentNode);
    }
    const cnvCount = 3;
    const url = 'http://localhost:8080/dyncnv';
    const cnv = document.querySelector('.aggregate');
    const row = document.querySelector('.row');    
    cnv.hidden = false;
    row.innerHTML = '';
    fetch(url)
        .then(res => res.status != 200 ? null : res.json(), err => console.log(err)
        )
        .then(json => {
            for (let i = 1; i < cnvCount + 1; i++)
                drawCnv(i,json[0]);
        }
        );
}

