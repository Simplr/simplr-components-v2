import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement } from '@simplr-wc/core';

@CustomElement('simplr-loading')
export default class SimplrLoading extends SimplrComponentBase {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    get html(): TemplateResult {
        return html` <slot></slot> `;
    }

    get css(): string {
        return `
          :host {
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100vw;
            height: 100vh;
          }
      `;
    }
}
