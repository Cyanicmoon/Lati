let korean = new Array(0);
let english = new Array(0);
let cnt = 0;

let test_korean;
let test_english;

let test_cnt = 0;
let correct = 0;
function add_word(){
    const check_eng = /[a-zA-Z]/;
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    
    const en = document.getElementById('english').value;
    const ko = document.getElementById('korean').value;
    
    if (en == "" || !check_eng.test(en)){
        alert("영어 단어를 입력해주세요");
        return;
    }
    if (ko == "" || !check_kor.test(ko)){
        alert("단어 뜻을 입력해주세요");
        return;
    }

    const div_list = document.getElementById('list');
    const div = document.createElement('div');
    const div_korean = document.createElement('div');
    const div_english = document.createElement('div');
    const p_korean = document.createElement('p');
    const p_english = document.createElement('p');
    div.classList.add('word-div');
    div_korean.classList.add('div-korean');
    div_english.classList.add('div-english');
    p_korean.classList.add('p-word');
    p_english.classList.add('p-word');

    p_english.textContent = en;
    div_english.appendChild(p_english);

    p_korean.textContent = ko;
    div_korean.appendChild(p_korean);

    div.appendChild(div_english);
    div.appendChild(div_korean);
    div_list.appendChild(div);

    korean.push(ko);
    english.push(en);
    cnt += 1;

    alert("["+korean[cnt-1]+" | " + english[cnt-1]+"] 추가 완료")
    document.getElementById('english').value = "";
    document.getElementById('korean').value = "";

    
}

function start(){
    if (cnt == 0){
        alert("단어를 추가해주세요");
        return;
    }

    test_korean = korean;
    test_english = english;

    shuffle();

    const body = document.getElementById('body');
    const div = document.createElement('div');
    const p = document.createElement('p');
    const h3 = document.createElement('h3');
    const input = document.createElement('input');
    const temp_input = document.createElement('input');
    const btn = document.createElement('button');

    div.classList.add('frame');
    div.id = "frame";
    
    h3.classList.add('question')
    h3.id = "question";
    h3.textContent = test_english[test_cnt];
    
    input.type = "text";
    input.id = 'answer';
    temp_input.classList.add('temp');

    btn.classList.add('submit_answer');
    btn.onclick = submit_answer;
    btn.textContent = "제출";

    p.classList.add('cnt');
    p.id = "cnt";
    p.textContent = (test_cnt+1)+"/"+cnt;
    
    div.appendChild(h3);
    div.appendChild(input);
    div.appendChild(p);
    div.appendChild(btn);
    div.appendChild(temp_input);
    body.appendChild(div);
}

function shuffle(){
    for (let i=0; i<1000; i++){
        let r = Math.floor(Math.random()*cnt);
        let temp = test_korean[0];
        test_korean[0] = test_korean[r];
        test_korean[r] = temp;

        temp = test_english[0];
        test_english[0] = test_english[r];
        test_english[r] = temp;
    }
}

function submit_answer(){
    const input_ans = document.getElementById('answer');
    ans = input_ans.value;
    if (ans.replace(/ /g,"") == test_korean[test_cnt].replace(/ /g,"")){
        correct += 1;
        alert("정답입니다");
    }else {
        alert("오답입니다");
    }
    test_cnt += 1;

    let div = document.getElementById('frame');
    if (test_cnt >= cnt){
        div.remove();
        finished();
        return;
    }

    input_ans.value = "";
    let h3 = document.getElementById('question');
    h3.textContent = english[test_cnt];
    let p = document.getElementById('cnt');
    p.textContent = (test_cnt+1)+"/"+cnt;
}

function finished(){
    const body = document.getElementById('body');
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const btn = document.createElement('button');

    div.classList.add('frame');
    div.id = "frame-2";
    
    h3.classList.add('question')
    h3.textContent = "정답 : "+cnt+"개 중 "+correct+"개";
    
    btn.classList.add('restart-btn');
    btn.onclick = restart;
    btn.textContent = "돌아가기";

    div.appendChild(h3);
    div.appendChild(btn);
    body.appendChild(div);
}

function restart(){
    test_cnt = 0;
    correct = 0;
    let div = document.getElementById('frame-2');
    div.remove();
}
