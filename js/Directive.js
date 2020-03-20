export class Directive {
    renderedState = null;

    constructor(element, config, component) {
        this.config = this.getDataFromConfig(config);
        this.element = element;
        this.component = component;
        console.log(this.config)
    }

    getDataFromConfig(config) {
       /* if(typeof JSON.parse(config) === 'object') {
            console.log(this.config);
            return JSON.parse(config);
        } else {
            return config;
        }*/
       try {
           return JSON.parse(config);
       } catch (e) {
           return config
       }
    }

    /*checkUpdates(newState) {
        return true;
    }

    render(newState) {
        if (this.checkUpdates(newState)) {
            this.applyState(newState);
            this.renderedState = newState;
        }
    }


    applyState(newState) {
        // How to transform state to element
    }
*/
}

export class ForDirective extends Directive {
    constructor(...props) {
        super(...props);

    }

}
export class AttributeDirective extends Directive {
    constructor(...props) {
        super(...props);
    }

    render() {
        for(let atr in this.config) {
            this.element.setAttribute(atr, this.component.state[atr])
        }
    }

}
export class TextDirective extends Directive {
    constructor(...props) {
        super(...props);
    }

    render() {
        this.element.textContent = this.component.state[this.config];
    }


}
export class ClassDirective extends Directive {
    constructor(...props) {
        super(...props);
        this.render()
    }

    render() {
        for(let className in this.config) {
            this.element.classList.add(this.component.state[className]);
        }
    }

}
export class IfDirective extends Directive {
    constructor(...props) {
        super(...props);
    }
}

export class PutDirective extends Directive {
    constructor(...props) {
        super(...props);
    }
}
