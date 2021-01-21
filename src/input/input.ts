import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css } from '@simplr-wc/core';

@CustomElement('simplr-input')
export default class SimplrInput extends SimplrComponentBase {
    @Property({})
    type: string = 'text';
    @Property({})
    input: HTMLInputElement | undefined;
    @Property({})
    label: HTMLLabelElement | undefined;
    @Property({ reflect: true })
    hasContent: boolean = false;
    @Property({ reflect: true })
    invalid: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.input = this.querySelector('input') as HTMLInputElement | undefined;
        this.label = this.querySelector('label') as HTMLLabelElement | undefined;
        this.addListeners();
    }

    private addListeners(): void {
        this.input?.addEventListener('input', this.handleInput.bind(this));
    }

    private handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        const hasContent = target.value.length > 0;
        if (!hasContent && this.hasContent) {
            this.hasContent = false;
        }
        if (hasContent && !this.hasContent) {
            this.hasContent = true;
        }
    }

    get html(): TemplateResult {
        return html`<slot></slot>`;
    }

    get css(): string {
        return css`
            :host {
                display: block;
                width: 100%;
                position: relative;
                padding: 1rem 0 0;
                overflow: visible;

                --primary-color: #0087d7;
                --secondary-color: #f94416;
                --background-color: #3c3c3c;

                --highlight-color: var(--primary-color);

                --font-size: 16px;
                --transition: 300ms ease-in-out;
            }

            :host([invalid]) {
                --highlight-color: var(--secondary-color);
            }

            ::slotted(label) {
                position: absolute;
                opacity: 0.4;
                font-size: calc(var(--font-size) * 0.8);
                transition: var(--transition);
                transform-origin: left;
                bottom: 6px;
            }

            ::slotted(input) {
                width: 100%;
                height: 100%;
                font-size: inherit;
                border: none;
                position: relative;
                outline: none;
                background: transparent;
                font-size: calc(var(--font-size) * 0.8);
                padding-bottom: 6px;
            }

            :host::before,
            :host::after {
                content: '';
                display: block;
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                z-index: 1;
            }

            :host::before {
                width: 100%;
                background: var(--background-color);
                opacity: 0.4;
            }

            :host::after {
                width: 0;
                background: var(--highlight-color);
                transition: var(--transition);
                right: 0;
                margin: 0 auto;
            }

            /* Focus events */

            :host(:focus-within)::after {
                width: 100%;
            }

            /* TODO: Make label better looking */
            :host(:focus-within) ::slotted(label),
            :host([hasContent]) ::slotted(label) {
                transform: scale(0.6) translate(0, calc(var(--font-size) * -1.5));
                opacity: 0.9;
            }
        `;
    }
}
