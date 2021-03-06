import { TemplateResult } from 'lit-html';
import { UpdatedProperties } from './decorators';
import { renderComponent } from './render';

export abstract class SimplrComponentBase extends HTMLElement {
    static _is: string | undefined = undefined;

    _properties: ComponentProperties = new Map();
    _renderRequested: boolean = false;
    _updatedProperties: UpdatedProperties = new Map();
    _willUpdate: boolean = false;

    constructor() {
        super();
        this.requestRender();
    }

    //TODO: Create Interface objects and payloads
    beforeRender(): void {}

    //TODO: Create Interface objects and payloads
    afterRender(): void {}

    updated(_updatedProperties: UpdatedProperties): void {}

    render(): void {
        renderComponent(this);
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        console.log('AttributeChangedCallback', { name, oldValue, newValue });
        if (oldValue === newValue) return;
    }

    public requestRender(): void {
        if (this._renderRequested) return;
        this._renderRequested = true;

        window.requestAnimationFrame(() => {
            this.beforeRender();
            this.render();
            this.afterRender();
            this._renderRequested = false;
        });
    }

    publish(eventName: string, eventPayload: any) {
        const event: Event = new CustomEvent(eventName, { detail: eventPayload });
        this.dispatchEvent(event);
    }

    _queuePropertyUpdate(name: string, oldValue: unknown) {
        // Set updated property to map of updated
        this._updatedProperties.set(name, oldValue);
        // If already going to update, don't re-trigger
        if (this._willUpdate) return;
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

    abstract get html(): TemplateResult;
    abstract get css(): string;
}

export type ComponentProperties<T = any> = keyof T extends PropertyKey ? Map<keyof T, unknown> : never;
