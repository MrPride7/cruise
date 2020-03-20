import {Store} from "./store.js"

const list = document.getElementById('cruises-list');
list.addEventListener('click', deleteCard);
list.addEventListener('click', editCard);
const addFormButton = document.getElementById('addFormButton');
addFormButton.addEventListener('click', openAddForm);

const store = new Store({});

(async function () {
  const state = store.state;
  state.cardList = await fetchJSON('./cruisesData.json');


  renderCruiseList(state.cardList);
})();

async function fetchJSON(url) {
  return fetch(url)
    .then(response => response.json())
}

function renderCruiseList(dataList) {
  console.log(dataList);
  const template = document.getElementById('cruiseTemplate');
  const cruisesList = document.getElementById('cruises-list');

  const listOfCruises = cruisesList.querySelectorAll('li');

  //Этот код отвечает за добавление новых элементов
  for (let item of dataList) {
      if (!Array.from(listOfCruises).find(cruise => cruise.dataset.id === item.id)) {
          renderElem(item, template, cruisesList);
      }
  }
  for(let cruise of listOfCruises) {
    if(!dataList.find(dataItem => cruise.dataset.id === dataItem.id)) {
      cruisesList.removeChild(cruise);
    }
  }
}

//Этот рендерит любой элемент, который дадут
function renderElem(data = null, template, renderTarget) {
  const copy = template.content.cloneNode(true);
  const copiedElem = copy.firstElementChild;
  copiedElem.dataset.id = data.id;

  const complexElems = copiedElem.querySelectorAll("[data-component]");
  const simpleElems = copiedElem.querySelectorAll("[data-text]");

  if (complexElems) {
    for (let elem of complexElems) {
      fillElemWithData(elem, data[elem.dataset.component])
    }
  }
  if (simpleElems) {
    for (let elem of simpleElems) {
      fillTextContent(elem, data[elem.dataset.text]);
    }
  }
  renderTarget.append(copiedElem);
}

function fillElemWithData(elem, data) {
  let dataTypes = {};
  dataTypes = JSON.parse(elem.dataset[elem.dataset.component]);

  for (let dataItem in data) {
    for (let dataType in dataTypes) {

      if (dataType === 'atr') {
        for (let atr of dataTypes[dataType]) {
          elem.setAttribute(atr, data[atr]);
        }
      }
      if (dataType === 'class') {
        elem.classList.remove('display-none');

        for (let clas of dataTypes[dataType]) {
          elem.classList.add(data[clas]);
        }
      }
      if (dataType === 'text') {
        fillTextContent(elem, data[dataTypes[dataType]])
      }
    }
  }
}

function fillTextContent(elem, text) {
  elem.textContent = text
}

function editCard(e) {
  console.log('edit');
}

function deleteCard(e) {

  e.stopPropagation();
  if (e.target.id === 'deleteCruise') {

    const cruiseCard = e.target.parentElement;
    const cardList = store.state.cardList;
    const indexDataForDelete = cardList.findIndex(card => card.id === cruiseCard.dataset.id);

    if (typeof indexDataForDelete !== 'undefined') {
      cardList.splice(indexDataForDelete, 1);

      renderCruiseList(cardList);
    } else {
      console.error('no data with such id')
    }
  } else {
    return;
  }
}

function openAddForm() {
  const body = document.getElementById('body');
  const popup = document.createElement('div');
  body.classList.add('body-modal');
  popup.classList.add('popup');
  popup.setAttribute('id', 'popup');
  body.append(popup);
  popup.addEventListener('click', (e) => {
    if (e.target.id === 'popup' || e.target.id === 'cancel-button' || e.target.id === 'add-button') {
      body.classList.remove('body-modal');
      body.removeChild(popup);
    }
  });
  const addCruiseFormTemplate = document.getElementById('addCruiseFormTemplate');
  const form = addCruiseFormTemplate.content.cloneNode(true);
  const addButton = form.getElementById('add-button');
  addButton.addEventListener('click', addCard);
  popup.append(form);
}

function addCard(e) {
  let obj = {
    id: "1",
    image: {
      src: "assets/img/tablet/anapa-m.jpg",
      alt: "Морской круиз в Анапу"
    },
    title: "Морской круиз в Анапу",
    route: "Сочи-Лазаревское-Геленджик-Анапа",
    duration: "10 ч. 0 мин.",
    price: "49 000 руб.",
    tag: {
      value: "Хит",
      category: "best"
    }
  };


  e.preventDefault();
  const cardList = store.state.cardList;

  let idForSet = 0;

  for (let card of cardList) {
    if (Number(card.id) > Number(idForSet)) {
      idForSet = card.id;
    }
    if (cardList.indexOf(card) === cardList.length - 1) {
      idForSet++;
      idForSet = String(idForSet);
    }
  }
  obj.id = idForSet;
  cardList.push(obj);
  renderCruiseList(cardList);
}











