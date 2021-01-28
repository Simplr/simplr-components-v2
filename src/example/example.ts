import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css } from '@simplr-wc/core';

@CustomElement('simplr-button')
export default class SimplrButton extends SimplrComponentBase {
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
                wdith: min-content;
            }

            ::slotted(*) {
            }
        `;
    }
}
