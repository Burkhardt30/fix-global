// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
import SmoothScroll from 'smoothscroll-for-websites'
import DataTable from 'datatables.net'
import 'datatables.net-responsive'
import 'datatables.net-dt/css/jquery.dataTables.css'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'

SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime: 600,
    // Размер шага в пикселях
    stepSize: 75,

    // Дополнительные настройки:

    // Ускорение
    accelerationDelta: 30,
    // Максимальное ускорение
    accelerationMax: 2,

    // Поддержка клавиатуры
    keyboardSupport: true,
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll: 50,

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,
})

// Вращение элемента по движению курсора
const rotate3d = (
    elSelector,
    {
        sensitivity = .6,
        thickness = 3.625
    } = ''
) => {

    const targets = document.querySelectorAll(elSelector)

    if (targets.length === 0) return

    for (let el of targets) {
        let layers

        // Создать объём

        createLayers()

        function createLayers() {

            el.style.perspective = '900px'

            const innerHTML = el.innerHTML

            layers = document.createElement('div')
            layers.className = 'z-layers'
            layers.innerHTML = innerHTML
            layers.style.position = 'relative'
            layers.style.transformStyle = 'preserve-3d'
            layers.style.width = '100%'
            layers.style.height = '100%'

            el.innerHTML = ''
            el.append(layers)

            for (let i = 0; i < 7; i++) {
                const clone = layers.cloneNode()

                clone.classList.remove('z-layers')
                clone.classList.add('z-layer')
                clone.innerHTML = innerHTML

                clone.style.position = 'absolute'
                clone.style.top = 0
                clone.style.left = 0
                clone.style.right = 0
                clone.style.bottom = 0
                clone.style.pointerEvents = 'none'
                clone.style.userSelect = 'none'

                clone.style.transform = `translateZ(-${(i + 1) * (thickness)}px)`
                clone.style.opacity = `${(7 - i) * (0.0625)}`

                layers.append(clone)
            }
        }
    }


}

rotate3d('.home-hero__img-diamond')
rotate3d('.global-hero__img-diamond')
rotate3d('.charac__img-diamond')

// Таблицы

let bidTable = new DataTable('#bid-table', {
    responsive: true,
    paging: false,
    searching: false,
    info: false,
    ordering: false,
    columns: [
        { "width": "33.333%" },
        { "width": "33.333%" },
        { "width": "33.333%" },
        //     { responsivePriority: 1 },
        //     { responsivePriority: 3 },
        //     { responsivePriority: 4 },
        //     { responsivePriority: 5 },
        //     { responsivePriority: 6 },
        //     { responsivePriority: 2 },
    ],
});

let additionalTable = new DataTable('#additional-table', {
    responsive: true,
    paging: false,
    searching: false,
    info: false,
    ordering: false,
    columns: [
        { "width": "50%" },
        { "width": "50%" },
        //     { responsivePriority: 1 },
        //     { responsivePriority: 3 },
        //     { responsivePriority: 4 },
        //     { responsivePriority: 5 },
        //     { responsivePriority: 6 },
        //     { responsivePriority: 2 },
    ],
});

// Ховеры в диаграмме

hoverInit()

function hoverInit() {
    const data = document.querySelector('.data-tokenomics')

    if (!data) return

    // ячейка <td> под курсором в данный момент (если есть)
    let currentElem = null;

    data.onmouseover = function (event) {
        // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий
        // если currentElem есть, то мы ещё не ушли с предыдущего <td>,
        // это переход внутри - игнорируем такое событие
        if (currentElem) return;

        let target = event.target.closest('.data-tokenomics__item');

        // переход не на <td> - игнорировать
        if (!target) return;

        // переход на <td>, но вне нашей таблицы (возможно при вложенных таблицах)
        // игнорировать
        if (!data.contains(target)) return;

        // ура, мы зашли на новый <td>
        currentElem = target;
        document.querySelector(`#${target.dataset.piece}`)
            .classList.add('pie__piece--hover')
    };


    data.onmouseout = function (event) {
        // если мы вне <td>, то игнорируем уход мыши
        // это какой-то переход внутри таблицы, но вне <td>,
        // например с <tr> на другой <tr>
        if (!currentElem) return;

        // мы покидаем элемент – но куда? Возможно, на потомка?
        let relatedTarget = event.relatedTarget;

        while (relatedTarget) {
            // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет
            // если да, то это переход внутри элемента – игнорируем
            if (relatedTarget == currentElem) return;

            relatedTarget = relatedTarget.parentNode;
        }

        // мы действительно покинули элемент
        document.querySelector(`#${currentElem.dataset.piece}`)
            .classList.remove('pie__piece--hover')
        currentElem = null;
    };
}

// Появление кнопки вверх

window.addEventListener('scroll', showUpBtn)

function showUpBtn() {
    const upBtn = document.querySelector('.up-button')

    if (!upBtn) return

    if (window.pageYOffset > document.documentElement.clientHeight / 2) {
        upBtn.classList.add('up-button--show')
    } else {
        upBtn.classList.remove('up-button--show')
    }
}

// Плавное перемещение по якорям

document.addEventListener('click', smoothScrollToAnchor)

function smoothScrollToAnchor(e) {
    const target = e.target.closest('[data-anchor]')
    if (!target) return
    e.preventDefault()

    // Скрипт, учитывающий открытое бургер-меню
    const triggerClass = document.querySelector('.menu-open')
    if (triggerClass) {
        triggerClass.classList.remove('menu-open')
    }

    const headerTopHeight = 45
    const id = target.getAttribute('href')
    const top = document.querySelector(id).getBoundingClientRect().top - headerTopHeight + window.pageYOffset

    window.scrollTo({
        top: top,
        behavior: 'smooth'
    })
}