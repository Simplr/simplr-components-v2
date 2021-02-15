import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css } from '@simplr-wc/core';

/**
 *   A Accordion element From Simplr Components
 *
 *   Usage
 *
 *   <simplr-accordion>
 *       <label slot="label">Click me to open </label>
 *       <span>
 *           <h2>Let's create something awesome together</h2>
 *           <p>My Name:</p>
 *           <p><b>Phone:</b> +22 1231233</p>
 *           <p><b>Email</b> john.doe@foobar.dot</p>
 *       </span>
 *   </simplr-accordion>
 *
 *   @element simplr-accordion
 *
 *   @prop {boolean} open            - Boolean that is set to true when the accordion is open
 *
 *   @attr {boolean} first           - Boolean set true on the first element in a collection of accordion
 *   @attr {boolean} last            - Boolean set true on the last element in a collection of accordion
 *
 *   @csspart [--border-color=1px solid #d6d1e0]                    - Border of the accordion elements
 *   @csspart [--label-background=none]                             - Background of the accordion label
 *   @csspart [--open-label-background=var(--primary-color)]        - Background of the accordion label when the accordion is open
 *   @csspart [--label-color=#000]                                  - Color of the accordion label
 *   @csspart [--open-label-color=#fff]                             - Color of the accordion label when the accordion is open
 *   @csspart [--label-padding=1rem 0 1rem 1rem]                    - Padding of the label of the accordion
 *   @csspart [--content-padding=1rem]                              - Padding of the accordion content
 *   @csspart [--primary-color=#0087d7]                                   - Primary color for Simplr components
 *
 *   @slot label    - Slot for the label of the accordion
 *   @slot          - Default slot for the content of the accordion
 *
 * */
@CustomElement('simplr-accordion')
export default class SimplrAccordion extends SimplrComponentBase {
    @Property({})
    contentHeight: number = 0;

    @Property({ reflect: true })
    open: boolean = false;
    @Property({ reflect: true })
    protected first: boolean = false;
    @Property({ reflect: true })
    protected last: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        window.requestAnimationFrame(() => {
            this.addListeners();
            this.setOrder();
            this.tabIndex = 0;
        });
    }

    private setOrder() {
        const accordions = this.parentNode?.querySelectorAll(SimplrAccordion._is as string);
        accordions?.forEach((acc, i) => {
            if (acc === this) {
                if (i === 0) this.first = true;
                if (i === accordions.length - 1) this.last = true;
            }
        });
    }

    private addListeners(): void {
        const labelSlot = this.shadowRoot?.querySelector('slot[name="label"]') as HTMLSlotElement;
        labelSlot?.addEventListener('click', () => {
            this.open = !this.open;
        });
        this.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key === ' ') {
                this.open = !this.open;
            }
        });
    }

    private handleSlotChange() {
        const slot = this.shadowRoot?.querySelector('slot:not([name="label"])') as HTMLSlotElement;
        this.contentHeight = slot.offsetHeight;
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        switch (name) {
            case 'open':
                this.open = newValue != null;
                break;
            default:
                (this as any)[name] = newValue;
        }
    }

    static get observedAttributes() {
        return ['open'];
    }

    get html(): TemplateResult {
        return html`<slot name="label"></slot>
            <div class="container"><slot @slotchange=${this.handleSlotChange.bind(this)}></slot></div>`;
    }

    get css(): string {
        return css`
            :host {
                --border: 1px solid #d6d1e0;
                --label-background: none;
                --open-label-background: var(--primary-color);
                --label-color: #000;
                --open-label-color: #fff;
                --label-padding: 1rem 0 1rem 1rem;
                --content-padding: 1rem;
                --primary-color: #0087d7;

                display: flex;
                width: 100%;
                color: #000;
                box-sizing: border-box;
                flex-direction: column;
                margin: 0;
                transition: 200ms ease-in-out;
                box-sizing: border-box;
                border: var(--border);
            }

            slot[name='label'],
            slot[name='label']::slotted(*) {
                box-sizing: border-box;
                cursor: pointer;
                width: 100%;
                transition: 200ms ease-in-out;
            }

            slot[name='label']::slotted(*) {
                background: var(--label-background);
                padding: var(--label-padding);
            }

            :host([open]) slot[name='label']::slotted(*) {
                background: var(--open-label-background);
                color: var(--open-label-color);
            }

            .container {
                display: block;
                height: 0px;
                overflow: hidden;
                transition: inherit;
            }

            slot:not([name='label']) {
                display: block;
                height: fit-content;
                padding: var(--content-padding);
            }

            :host([open]) {
                margin: 1rem 0;
            }

            :host([first][open]) {
                margin: 0 0 1rem;
            }

            :host([last][open]) {
                margin: 1rem 0;
            }

            :host([last]) {
                border-radius: 0 0 4px 4px;
            }

            :host([open]) .container {
                height: ${this.contentHeight}px;
            }
        `;
    }
}
