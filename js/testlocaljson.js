debugger
fetch('./dyncnv.json')
    .then(res => 
        res.json()    
    )
    .then(json => {
        console.log(json);
    });
