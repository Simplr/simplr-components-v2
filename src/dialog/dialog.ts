import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css } from '@simplr-wc/core';

@CustomElement('simplr-dialog')
export default class SimplrDialog extends SimplrComponentBase {
    @Property({ reflect: true })
    visible: boolean = false;
    @Property({ reflect: true })
    hideclose: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    public async open(): Promise<void> {
        // One for the money
        await this.getFrame();
        // Two for the show
        await this.getFrame();
        // In all seriousness, the first is for the Custom Element to land on DOM,
        // the second if for the content inside it to land on the DOM
        this.visible = true;
    }

    private getFrame(): Promise<void> {
        return new Promise(resolve => window.requestAnimationFrame(() => resolve()));
    }

    public close(): void {
        this.shadowRoot?.querySelector('.dialog-area')?.addEventListener('transitionend', () => {
            this.remove();
        });
        this.visible = false;
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        switch (name) {
            case 'visible':
            case 'hideclose':
                (this as any)[name] = newValue === '';
                break;
            default:
                (this as any)[name] = newValue;
        }
    }

    static get observedAttributes() {
        return ['hideclose', 'visible'];
    }

    get html(): TemplateResult {
        return html`
            <div class="dialog-area">
                ${this.createCloseArea()}
                <slot></slot>
            </div>
        `;
    }

    private createCloseArea(): TemplateResult {
        if (this.hideclose) return html``;
        return html`<div class="close-button" @click=${this.close.bind(this)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                />
            </svg>
        </div>`;
    }

    get css(): string {
        return css`
            :host {
                --padding: 1rem;
            }

            .dialog-area {
                display: flex;
                min-width: 540px;
                width: min-content;
                min-height: 100px;
                height: min-content;
                opacity: 0;
                transition: 200ms ease-in-out;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                transform: translate(0, -40px);
                box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                    0px 1px 8px 0px rgba(0, 0, 0, 0.12);
                border-radius: 4px;
            }

            :host([visible]) .dialog-area {
                z-index: 100;
                background: #fff;
                opacity: 1;
                transform: translate(0, 0);
                transition: 400ms ease-in-out;
            }

            :host::after {
                opacity: 0;
                transition: 350ms ease-in-out opacity;
                content: '';
                background: #4a4a4a;
                position: fixed;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                visibility: none;
                pointer-events: none;
            }

            :host([visible]):after {
                opacity: 0.7;
            }

            .close-button {
                position: absolute;
                top: 1rem;
                right: 1rem;
                cursor: pointer;
            }

            slot {
                display: flex;
                flex-direction: column;
                padding: var(--padding);
            }
        `;
    }
}
