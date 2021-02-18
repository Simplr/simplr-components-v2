import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css, UpdatedProperties } from '@simplr-wc/core';

@CustomElement('simplr-radio')
export default class SimplrRadio extends SimplrComponentBase {
    @Property({ reflect: true })
    label: string = '';
    @Property({ reflect: true })
    name: string = '';
    @Property({ reflect: true })
    value: string = '';

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
        this.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            if (this.inputElem) {
                this.inputElem.click();
            }
        });
        window.requestAnimationFrame(() => {
            document.querySelectorAll(`input[name='${this.name}']`).forEach(radio => {
                radio.addEventListener('input', e => {
                    const target = e.target as SimplrRadio;
                    if (target.value === this.value) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                });
                radio.addEventListener('click', e => e.stopPropagation());
            });

            this.labelElem?.addEventListener(
                'click',
                () => {
                    if (this.inputElem) {
                        this.inputElem.click();
                    }
                },
                true,
            );
        });
    }

    private createInputComponent() {
        this.inputElem = document.createElement('input');
        this.inputElem.type = 'radio';
        this.labelElem = document.createElement('label');

        this.appendChild(this.inputElem);
        this.appendChild(this.labelElem);
    }

    private updateInputAttributes(_updatedProperties: UpdatedProperties) {
        if (this.inputElem) {
            this.inputElem.name = this.name;
            this.inputElem.id = `radio-${this.value}`;
            this.inputElem.value = this.value;
            this.inputElem.checked = this.checked;
            this.inputElem.disabled = this.disabled;
        }
        if (this.labelElem) {
            if (_updatedProperties.has('label') || _updatedProperties.has('name')) {
                this.labelElem.innerText = this.label;
                this.labelElem.setAttribute('for', `radio-${this.value}`);
            }
        }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        (this as any)[name] = newValue === '' ? true : newValue;
    }

    static get observedAttributes() {
        return ['value', 'label', 'name', 'disabled', 'checked', 'primary', 'secondary', 'success', 'indeterminate'];
    }

    get html(): TemplateResult {
        return html`<div class="radio-field">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="" /></svg>
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

            .radio-field {
                width: var(--size);
                height: var(--size);
                border: 1px solid #000;
                border-radius: 50%;
                margin: 0 calc(var(--size) / 2);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: 800ms ease-in-out;
                background: #fff;
                position: relative;
            }

            .radio-field svg {
                width: var(--size);
                height: var(--size);
                fill: none;
                stroke: red;
            }

            .radio-field path {
                stroke-dashoffset: 40px;
                stroke-dasharray: 40px;
                stroke: #fff;
                stroke-width: 3px;
                transition: 600ms ease-in-out;
            }

            :host([checked]) .radio-field path {
                stroke-dashoffset: 0;
                d: path('M1.5 12.5 l7.5 6 l12 -15');
            }

            :host([checked]) .radio-field {
                background: var(--main-color);
                transition: 300ms ease-in-out;
                border: 1px solid var(--main-color);
            }

            :host([checked]) .radio-field::before {
                background: var(--main-color);
            }

            :host([checked]:hover) .radio-field::before {
                opacity: 0.3;
            }

            .radio-field::before,
            .radio-field::after {
                content: '';
                position: absolute;
                top: calc(var(--size) / 2 * -1);
                left: calc(var(--size) / 2 * -1);
                margin: auto;
                width: 200%;
                height: 200%;
                border-radius: 50%;
            }

            .radio-field::before {
                background: #000;
                opacity: 0;
                z-index: -2;
                transition: opacity 200ms ease-in-out;
            }

            :host(:focus-within) .radio-field::before,
            :host(:hover) .radio-field::before {
                opacity: 0.2;
            }

            :host(:active) .radio-field::before {
                opacity: 0;
            }

            .radio-field::after {
                z-index: -1;
                background: var(--main-color);
                transform: scale(1);
                opacity: 0;
                transition: transform 300ms ease-in-out, opacity 700ms ease-in-out;
            }

            :host(:active) .radio-field::after {
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
