import { renderComponent } from './render';
export class SimplrComponentBase extends HTMLElement {
    constructor() {
        super();
        this._properties = new Map();
        this._renderRequested = false;
        this._updatedProperties = new Map();
        this._willUpdate = false;
        this.requestRender();
    }
    //TODO: Create Interface objects and payloads
    beforeRender() { }
    //TODO: Create Interface objects and payloads
    afterRender() { }
    updated(_updatedProperties) { }
    render() {
        renderComponent(this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('AttributeChangedCallback', { name, oldValue, newValue });
        if (oldValue === newValue)
            return;
    }
    requestRender() {
        if (this._renderRequested)
            return;
        this._renderRequested = true;
        window.requestAnimationFrame(() => {
            this.beforeRender();
            this.render();
            this.afterRender();
            this._renderRequested = false;
        });
    }
    publish(eventName, eventPayload) {
        const event = new CustomEvent(eventName, { detail: eventPayload });
        this.dispatchEvent(event);
    }
    _queuePropertyUpdate(name, oldValue) {
        // Set updated property to map of updated
        this._updatedProperties.set(name, oldValue);
        // If already going to update, don't re-trigger
        if (this._willUpdate)
            return;
        this._willUpdate = true;
        // Await for next frame, then trigger updated and render request
        window.requestAnimationFrame(() => {
            this.updated(this._updatedProperties);
            // Empty updated props
            this._updatedProperties = new Map();
            this.requestRender();
            this._willUpdate = false;
        });
    }
}
SimplrComponentBase._is = undefined;
//# sourceMappingURL=simplr-component-base.js.map