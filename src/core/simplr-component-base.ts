import { TemplateResult } from 'lit-html';
import { renderComponent } from './render';

export default abstract class SimplrComponentBase extends HTMLElement {
    static _is: string | undefined = undefined;

    _properties: ComponentProperties = new Map();
    _renderRequested: boolean = false;

    constructor() {
        super();
        this.requestRender();
    }

    //TODO: Create Interface objects and payloads
    beforeRender(): void {}

    //TODO: Create Interface objects and payloads
    afterRender(): void {}

    //TODO: Create Interface objects and payloads
    updated(): void {}

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

    abstract get html(): TemplateResult;
    abstract get css(): string;
}

export type ComponentProperties<T = any> = keyof T extends PropertyKey ? Map<keyof T, unknown> : never;
