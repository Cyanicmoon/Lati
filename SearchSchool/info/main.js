var urlParams = new URLSearchParams(window.location.search);
var code = urlParams.get("code");

let school;
let meal;
const filePath = '../학교기본정보.json';
const key = "3a1269f5b83a42c9a6fcc479fca98157";

// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// 파일 로드가 완료되면 실행될 함수
xhr.onload = (event) => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        school = JSON.parse(xhr.responseText);
        // console.log(JSON.stringify(school));
        set_basic();
    }
};

// 파일 로드 시작
xhr.open('GET', filePath, true);
xhr.send();

// 출처 : Chat GPT

function set_basic(){
    let check = true;
    for (let i=0; i<school.length; i++){
        if (school[i].표준학교코드 == code){
            school = school[i];
            check = false;
            break;
        }
    }
    
    if (check) {
        not_code();
        return;
    }

    console.log(JSON.stringify(school));
    
    const h1 = document.createElement("h1");
    const body = document.getElementById("body");
    
    h1.textContent = school.학교명;
    h1.classList.add("title");
    body.appendChild(h1);
    get_meal();
}

function not_code(){
    const h1 = document.createElement("h1");
    const body = document.getElementById("body");
    
    h1.textContent = "오류가 발생했어요";
    h1.classList.add("title");
    body.appendChild(h1);
}

function get_meal(){
    let date = new Date();
    let y = date.getFullYear();
    let m = ('0'+(date.getMonth()+1)).slice(-2);
    let d = ('0'+date.getDate()).slice(-2);
    let today = y+''+m+''+d;
    const url = "https://open.neis.go.kr/hub/mealServiceDietInfo?KEY="+key+"&Type=json&ATPT_OFCDC_SC_CODE="+school.시도교육청코드+"&SD_SCHUL_CODE="+code+"&MLSV_YMD="+today;
    $.ajax({
        type: "get",
        url: url,
        dataType: "text",
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        error: function() {
            not_code();
            return;
        },
        success: function(data) {
            meal = JSON.stringify(JSON.parse(data).mealServiceDietInfo[1].row[0].DDISH_NM);
            console.log(meal);
            create_meal();
        }
    });
}

function create_meal(){
    const container = document.getElementById("meal");
    meal = meal.replace(/[0-9."()]/g, "").replace(/[*]/g, " ").split("<br/>");
    for (let i=0; i<meal.length; i++){
        const p = document.createElement("p");
        p.textContent = meal[i];
        p.classList.add("meal-item")
        container.appendChild(p);
    }
    create_info();
}

function create_info(){
    const container = document.getElementById("school");

    let temp = "";
    for (let i=0; i<String(school.설립일자).length; i++){
        temp += String(school.설립일자).charAt(i);
        if (i == 3){
            temp += "년 ";
        }
        if (i == 5){
            temp += "월 ";
        }
        if (i == 7){
            temp += "일";
        }
    }
    let p = document.createElement("p");
    p.classList.add("school-item");
    p.textContent = "설립일자 : "+temp;
    container.appendChild(p);

    p = document.createElement("p");
    p.classList.add("school-item");
    p.textContent = "주소 : "+school.도로명주소;
    container.appendChild(p);

    p = document.createElement("p");
    p.classList.add("school-item");
    p.textContent = "우편번호 : "+school.도로명우편번호;
    container.appendChild(p);

    p = document.createElement("p");
    p.classList.add("school-item");
    p.textContent = "전화번호 : "+school.전화번호;
    container.appendChild(p);

    p = document.createElement("p");
    p.classList.add("school-item");
    p.textContent = "팩스번호 : "+school.팩스번호;
    container.appendChild(p);

    const btn = document.createElement("button");
    btn.textContent = "홈페이지";
    btn.classList.add("btn");
    container.appendChild(btn);

    if (!school.홈페이지주소.includes("http://")){
        school.홈페이지주소 = "http://"+school.홈페이지주소;
    }

    let temp_btn = document.getElementsByClassName("btn")[0];
    temp_btn.addEventListener("click", e => {
        window.open(school.홈페이지주소);
    });
}
