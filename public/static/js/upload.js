// Обработчик формы загрузки изображения при создании и редактировании поста + кнопки редактирования текста
window.addEventListener('DOMContentLoaded', () => {

    // форма редактирования поста
    let textArea = document.querySelector('#postFormBody');

    // форма загрузки файла
    let uploadForm = document.querySelector('#uploadForm');
    let fileArea = uploadForm.inputGroupFile02;
    let fileInput = document.querySelector('input#inputGroupFile02');

    // добавляем кнопки редактирования текста и вешаем на них события
    let editions = {
        'btn-bold': [' **text**', '<strong>Жирный</strong>'],
        'btn-italic': [' _text_', '<em>Курсив</em>'],
        'btn-underlined': [' <u>text</u>', '<small><u>Подчёркнутый</u></small>'],
        'btn-deleted': [' ~~text~~', '<del>Зачёркнутый</del>'],
        'btn-marked': [' <mark>text<mark>', '<mark>Выделенный</mark>'],
        'btn-small': [' <small>text<small>', '<small>Мелкий</small>'],
        'btn-code': [String.raw({raw: ' ```text```'}), '<code>Код</code>'],
        'btn-kbd': [' <kbd>terminal</kbd>', '<kbd>Терминал</kbd>'],
        'btn-link': [' [title](https://url)', '<a>Ссылка</a>'],
        'btn-quote': ['  \n> цитата  ', 'Цитата'],
        'btn-img': [' ![Alt](/url/1.png "Название")', 'Изображение'],
        'btn-table': ['  \nItem | Value | Quantity  \n——— |:——:| ——-:  \nComputer | 1600 | 3  \nPhone | 12 | 2', 'Таблица'],
        'btn-note': [' примечание[^1]  \n[^1]: Все сноски отображаются в конце страницы', 'Сноска'],
        'btn-list': ['  \n1. Первый пункт списка  \n2. Второй пункт  \n⋅⋅⋅* Немаркерованный вложенный подпункт.', 'Список'],
        'btn-line': ['  \n  ***  ', 'Линия'],
    };

    // добавляем кнопки на страницу
    function addButtons() {
        let panel = document.createElement('div');
        panel.classList.add('d-flex', 'flex-wrap', 'justify-content-center');

        Object.keys(editions).forEach(elem => {
            let btn = document.createElement('div');
            btn.classList.add('my-1', 'mx-1');
            btn.innerHTML = `
            <button type="button" class="editor-btn btn btn-outline-secondary btn-sm" id="${elem}">${editions[elem][1]}</button>`;
            panel.appendChild(btn);
        });

        document.querySelector('#editor').appendChild(panel);
    };

    addButtons();

    // добавляем текст в textarea
    function addToText(text_or_url, title='', link=false) {
        let text;

        if (link === true) {
            text = ` [${title}](${text_or_url}) `;
        } else {
            text = text_or_url;
        };

        textArea.append(text);
    };

    // вешаем событие на клик по кнопке
    document.querySelectorAll('.editor-btn').forEach(elem => {
        elem.addEventListener('click', () => {
            let btn_id = elem.getAttribute('id');
            addToText(editions[btn_id][0]);
        });
    });
    // ============== кнопки добавлены

    // добавляем ссылку на загруженный файл под форму
    function addLink(item_url, item_title) {
        let row = document.createElement('div');
        row.innerHTML = `<a href="${item_url}" target="_blank">${item_title}</a>`;
        document.querySelector('#uploadedFiles').appendChild(row);
        addToText(item_url, item_title, link=true);
    };

    // отправляем post-запрос
    async function send_request(url, data={}, headers={}) {
        const resp = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: data,
        });

        if (!resp.ok){
            throw new Error(`Could not fetch ${url}, status: ${resp.status}`);
        };

        return await resp.text();
    };

    // отправляем данные формы загрузки файла на бэкенд
    function upload(e) {
        e.preventDefault();  // сбрасывает действие по умолчанию - перезагрузку страницы

        let filename = uploadForm.inputGroupFile02.files[0].name;
        let formData = new FormData(uploadForm);

        send_request('/upload', data=formData)
            .then(url => addLink(url, filename))
            .catch(err => console.error('No response from server'));
    };

    uploadForm.addEventListener('submit', (e) => upload(e));
});
