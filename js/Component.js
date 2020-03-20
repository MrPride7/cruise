import {
    Directive,
    ForDirective,
    AttributeDirective,
    ClassDirective,
    IfDirective,
    TextDirective,
    PutDirective
} from "./Directive.js";

export class Component {

    directivesConstructors = {
        'for': (elem, config, component) => new ForDirective(elem, config, component),
        'text': (elem, config, component) => new TextDirective(elem, config, component),
        'if': (elem, config, component) => new IfDirective(elem, config, component),
        'class': (elem, config, component) => new ClassDirective(elem, config, component),
        'atr': (elem, config, component) => new AttributeDirective(elem, config, component),
        'put': (elem, config, component) => new PutDirective(elem, config, component)
    };

    constructor(state, template) {
        this.state = state;
        this.element = template.content.cloneNode(true);
        this.directivesMap = this.getDirectiveElementMap();
    }

    getDirectiveElementMap() {
        let directivesMap = {};

        for (let directiveKey in this.directivesConstructors) {
            let elementsWithAppropriateDirective = this.element.querySelectorAll(`[data-${directiveKey}]`);

            let directives = Array.from(elementsWithAppropriateDirective).map(element => this.directivesConstructors[directiveKey](element, element.dataset[directiveKey], this));

            Object.defineProperty(directivesMap, directiveKey, {
                value: directives,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        return directivesMap;
    }

    render() {
        console.log(this.directivesMap)
        for(let directiveName in this.directivesMap) {
            for(let directive of this.directivesMap[directiveName]) {
                directive.render(); // TODO
            }
        }
        return this.element;
    }
}

export class CruisesList extends Component {
    constructor(state, element) {
        super(state, element);
        this.state = {
            cruises: state
        }
    }
}
