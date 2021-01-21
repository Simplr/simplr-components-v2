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
            handleAttributeReflection(this, name.toString(), value, _opts.reflect);
            this._queuePropertyUpdate(name.toString(), oldValue);
        };
        Object.defineProperty(prototype, name, {
            get: getter,
            set: setter,
        });
    };
}
function handleAttributeReflection(_this, name, value, reflect) {
    if (!reflect || typeof reflect === 'undefined')
        return;
    const nameL = name.toLowerCase();
    switch (typeof value) {
        case 'boolean': {
            if (value) {
                _this.setAttribute(nameL, '');
            }
            else {
                _this.removeAttribute(nameL);
            }
            break;
        }
        case 'string': {
            if (value == null) {
                _this.removeAttribute(nameL);
            }
            else {
                _this.setAttribute(nameL, value);
            }
            break;
        }
    }
}
//# sourceMappingURL=decorators.js.map