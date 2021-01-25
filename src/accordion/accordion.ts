import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css } from '@simplr-wc/core';

@CustomElement('simplr-accordion')
export default class SimplrAccordion extends SimplrComponentBase {
    @Property({})
    contentHeight: number = 0;

    @Property({ reflect: true })
    open: boolean = false;

    @Property({ reflect: true })
    first: boolean = false;
    @Property({ reflect: true })
    last: boolean = false;

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
                padding: 1rem;
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
