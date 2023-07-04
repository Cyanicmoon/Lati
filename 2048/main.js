let game = [[1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1]];
let point = 0;
makeNewNumber();
makeNewNumber();
updateElements();

document.addEventListener("keydown", (event)=>{
    if (event.keyCode === 37) {
        moveLeft();
    }
    else if (event.keyCode === 38) {
        moveUp();
    }
    else if (event.keyCode === 39) {
        moveRight();
    }
    else if (event.keyCode === 40) {
        moveDown();
    }
});

function restart(){
    game = [[1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1]];
    makeNewNumber();
    makeNewNumber();
    updateElements();
}

function makeNewNumber(){
    while (true){
        let r1 = Math.floor(Math.random()*4);
        let r2 = Math.floor(Math.random()*4);
        if (game[r1][r2] == 1) {
            game[r1][r2] = 2;
            break;
        }
    }
    let temp = "";
    for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
            temp += game[i][j]+"  ";
        }
        temp += "\n";
    }
    console.log(temp);
}

function updateElements(){
    const main_div = document.getElementsByClassName("main-div")[0];
    for (let i=0; i<4; i++){
        const line_div = document.getElementsByClassName("line-div")[i];
        const item = line_div.children;
        for (let j=0; j<4; j++){
            if (game[i][j] != 1){
                item[j].children[0].textContent = game[i][j];
            }
            else {
                item[j].children[0].textContent = "";
            }
        }
    }
}

function moveLeft(){
    let temp = game;
    for (let i=0; i<4; i++){
        for (let j=1; j<4; j++){
            if (temp[i][j] == temp[i][j-1] && temp[i][j] != 1) {
                temp[i][j-1] *= 2;
                temp[i][j] = 1;
            }
            // let t = "";
            // for (let i=0; i<4; i++){
            //     for (let j=0; j<4; j++){
            //         t += temp[i][j]+"  ";
            //     }
            //     t += "\n";
            // }
            // console.log(t);
        }
    }
    while (true){
        for (let i=0; i<4; i++){
            for (let j=1; j<4; j++){
                if (temp[i][j-1] == 1) {
                    temp[i][j-1] = temp[i][j];
                    temp[i][j] = 1;
                }
                // let t = "";
                // for (let i=0; i<4; i++){
                //     for (let j=0; j<4; j++){
                //         t += temp[i][j]+"  ";
                //     }
                //     t += "\n";
                // }
                // console.log(t);
            }
        }
        let check = true;
        for (let i=0; i<4; i++){
            let c = true;
            for (let j=1; j<4; j++){
                if (temp[i][j-1] != 1 && temp[i][j] != 1){
                    c = false;
                }
                else {
                    c = true;
                    break;
                }
            }
            if (c) {
                check = false;
                break;
            }
        }
        if (check){
            break;
        }
    }
    updateElements();
}
