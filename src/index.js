const users = [{
    name: 'name1',
    surname: 'surname1',
    patronymic: 'patronymic1',
    age: 26
},
{
    name: 'name2',
    surname: 'surname2',
    patronymic: 'patronymic2',
    age: 34
},
{
    name: 'name3',
    surname: 'surname3',
    patronymic: 'patronymic3',
    age: 52
},
{
    name: 'name4',
    surname: 'surname4',
    patronymic: 'patronymic4',
    age: 18
},
{
    name: 'name5',
    surname: 'surname5',
    patronymic: 'patronymic5',
    age: 10,
    sex: 'male'
},
]

let table = document.getElementById('table');
let count = users.length; //всего записей
let cnt = 2 //сколько отображаем сначала
let cnt_page = Math.ceil(count / cnt); //кол-во страниц


function renderTH() {
    let noUniqueField = [] // добавление всех полей в массив для заполнения шапки
    for (let i = 0; i < users.length; i++) {
        let temp = Object.getOwnPropertyNames(users[i])
        noUniqueField.push(temp)
    }
    let flatNoUniqueField = noUniqueField.flat(Infinity)
    let uniqueField = [] // сортировка по уникальности
    for (let str of flatNoUniqueField) {
        if (!uniqueField.includes(str)) {
            uniqueField.push(str)
        }
    }
    for (data in uniqueField) { //заполнение шапки, создания чекбоксов для сортировки полей
        let th = document.createElement('div')
        th.classList.add('d-th')
        th.innerHTML = uniqueField[data]
        th.id = uniqueField[data]
        table.appendChild(th)
    }
}

function sortByField() { // сортировка по полям
    let th = document.querySelectorAll('.d-th')
    for (let i = 0; i < th.length; i++) {
        th[i].style.color = 'black'
    }
    document.getElementById(this.innerHTML).style.color = 'red'
    users.sort(byField(this.innerHTML))
    users.forEach((obj, i) => {
        let tr = document.getElementById('tr' + i)
        table.removeChild(tr)
    })
    renderTD()
    displayTR()
}

function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

function renderTD() { // создание и заполнение ячеек таблицы 
    let k = 0
    let th = document.querySelectorAll('.d-th')
    users.forEach((obj, i) => {
        let p = 0
        let tr = document.createElement('div');
        tr.classList.add('d-tr')
        tr.id = 'tr' + i
        for (data in obj) {
            let thId = th[p].id
            if (thId == data) {
                let td = document.createElement('div')
                td.classList.add('d-td')
                td.innerHTML = obj[data]
                td.id = 'td' + k
                k++
                tr.appendChild(td)
            }
            else if (thId != data) {
                for (p; p < th.length; p++) {
                    thId = th[p].id
                    if (thId == data) {
                        let td = document.createElement('div')
                        td.classList.add('d-td')
                        td.innerHTML = obj[data]
                        td.id = 'td' + k
                        k++
                        tr.appendChild(td)
                        break
                    }
                    else {
                        let td = document.createElement('div') 
                        td.classList.add('d-td')
                        td.innerHTML = ('')  
                        tr.appendChild(td)
                    }
                }
            }
            p++
        }
        table.appendChild(tr);
    })
}

function renderPage() {
    const paginator = document.querySelector(".paginator"); //выводим список страниц
    let page = "";
    for (let i = 0; i < cnt_page; i++) {
        page += "<span data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
    }
    paginator.innerHTML = page;
}

function displayTR() { //выводим заданное количество строк 
    const div_dTR = document.querySelectorAll(".d-tr");
    for (let i = 0; i < div_dTR.length; i++) {
        if (i < cnt) div_dTR[i].style.display = "table-row";
    }
}

function displayOffTR() { //вызываем для перерисовки таблицы при уменьшении количества элементов
    const div_dTR = document.querySelectorAll(".d-tr")
    for (let i = cnt; i < div_dTR.length; i++) {
        if (i >= cnt) div_dTR[i].style.display = "none"
    }
}

function pagination(event) { //листаем
    const e = event || window.event;
    const target = e.target;
    const id = target.id;
    const div_dTR = document.querySelectorAll(".d-tr");

    if (target.tagName.toLowerCase() != "span") return;

    let data_page = +target.dataset.page;
    main_page.classList.remove("paginator_active");
    main_page = document.getElementById(id);
    main_page.classList.add("paginator_active");
    let j = 0;
    for (let i = 0; i < div_dTR.length; i++) {
        if (i != data_page)
            div_dTR[i].style.display = "none";

    }
    for (let i = data_page; i < div_dTR.length; i++) {
        if (j >= cnt) break;
        div_dTR[i].style.display = "table-row";
        j++;
    }
}

function more() { //добавление отображаемых строк на одной странице
    if (cnt >= users.length) return
    cnt += 1
    cnt_page = Math.ceil(count / cnt)
    renderPage()
    displayTR()
}

function less() { //уменьшение отображаемых строк на одной странице
    if (cnt <= 1) return
    cnt -= 1
    cnt_page = Math.ceil(count / cnt)
    renderPage()
    displayOffTR()
}

renderTH() //шапка таблицы 
renderTD() //ячейки
displayTR() //первоначальные строки
renderPage() //страницы
const AllTh = document.querySelectorAll('.d-th')
for (let i = 0; i < AllTh.length; i++) { //вешаем на все th по обработчику
    AllTh[i].onclick = sortByField
}

let main_page = document.getElementById("page1");
main_page.classList.add("paginator_active");