import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css, UpdatedProperties } from '@simplr-wc/core';

/**
 *   A Input element From Simplr Components
 *
 *   Usage
 *
 *   <simplr-input label="Testing input one" name="input-one" placeholder="Input the desired value"> </simplr-input>
 *
 *   @element simplr-input
 *
 *   @prop {string} label             - Label of input element
 *   @prop {string} type              - Type of input element
 *   @prop {string} name              - Name of input element
 *   @prop {string} placeholder       - Placeholder of input element
 *   @prop {boolean} disabled         - Boolean stating if input is disabled
 *   @prop {boolean} required         - Boolean stating if input is required
 *   @prop {string} step              - Step attribute for number inputs
 *
 *   @attr {boolean} hascontent       - Boolean set true when input has content in it
 *   @attr {boolean} invalid          - Boolean set true when input has a invalid value
 *
 *   @csspart [--primary-color=#0087d7]                     - Primary color of input element
 *   @csspart [--secondary-color=#f94416]                   - Secondary color of input element. Used for error states
 *   @csspart [--background-color=transparent]              - Background color of input element
 *   @csspart [--text-color=rgba(0,0,0,0.87)]               - Text color of input element
 *   @csspart [--underline-size=1px]                        - Size of the underline of the input elements
 *   @csspart [--highlight-color=var(--primary-color)]      - Color of the highlights used by the input
 *   @csspart [--font-size=16px]                            - Font size of the input element
 *   @csspart [--transition=200ms ease-in-out]              - Transition of the input element focus transitions
 *
 * */
@CustomElement('simplr-input')
export class SimplrInput extends SimplrComponentBase {
    @Property({})
    private inputElem: HTMLInputElement | undefined;
    @Property({})
    private labelElem: HTMLLabelElement | undefined;

    @Property({ reflect: true })
    label: string | undefined;
    @Property({ reflect: true })
    type: string = 'text';
    @Property({ reflect: true })
    name: string = '';
    @Property({ reflect: true })
    placeholder: string = '';
    @Property({ reflect: true })
    disabled: boolean = false;
    @Property({ reflect: true })
    required: boolean = false;
    @Property({ reflect: true })
    step: string | undefined;

    @Property({ reflect: true })
    hasContent: boolean = false;
    @Property({ reflect: true })
    invalid: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.createElements();
        this.addListeners();
    }

    updated(_updatedProperties: UpdatedProperties) {
        if (this.inputElem) {
            this.inputElem.disabled = this.disabled;
        }
        this.setElementAttributes(_updatedProperties);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        switch (name) {
            case 'required':
            case 'disabled':
                this[name] = newValue != null;
                break;
            default:
                (this as any)[name] = newValue;
        }
    }

    static get observedAttributes() {
        return ['disabled', 'label', 'type', 'placeholder', 'invalid', 'required', 'step'];
    }

    private createElements(): void {
        this.labelElem = document.createElement('label');
        this.appendChild(this.labelElem);

        this.inputElem = document.createElement('input');
        this.appendChild(this.inputElem);
    }

    private setElementAttributes(_changedProperties: UpdatedProperties) {
        if (this.labelElem && _changedProperties.has('label')) {
            this.labelElem.innerText = this.label || '';
        }
        if (this.inputElem) {
            this.inputElem.type = this.type;
            this.inputElem.disabled = this.disabled;
            this.inputElem.name = this.name;
            if (this.step) {
                this.inputElem.step = this.step;
            }
        }
    }

    private addListeners(): void {
        this.inputElem?.addEventListener('input', this.handleInput.bind(this));
        this.inputElem?.addEventListener('focus', this.handleFocus.bind(this));
        this.inputElem?.addEventListener('blur', this.handleBlur.bind(this));
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

    validate(): void {
        const value = this.inputElem?.value || '';
        if (this.required && value.length <= 0) {
            console.log('aaa');
            this.invalid = true;
            return;
        }
        this.invalid = !this.inputElem?.checkValidity() || false;
    }

    private handleFocus() {
        if (this.inputElem) {
            this.inputElem.placeholder = this.placeholder;
        }
    }

    private handleBlur() {
        if (this.inputElem) {
            this.inputElem.placeholder = '';
        }
        this.validate();
    }

    get html(): TemplateResult {
        return html`<slot></slot>`;
    }

    get css(): string {
        return css`
            :host {
                --primary-color: #0087d7;
                --secondary-color: #f94416;
                --background-color: transparent;
                --text-color: rgba(0, 0, 0, 0.87);
                --underline-size: 1px;

                --highlight-color: var(--primary-color);

                --font-size: 16px;
                --transition: 200ms ease-in-out;

                display: block;
                width: 100%;
                position: relative;
                padding: calc(var(--font-size) * 0.65) 0 0 calc(var(--font-size) * 0.1);
                overflow: visible;
                color: var(--text-color);
                background: var(--background-color);
            }

            :host([invalid]) {
                --highlight-color: var(--secondary-color);
                --text-color: var(--secondary-color);
            }

            ::slotted(label) {
                position: absolute;
                opacity: 1;
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
                padding: 3px 0;
            }

            :host::before,
            :host::after {
                content: '';
                display: block;
                position: absolute;
                bottom: 0;
                left: 0;
                height: var(--underline-size);
                z-index: 1;
            }

            :host::before {
                width: 100%;
                background: var(--text-color);
                opacity: 1;
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

            :host(:focus-within) ::slotted(label),
            :host([hasContent]) ::slotted(label) {
                transform: scale(0.6) translate(calc(var(--font-size) * 0.1), calc(var(--font-size) * -1.3));
                opacity: 0.9;
            }

            :host(:focus-within) ::slotted(label) {
                color: var(--highlight-color);
            }

            /* Disabled */

            :host([disabled]) ::slotted(label),
            ::slotted(input[disabled]) {
                opacity: 0.7;
            }
        `;
    }
}
