let list = ["충전기", "노트북", "숙제", "옷", "수건", "필통", "교복/체육복", "물병"];

set_basic();
function set_basic(){
    const frame = document.querySelector('#container');
    for (let i=0; i<list.length; i++){
        const div = document.createElement('div');
        const p = document.createElement('p');
        const input = document.createElement('input');
        div.classList.add('list');
        p.classList.add('txt');
        input.classList.add('check');
        input.type = "checkbox";
        p.textContent = list[i];
        div.appendChild(p);
        div.appendChild(input);
        frame.appendChild(div);
    }
}
function clicked_btn(){
    const check_box = document.querySelectorAll('input');
    let check = false;
    for (let i=0; i<list.length; i++){
        if (!check_box[i].checked){
            check = true;
            break;
        }
    }
    if (check){
        alert("빠뜨린게 있어요");
        return;
    }
    
    alert("모두 챙긴 것 같네요");
}
