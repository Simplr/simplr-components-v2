import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css } from '@simplr-wc/core';
import SimplrCheckbox from '@simplr-wc/checkbox';

@CustomElement('simplr-checkbox-group')
export default class SimplrCheckboxGroup extends SimplrComponentBase {
    @Property({ reflect: true })
    label: string = '';
    @Property({ reflect: true })
    name: string = '';

    @Property({ reflect: true })
    disabled: boolean = false;
    @Property({ reflect: true })
    checked: boolean = false;
    @Property({ reflect: true })
    indeterminate: boolean = false;

    @Property({ reflect: true })
    primary: boolean = false;
    @Property({ reflect: true })
    secondary: boolean = false;
    @Property({ reflect: true })
    success: boolean = false;

    @Property({})
    inputElements: Array<SimplrCheckbox> = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        (this as any)[name] = newValue === '' ? true : newValue;
    }

    private addCheckboxListeners() {
        this.inputElements = [];
        this.querySelectorAll('simplr-checkbox').forEach((inp: any) => {
            this.inputElements.push(inp);
            inp.addEventListener('input', () => {
                const checkedInputs = Array.from(this.inputElements).filter(inpt => inpt.checked);
                if (checkedInputs.length == 0) {
                    this.checked = false;
                    this.indeterminate = false;
                    return;
                }
                if (checkedInputs.length == this.inputElements.length) {
                    this.checked = true;
                    this.indeterminate = false;
                    return;
                }
                this.checked = false;
                this.indeterminate = true;
            });
        });
    }

    private handleGroupInput() {
        if (this.checked) {
            this.indeterminate = false;
            this.checked = false;
            this.inputElements.forEach(inp => (inp.checked = false));
            return;
        }
        this.indeterminate = false;
        this.checked = true;
        this.inputElements.forEach(inp => {
            inp.checked = true;
        });
    }

    static get observedAttributes() {
        return ['label', 'name', 'disabled', 'checked', 'primary', 'secondary', 'success', 'indeterminate'];
    }

    get html(): TemplateResult {
        return html`<simplr-checkbox
                @input=${this.handleGroupInput.bind(this)}
                name="${this.name}"
                label="${this.label}"
                ?disabled=${this.disabled}
                ?checked=${this.checked}
                ?primary=${this.primary}
                ?secondary=${this.secondary}
                ?success=${this.success}
                ?indeterminate=${this.indeterminate}
            ></simplr-checkbox>
            <slot @slotchange=${this.addCheckboxListeners.bind(this)}></slot>`;
    }

    get css(): string {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                width: fit-content;
                cursor: pointer;
            }

            slot {
                display: flex;
                flex-direction: column;
                margin-top: 1rem;
                margin-left: 1rem;
            }
        `;
    }
}
