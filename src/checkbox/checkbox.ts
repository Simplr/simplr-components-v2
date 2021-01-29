import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css, UpdatedProperties } from '@simplr-wc/core';

@CustomElement('simplr-checkbox')
export default class SimplrCheckbox extends SimplrComponentBase {
    @Property({ reflect: true })
    label: string = '';
    @Property({ reflect: true })
    name: string = '';

    @Property({ reflect: true })
    disabled: boolean = false;
    @Property({ reflect: true })
    checked: boolean = false;

    @Property({ reflect: true })
    primary: boolean = false;
    @Property({ reflect: true })
    secondary: boolean = false;
    @Property({ reflect: true })
    success: boolean = false;

    @Property({})
    inputElem: HTMLInputElement | undefined;
    @Property({})
    labelElem: HTMLLabelElement | undefined;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.createInputComponent();
        this.addListeners();
    }

    updated(_updatedProperties: UpdatedProperties) {
        this.updateInputAttributes(_updatedProperties);
    }

    private addListeners() {
        this.inputElem?.addEventListener('input', (e: Event) => {
            console.log(e);
            const input = e.target as HTMLInputElement;
            this.checked = input.checked;
        });
        this.addEventListener('click', () => {
            this.checked = !this.checked;
        });
    }

    private createInputComponent() {
        this.inputElem = document.createElement('input');
        this.inputElem.type = 'checkbox';
        this.labelElem = document.createElement('label');

        this.appendChild(this.inputElem);
        this.appendChild(this.labelElem);
    }

    private updateInputAttributes(_updatedProperties: UpdatedProperties) {
        if (this.inputElem) {
            this.inputElem.name = this.name;
            this.inputElem.id = `checkbox-${this.name}`;
            this.inputElem.checked = this.checked;
            this.inputElem.disabled = this.disabled;
        }
        if (this.labelElem) {
            if (_updatedProperties.has('label') || _updatedProperties.has('name')) {
                this.labelElem.innerText = this.label;
                this.labelElem.setAttribute('for', `checkbox-${this.name}`);
            }
        }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        (this as any)[name] = newValue === '' ? true : newValue;
    }

    static get observedAttributes() {
        return ['label', 'name', 'disabled', 'checked', 'primary', 'secondary', 'success'];
    }

    get html(): TemplateResult {
        return html`<div class="checkbox-field">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1.5 12.5 l7.5 6 l12 -15" /></svg>
            </div>
            <slot></slot>`;
    }

    get css(): string {
        return css`
            :host {
                --primary-color: #0087d7;
                --secondary-color: #f94416;
                --success-color: #41d888;

                --main-color: #000;
                --size: 16px;
                display: flex;
                width: fit-content;
                justify-content: center;
                align-items: center;
                cursor: pointer;
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

            ::slotted(input) {
                width: 0;
                height: 0;
                margin: 0;
                padding: 0;
                position: absolute;
                top: 0;
                left: 0;
            }

            .checkbox-field {
                width: var(--size);
                height: var(--size);
                border: 1px solid #000;
                border-radius: 2px;
                margin: 0 calc(var(--size) / 2);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: 800ms ease-in-out;
                background: #fff;
                position: relative;
            }

            .checkbox-field svg {
                width: var(--size);
                height: var(--size);
                fill: none;
                stroke: red;
            }

            .checkbox-field path {
                stroke-dashoffset: 40px;
                stroke-dasharray: 40px;
                stroke: #fff;
                stroke-width: 3px;
                transition: 600ms ease-in-out;
            }

            :host([checked]) .checkbox-field path {
                stroke-dashoffset: 0;
            }

            :host([checked]) .checkbox-field {
                background: var(--main-color);
                transition: 300ms ease-in-out;
                border: 1px solid var(--main-color);
            }

            .checkbox-field::before,
            .checkbox-field::after {
                content: '';
                position: absolute;
                top: calc(var(--size) / 2 * -1);
                left: calc(var(--size) / 2 * -1);
                margin: auto;
                width: 200%;
                height: 200%;
                border-radius: 50%;
            }

            :host([checked]) .checkbox-field::before {
                background: var(--main-color);
            }

            .checkbox-field::before {
                background: #000;
                opacity: 0;
                z-index: -2;
                transition: opacity 200ms ease-in-out;
            }

            :host(:hover) .checkbox-field::before {
                opacity: 0.05;
            }

            :host([checked]:hover) .checkbox-field::before {
                opacity: 0.3;
            }

            :host(:active) .checkbox-field::before {
                opacity: 0;
            }

            .checkbox-field::after {
                z-index: -1;
                background: var(--main-color);
                transform: scale(1);
                opacity: 0;
                transition: transform 300ms ease-in-out, opacity 700ms ease-in-out;
            }

            :host(:active) .checkbox-field::after {
                transform: scale(0);
                opacity: 0.9;
                transition: 0ms;
            }

            ::slotted(*) {
                cursor: pointer;
            }
        `;
    }
}
