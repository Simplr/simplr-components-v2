import SimplrComponentBase from './simplr-component-base';

type Constructor<T> = {
    new (...args: any[]): T;
    _is: string;
};

export type PropertyOptions = {
    reflect?: boolean;
    type?: any;
    default?: any;
    value?: any;
};

const defaultPropertyOptions: PropertyOptions = {
    type: String,
    reflect: false,
};

export function CustomElement<T extends SimplrComponentBase>(componentName: string): Function {
    return function (componentInstance: Constructor<SimplrComponentBase>) {
        componentInstance._is = componentName;
        if (!customElements.get(componentName)) {
            customElements.define(componentName, componentInstance);
        }
    };
}

export function Property(opts: PropertyOptions) {
    return function (prototype: SimplrComponentBase, name: PropertyKey) {
        const getter = function (this: SimplrComponentBase) {
            console.log('Getting value', name.toString());
            return this._properties.get(name);
        };

        const setter = function (this: SimplrComponentBase, value: any) {
            console.log('Setting value ' + name.toString() + ' to ', value);
            this._properties.set(name, value);
            this.requestRender();
        };

        Object.defineProperty(prototype, name, {
            get: getter,
            set: setter,
        });
    };
}
