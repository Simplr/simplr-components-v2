import { SimplrComponentBase } from './simplr-component-base';

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

export type UpdatedProperties<T = any> = keyof T extends PropertyKey ? Map<keyof T, unknown> : never;

export function CustomElement<_T extends SimplrComponentBase>(componentName: string): Function {
    return function (componentInstance: Constructor<SimplrComponentBase>) {
        componentInstance._is = componentName;
        if (!customElements.get(componentName)) {
            customElements.define(componentName, componentInstance);
        }
    };
}

export function Property(_opts: PropertyOptions) {
    // TODO: Property type checks
    return function (prototype: SimplrComponentBase, name: PropertyKey) {
        const getter = function (this: SimplrComponentBase) {
            return this._properties.get(name);
        };

        const setter = function (this: SimplrComponentBase, value: any) {
            const oldValue = this._properties.get(name);
            this._properties.set(name, value);
            this._queuePropertyUpdate(name.toString(), oldValue);
        };

        Object.defineProperty(prototype, name, {
            get: getter,
            set: setter,
        });
    };
}
