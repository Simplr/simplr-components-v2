import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, Property, css, UpdatedProperties } from '@simplr-wc/core';
import { repeat } from 'lit-html/directives/repeat';

/**
 *   A File Input element From Simplr Components
 *
 *   Usage
 *
 *   <simplr-file-input name="files" multi label="Drag and Drop your files here"></simplr-file-input>
 *
 *   @element simplr-file-input
 *
 *   @prop {string} label             - Label of input element
 *   @prop {string} name              - Name of input element
 *   @prop {boolean} disabled         - Boolean stating if input is disabled
 *   @prop {boolean} multi            - Boolean stating if input allows multiple files to be chosen
 *   @prop {boolean} required         - Boolean stating if input is required
 *
 *   @attr {boolean} invalid          - Boolean set true when input has a invalid value
 *   @attr {boolean} filehover        - Boolean set true when a file is hovered on top of the field
 *
 *   @csspart [--primary-color=#0087d7]                     - Primary color of input element
 *   @csspart [--secondary-color=#f94416]                   - Secondary color of input element. Used for error states
 *   @csspart [--background-color=transparent]              - Background color of input element
 *   @csspart [--text-color=rgba(0,0,0,0.4)]                - Text color of input element
 *   @csspart [--list-item-background=#fff]                 - Color of the chosen file list item background
 *
 * */
@CustomElement('simplr-file-input')
export default class SimplrFileInput extends SimplrComponentBase {
    @Property({ reflect: true })
    label: string | undefined;
    @Property({ reflect: true })
    name: string = '';
    @Property({ reflect: true })
    disabled: boolean = false;
    @Property({ reflect: true })
    required: boolean = false;
    @Property({ reflect: true })
    multi: boolean = false;
    @Property({ reflect: true })
    invalid: boolean = false;

    @Property({ reflect: true })
    filehover: boolean = false;

    @Property({})
    inputElem: HTMLInputElement | undefined;

