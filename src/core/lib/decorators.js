export function CustomElement(componentName) {
    return function (componentInstance) {
        componentInstance._is = componentName;
        if (!customElements.get(componentName)) {
            customElements.define(componentName, componentInstance);
        }
    };
}
export function Property(_opts) {
    // TODO: Property type checks
    return function (prototype, name) {
        const getter = function () {
            return this._properties.get(name);
        };
        const setter = function (value) {
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
//# sourceMappingURL=decorators.js.map