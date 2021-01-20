import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement } from '@simplr-wc/core';

@CustomElement('simplr-toaster')
export default class SimplrToaster extends SimplrComponentBase {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    get html(): TemplateResult {
        return html` <slot></slot> `;
    }

    get css(): string {
        return `
      `;
    }
}