    @Property({})
    files: Array<File> = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'multi':
            case 'disabled':
            case 'required':
            case 'invalid':
                (this as any)[name] = newValue != null;
                break;
            default:
                (this as any)[name] = newValue;
        }
    }

    static get observedAttributes() {
        return ['multi', 'label', 'name', 'disabled', 'required', 'invalid', 'filehover'];
    }

    connectedCallback() {
        this.createElements();
    }

    updated(_changedProperties: UpdatedProperties) {
        if (this.inputElem) {
            this.inputElem.disabled = this.disabled;
        }

        this.setElementAttributes();
    }

    addEventListeners(inputElem: HTMLInputElement) {
        inputElem?.addEventListener('dragenter', () => {
            this.filehover = true;
        });
        inputElem?.addEventListener('drop', () => {
            this.filehover = false;
        });
    }

    /**
     *  @function
     *  Add file(s) to the file input list
     *
     *  @param {Array<File>} files  List of files to add
     * */
    public addFiles(files: Array<File>) {
        if (this.multi) {
            this.files = [...this.files, ...files];
        } else {
            this.files = [...files];
        }
    }

    /**
     * @function
     * Remove a file from the list.
     *
     * @param {number | string} indexOrName     Index or name of the file to be removed
     * */
    public removeFile(indexOrName: number | string) {
        if (typeof indexOrName === 'number') {
            this.files.splice(indexOrName, 1);
            this.files = [...this.files];
        } else {
            this.files = this.files.filter(file => file.name !== indexOrName);
        }
    }

    /**
     * @function
     * Get the files added to the input field.
     *
     * @returns {Array<File>} files Files that were se on the input field
     * */
    public getFiles(): Array<File> {
        return this.files;
    }

    onRemoveButtonClick(e: Event, index: number) {
        const target = e.target as HTMLElement;
        const listItem = target.parentNode as HTMLElement;
        listItem.addEventListener(
            'transitionend',
            e => {
                if (e.target === listItem && e.propertyName === 'transform') {
                    this.removeFile(index);
                }
            },
            false,
        );
        listItem.setAttribute('deleting', '');
    }

    private createElements(): void {
        this.inputElem = document.createElement('input');
        this.inputElem.type = 'file';
        this.inputElem.addEventListener('input', e => {
            const target = e.target as HTMLInputElement;
            const uploadedFiles = target.files ? Array.from(target.files) : [];
            this.addFiles(uploadedFiles);
            if (this.inputElem) {
                this.inputElem.value = '';
                this.inputElem.blur();
            }
        });
        this.appendChild(this.inputElem);
        this.addEventListeners(this.inputElem);
    }

    private setElementAttributes() {
        if (this.inputElem) {
            this.inputElem.disabled = this.disabled;
            this.inputElem.name = this.name;
            this.inputElem.multiple = this.multi;
        }
    }

    get html(): TemplateResult {
        return html`<div class="input-area">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M16 16h-3v5h-2v-5h-3l4-4 4 4zm3.479-5.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z"
                    />
                </svg>
                <label>${this.label}</label>
                <slot></slot>
            </div>

            <div class="file-area">
                <ul>
                    ${repeat(
                        this.files,
                        file => file.name,
                        (file, index) => html`
                            <li>
                                ${file.name}
                                <button @click=${(e: Event) => this.onRemoveButtonClick(e, index)}>
                                    <svg
                                        width="24"
                                        height="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                    >
                                        <path
                                            d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"
                                        />
                                    </svg>
                                </button>
                            </li>
                        `,
                    )}
                </ul>
            </div> `;
    }

    get css(): string {
        return css`
            :host {
                --primary-color: #0087d7;
                --secondary-color: #f94416;
                --background-color: transparent;
                --text-color: rgba(0, 0, 0, 0.4);
                --list-item-background: #fff;

                display: flex;
                flex-direction: column;
                width: 100%;
                position: relative;
            }

            .input-area {
                position: relative;
                border: 4px dashed var(--text-color);
                border-radius: 6px;
                box-sizing: border-box;
                cursor: pointer;
                padding: 1rem;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                transition-delay: 100ms;

                color: var(--text-color);
            }

            .input-area label {
                width: max-content;
            }

            .input-area * {
                cursor: inherit;
            }

            .input-area svg {
                height: 3rem;
                width: 3rem;
                fill: var(--text-color);
                transition-delay: 100ms;
            }

            .input-area::before {
                content: '';
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                position: absolute;
                background: var(--primary-color);
                opacity: 0;
                transition: 500ms ease-in-out;
                z-index: -1;
                transform: scale(0);
            }

            .input-area:focus-within::before,
            :host([filehover]) .input-area::before,
            .input-area:hover::before {
                opacity: 0.8;
                transform: scale(7.5);
            }

            .input-area:focus-within,
            :host([filehover]) .input-area,
            .input-area:hover {
                color: #fff;
            }
            .input-area:focus-within svg,
            :host([filehover]) .input-area svg,
            .input-area:hover svg {
                fill: #fff;
            }

            ::slotted(input) {
                top: 0;
                left: 0;
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }

            .file-area {
                display: flex;
                flex-direction: column;
            }

            .file-area ul {
                padding: 0;
            }

            .file-area ul li {
                width: 100%;
                height: 3.5rem;
                list-style: none;
                display: flex;
                border: 1px solid #d6d1e0;
                margin-bottom: 2px;
                border-radius: 4px;
                box-sizing: border-box;
                justify-content: space-between;
                align-items: center;
                padding: 0 1rem;
                transition: 200ms ease-in-out;
                animation: slide-in 200ms;
                transform: translate(0, 0) scaleY(1);
                background: var(--list-item-background);
                transform-origin: top;
            }

            .file-area ul li[deleting] {
                transform: scaleY(0);
                height: 0;
            }

            @keyframes slide-in {
                from {
                    transform: translate(0, -2rem);
                }
            }

            .file-area ul li button {
                background: none;
                border: none;
                outline: none;
                position: relative;
                width: 24px;
                height: 24px;
                padding: 0;
                cursor: pointer;
            }

            .file-area ul li button:before,
            .file-area ul li button:after {
                content: '';
                position: absolute;
                top: -4px;
                left: -6px;
                margin: auto;
                width: 150%;
                height: 150%;
                border-radius: 50%;
            }

            .file-area ul li button:before {
                background: #000;
                opacity: 0;
                z-index: -2;
                transition: opacity 200ms ease-in-out;
            }

            .file-area ul li button path {
                transition: 200ms ease-in-out;
                z-index: 1;
            }

            .file-area ul li button:hover path,
            .file-area ul li button:focus path {
                fill: var(--secondary-color);
            }

            .file-area ul li button:focus::before,
            .file-area ul li button:hover::before {
                opacity: 0.1;
            }

            :host([disabled]) {
                opacity: 0.7;
                pointer-events: none;
            }
        `;
    }
}
