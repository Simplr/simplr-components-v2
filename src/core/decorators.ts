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
            handleAttributeReflection(this, name.toString(), value, _opts.reflect);
            this._queuePropertyUpdate(name.toString(), oldValue);
        };

        Object.defineProperty(prototype, name, {
            get: getter,
            set: setter,
        });
    };
}

function handleAttributeReflection(
    _this: SimplrComponentBase,
    name: string,
    value: string | boolean,
    reflect: boolean | undefined,
) {
    if (!reflect || typeof reflect === 'undefined') return;

    const nameL = name.toLowerCase();
    switch (typeof value) {
        case 'boolean': {
            if (value) {
                _this.setAttribute(nameL, '');
            } else {
                _this.removeAttribute(nameL);
            }
            break;
        }
        case 'string': {
            if (value == null) {
                _this.removeAttribute(nameL);
            } else {
                _this.setAttribute(nameL, value);
            }
            break;
        }
    }
}
