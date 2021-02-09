import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css } from '@simplr-wc/core';

@CustomElement('simplr-example')
export default class SimplrExample extends SimplrComponentBase {
    @Property({ reflect: true })
    disabled: boolean = false;
    @Property({ reflect: true })
    type: string = 'button';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    get html(): TemplateResult {
        return html`<slot></slot>`;
    }

    get css(): string {
        return css`
            :host {
                display: flex;
                width: min-content;
            }

            ::slotted(*) {
            }
        `;
    }
}
