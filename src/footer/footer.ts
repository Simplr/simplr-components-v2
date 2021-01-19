import { html, TemplateResult } from 'lit-html';
import { CustomElement, Property } from '../core/decorators';
import SimplrComponentBase from '../core/simplr-component-base';

@CustomElement('simplr-footer')
export default class SimplrFooter extends SimplrComponentBase {
    @Property({ type: Array })
    testProperties: Array<Number> = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    get html(): TemplateResult {
        return html`
            <slot></slot>
            ${this.testProperties.map(tp => {
                return html`<p>${tp}</p>`;
            })}
        `;
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
            padding: 0px 2%;
            align-items: center;
            box-sizing: border-box;
            box-shadow: 0px -1px 4px 0px #444745
          }
      `;
    }
}
