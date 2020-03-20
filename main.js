import {Store} from "./js/Store.js";
import {Component, CruisesList} from "./js/Component.js";
import {Directive} from "./js/Directive.js";

(async function () {
    const initState = await fetchJSON('./cruisesData.json');
    const store = new Store({cruises: initState});
    /*const AppComponentTemplate = document.getElementById('app-component');
    const AppComponent = new CruisesList(store.state.cruises, AppComponentTemplate);*/

    const testData = {id: "3",
        src: "assets/img/tablet/gelendzhik-m.jpg",
        alt: "Морская прогулка в Геледжик",
        title: "Морская прогулка в Геледжик",
        route: "Сочи-Туапсе-Геленджик",
        duration: "12 ч. 30 мин.",
        price: "10 000 руб.",
        oldPrice: "15 000 руб.",
        value: "Акция!",
        category: "stock"
    };
    const CruiseComponentTemplate = document.getElementById('cruise-component');
    const CruiseComponent = new Component(testData, CruiseComponentTemplate);
    console.log(CruiseComponent);
    document.getElementById('cruises-list').append(CruiseComponent.render())

})();

async function fetchJSON(url) {
    let data = await fetch(url);
    return data.json();
}



