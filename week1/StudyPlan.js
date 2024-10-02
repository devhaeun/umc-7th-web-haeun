const $input = document.querySelector('input');
const $todoCnts = document.querySelector('#todo-cnts');
const $completeCtns = document.querySelector('#complete-cnts');
const $inputForm = document.querySelector('#inputForm');

$inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const $todo = document.createElement('li');
    const $todoText = document.createElement('div');
    const $todoBtn = document.createElement('button');
    $todoText.textContent = $input.value;
    $todoBtn.textContent = '완료';
    let clickTodo = true;
    $todoBtn.addEventListener('click', (e) => {
        if (!clickTodo) return;
        console.log($todo);
        $todoCnts.removeChild($todo);
        $todoBtn.textContent = '삭제';
        $todoBtn.addEventListener('click', (e) => {
            $todo.remove();
        })
        $completeCtns.appendChild($todo);
        clickTodo = false;
    })
    $todo.append($todoText, $todoBtn);
    $todoCnts.appendChild($todo);
    $input.value = '';
});