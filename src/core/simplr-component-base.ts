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

    render(): void {
        renderComponent(this);
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        console.log('AttributeChangedCallback', { name, oldValue, newValue });
        if (oldValue === newValue) return;
    }

    public requestRender(): void {
        if (this._renderRequested) return;
        console.log('Render requested');
        this._renderRequested = true;

        window.requestAnimationFrame(() => {
            this.render();
            this._renderRequested = false;
        });
    }

    abstract get html(): TemplateResult;
    abstract get css(): string;
}

export type ComponentProperties<T = any> = keyof T extends PropertyKey ? Map<keyof T, unknown> : never;
