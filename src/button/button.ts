import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css } from '@simplr-wc/core';

@CustomElement('simplr-button')
export default class SimplrButton extends SimplrComponentBase {
    // Button status
    @Property({ reflect: true })
    disabled: boolean = false;
    // Button style
    @Property({ reflect: true })
    outlined: boolean = false;
    @Property({ reflect: true })
    contained: boolean = false;
    @Property({ reflect: true })
    elevated: boolean = false;

    // Button types
    @Property({ reflect: true })
    primary: boolean = false;
    @Property({ reflect: true })
    secondary: boolean = false;
    @Property({ reflect: true })
    success: boolean = false;

    // Button props
    @Property({ reflect: true })
    type: string = 'button';
    @Property({})
    buttonElem: HTMLButtonElement | undefined;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.tabIndex = 0;
        this.createButton();
        this.addEventListeners();
    }

    updated() {
        this.updateButtonAttributes();
    }

    private addEventListeners() {
        this.addEventListener('keyup', this.handleKeyboardEvent.bind(this));
        this.addEventListener(
            'click',
            e => {
                // Don't bubble the click event from this one. Bubble it from the actual button
                if (e.target === this) {
                    e.stopPropagation();
                    this.doClick();
                }
            },
            true,
        );
    }

    private handleKeyboardEvent(e: KeyboardEvent) {
        if (e.key === ' ' || e.key === 'Enter') {
            this.doClick();
        }
    }

    private doClick() {
        this.buttonElem?.click();
    }

    private createButton() {
        this.buttonElem = document.createElement('button');
        this.buttonElem.tabIndex = -1;
        this.appendChild(this.buttonElem);
        this.updateButtonAttributes();
    }

    private updateButtonAttributes() {
        if (this.buttonElem) {
            this.buttonElem.type = this.type;
        }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        (this as any)[name] = newValue === '' ? true : newValue;
    }

    static get observedAttributes() {
        return ['disabled', 'type', 'primary', 'secondary', 'success', 'outlined', 'contained', 'elevated'];
    }

    get html(): TemplateResult {
        return html`<slot></slot>`;
    }

    get css(): string {
        return css`
            :host {
                --primary-color: #0087d7;
                --secondary-color: #f94416;
                --success-color: #41d888;

                --main-color: transparent;
                --text-color: var(--main-color);
                --ripple-color: var(--main-color);

                --size: 16px;

                position: relative;
                display: flex;
                align-items: center;
                text-align: center;
                font-size: var(--size);

                width: fit-content;
                cursor: pointer;
                line-height: 36px;
                padding: 0 16px;
                border-radius: 4px;
                outline: none;

                transition: 200ms ease-in-out;
                transition-property: background;

                background-color: transparent;
                color: var(--text-color);

                overflow: hidden;
            }

            :host([contained]) {
                background-color: var(--main-color);
                --text-color: #fff;
                --ripple-color: var(--text-color);
                font-weight: 700;
            }

            :host([outlined]) {
                border: 2px solid var(--main-color);
                --ripple-color: var(--text-color);
            }

            :host([elevated]) {
                --text-color: #fff;
                --ripple-color: var(--text-color);
                background-color: var(--main-color);
                font-weight: 700;
                box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                    0px 1px 8px 0px rgba(0, 0, 0, 0.12);
            }

            :host([primary]) {
                --main-color: var(--primary-color);
            }
            :host([secondary]) {
                --main-color: var(--secondary-color);
            }
            :host([success]) {
                --main-color: var(--success-color);
            }

            :host(:focus) {
            }

            :host::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--ripple-color);
                opacity: 0;
                transition: 200ms ease-in-out;
                pointer-events: none;
            }

            :host(:hover)::after,
            :host(:focus-visible)::after {
                opacity: 0.3;
            }

            :host::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                margin: auto;
                background: var(--ripple-color);
                opacity: 0;
                transform: scale(8);
                transition: 600ms ease-in-out;
                pointer-events: none;
            }

            :host(:active)::before {
                opacity: 0.5;
                transform: scale(0);
                transition: 0ms;
            }

            ::slotted(svg) {
                fill: var(--text-color);
                height: var(--size);
                width: var(--size);
                padding-right: calc(var(--size) * 0.7);
            }

            ::slotted(button) {
                position: absolute;
                top: 0;
                left: 0;
                height: 0;
                width: 0;
                padding: 0;
                border: 0;
            }
        `;
    }
}
