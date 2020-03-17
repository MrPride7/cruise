(async function() {
    renderCruiseList(await fetchJSON('./cruisesData.json'), 'cruiseTemplate');
})();

const list = document.getElementById('cruises-list');
list.addEventListener('click', deleteCard);
list.addEventListener('click', editCard);
const addCruise = document.getElementById('add-cruise');
addCruise.addEventListener('click', addCard);

async function fetchJSON(url) {
    return fetch(url)
        .then(response => response.json())
}

function renderCruiseList(dataArr, templateId) {
    const template = document.getElementById(templateId);
    const cruisesList = document.getElementById('cruises-list');

    for (let item of dataArr) {
        const elemForRender = renderElem(item, template);
        cruisesList.appendChild(elemForRender);
    }
}

function renderElem(dataItem = null, template) {
    const copy = template.content.cloneNode(true);
    let complexElems = copy.querySelectorAll("[data-component]");
    let simpleElems = copy.querySelectorAll("[data-text]");
    if(complexElems) {
        for(let elem of complexElems) {
            fillElemWithData(elem, dataItem[elem.dataset.component])
        }
    }
    if(simpleElems) {
        for(let elem of simpleElems) {
            fillTextContent(elem, dataItem[elem.dataset.text]);
        }
    }
    return copy;
}

function fillElemWithData(elem, data) {
    let dataTypes = {};
    dataTypes = JSON.parse(elem.dataset[elem.dataset.component]);
    for(let dataItem in data) {
        for(let dataType in dataTypes) {

            if(dataType === 'atr') {
                elem.setAttribute(dataItem, data[dataItem]);
            }
            if(dataType === 'class') {
                elem.classList.remove('display-none');
                for(let clas of dataTypes[dataType]) {
                    elem.classList.add(data[dataTypes[dataType]]);
                }
            }
            if(dataType === 'text') {
                fillTextContent(elem, data[dataTypes[dataType]])
            }
        }
    }

}

function fillTextContent(elem, text) {
    elem.textContent = text
}

async function editCard(e) {
    const cruiseCard = getCard(e);
};

async function deleteCard(e) {

    e.stopPropagation();

    const cruiseCard = getCard(e);
    const data = await fetchJSON('./cruisesData.json');

    if(cruiseCard) {
        const requiredData = getRequiredData(cruiseCard);
        data.splice(data.indexOf(requiredData), 1);
        cruiseCard.parentElement.removeChild(cruiseCard);
    }
}

function getCard(e) {
    if(e.target.id !== 'delete-cruise') {
        return;
    }
    return e.target.parentElement;
}

async function getRequiredData(elemForUpdate) {
    const title = elemForUpdate.querySelector('.cruise__title').textContent;
    const data = await fetchJSON('./cruisesData.json');
    return data.find(item => item.title === title);
}

async function addCard() {
    const body = document.getElementById('body');
    const popup = document.createElement('div');
    body.classList.add('body-modal');
    popup.classList.add('popup');
    popup.setAttribute('id', 'popup');
    body.append(popup);
    popup.addEventListener('click', (e) => {
        if(e.target.id === 'popup' || e.target.id === 'cancel-button') {
            body.classList.remove('body-modal');
            body.removeChild(popup);
        }
    });
    const addCruiseFormTemplate = document.getElementById('addCruiseFormTemplate');
    const form = addCruiseFormTemplate.content.cloneNode(true);
    popup.append(form);
    const cruiseTemplate = document.getElementById('cruiseTemplate');

    let dataForSend = {

    }
    const data = await fetchJSON('./cruisesData.json');
    /*const elemForRender = renderElem(item, cruiseTemplate);

    cruisesList.appendChild(elemForRender);*/
}






