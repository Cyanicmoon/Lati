let list;
const filePath = '학교기본정보.json';

// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// 파일 로드가 완료되면 실행될 함수
xhr.onload = (event) => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        list = JSON.parse(xhr.responseText);
        // console.log(JSON.stringify(list));
    }
};

// 파일 로드 시작
xhr.open('GET', filePath, true);
xhr.send();

// 출처 : Chat GPT

function search_school(){
    const input = document.getElementById("search");
    // console.log(input.value);
    let temp = new Array(0);
    for (let i=0; i<list.length; i++){
        if (list[i].학교명.includes(input.value)){
            temp.push(list[i].학교명);
        }
    }
    // console.log(temp);
    const temp_container = document.querySelector(".list");
    temp_container.remove();
    const body = document.getElementById("body");
    const container = document.createElement("div");
    container.classList.add("list")
    for (let i=0; i<temp.length; i++){
        const div = document.createElement("div");
        div.classList.add("item");
        const p = document.createElement("p");
        p.classList.add("info");
        p.textContent = temp[i];
        div.appendChild(p);
        container.appendChild(div);
    }
    body.appendChild(container);

    const item = document.getElementsByClassName("info");
    for (let i=0; i<temp.length; i++){
        item[i].addEventListener("click", e => {
            let name = e.target.textContent;
            console.log(name);
            move_page(name);
        });
    }
}

function move_page(name){
    let code = "";
    for (let i=0; i<list.length; i++){
        // console.log(list[i].학교명);
        if (list[i].학교명 == name){
            code = list[i].표준학교코드;
            break;
        }
    }
    location.href = "info/?code="+code;
}
