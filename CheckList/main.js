let list = ["정신머리", "짐", "1", "1", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

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
