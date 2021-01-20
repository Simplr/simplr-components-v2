import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement } from '@simplr-wc/core';

@CustomElement('simplr-footer')
export default class SimplrFooter extends SimplrComponentBase {
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
            position: absolute;
            display: flex;
            width: 100%;
            bottom: 0;
            left: 0;
            min-height: 4rem;
            background: rgb(60, 60, 60);
            color: #FFF;
            justify-content: space-between;
            padding: 0px 10%;
            box-sizing: border-box;
            box-shadow: 0px -1px 4px 0px #444745
          }

          ::slotted(*) {
            flex-basis: 30%;
            padding: 1.5%;
          }
      `;
    }
}
