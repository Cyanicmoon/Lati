let fixedSeat = new Array(33); // 고정된 자리 확인
let fixedNumber = new Array(33); // 고정된 번호
let cnt_fixedSeat = 0;
let cnt_fixedNumber = 0;
const div_seat = document.getElementsByClassName("seat-number");
const div_fixedSeat = document.querySelectorAll(".seat-check");
for (let i=1; i<=div_seat.length; i++){
    fixedNumber[i-1] = false;
    const t = document.createElement("p");
    t.classList.add("fixed-number");
    t.textContent = i;
    t.addEventListener("click", ()=>{
        if (!fixedNumber[i-1]){
            fixedNumber[i-1] = !fixedNumber[i-1];
            t.classList.add("color-red");
            cnt_fixedNumber += 1;
        }
        else {
            fixedNumber[i-1] = !fixedNumber[i-1];
            t.classList.remove("color-red");
            cnt_fixedNumber -= 1;
        }
    })
    const tt = document.getElementsByClassName("fixed-frame")[0];
    tt.appendChild(t);

    fixedSeat[i-1] = false;
    div_fixedSeat[i-1].addEventListener("change", ()=>{ // 체크박스 체크하면 자리 고정 처리
        if (!fixedSeat[i-1]){
            cnt_fixedSeat += 1;
            fixedSeat[i-1] = !fixedSeat[i-1];
        }
        else {
            cnt_fixedSeat -= 1;
            fixedSeat[i-1] = !fixedSeat[i-1];
        }
    })
}

const check_blank = document.getElementsByClassName("mix-setting")[0];
let check_setting_1 = true;
check_blank.checked = true;
check_blank.addEventListener("change", ()=>{
    check_setting_1 = !check_setting_1;
})

const check_noPastSeat = document.getElementsByClassName("mix-setting")[1];
let check_setting_2 = false;
check_noPastSeat.addEventListener("change", ()=>{
    check_setting_2 = !check_setting_2;
})

let seatHistory = -1;
try {
    seatHistory = JSON.parse(localStorage.getItem("seats"));
}
catch(e){}


function mixSeats(){
    if (cnt_fixedNumber != cnt_fixedSeat){
        alert("제외한 자리와 번호의 개수가 맞지 않습니다");
        return;
    }

    let seat = new Array(0);
    for (let i=0; i<33; i++){
        if (fixedNumber[i] == false){
            seat.push(i+1);
        }
    }
    while (true){
        for (let i=0; i<1000; i++){
            let r = Math.floor(Math.random()*(33-cnt_fixedNumber));
            let temp = seat[0];
            seat[0] = seat[r];
            seat[r] = temp;
        }

        let j = 0;
        for (let i=0; i<33; i++){
            if (fixedSeat[i] == false){
                div_seat[i].value = seat[j];
                j += 1;
            }else if (check_setting_1){
                div_seat[i].value = "";
            }
        }

        if (!check_setting_2 || seatHistory == -1){
            break;
        }

        let c = true;
        for (let i=0; i<33; i++){
            if (div_seat[i].value == seatHistory[i] && fixedNumber[i] == false) {
                c = false;
            }
        }

        if (c){
            break;
        }
        console.log("mix again");
    }
}

function saveSeat(){
    localStorage.clear();

    let seat = new Array(0);
    for (let i=0; i<div_seat.length; i++){
        seat.push(div_seat[i].value);
    }
    console.log(seat);
    localStorage.setItem("seats", JSON.stringify(seat));
}
