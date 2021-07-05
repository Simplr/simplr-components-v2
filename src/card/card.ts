import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, css, Property } from '@simplr-wc/core';

@CustomElement('simplr-card')
export class SimplrCard extends SimplrComponentBase {
    @Property({ reflect: true })
    label: string | undefined;
    @Property({ reflect: true })
    subtitle: string | undefined;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;

        (this as any)[name] = newValue;
    }

    static get observedAttributes() {
        return ['label', 'subtitle'];
    }

    get html(): TemplateResult {
        return html`
            <slot name="media"></slot>
            <div class="content">
                <h2>${this.label}</h2>
                <p>${this.subtitle}</p>
                <slot></slot>
            </div>
            <slot name="actions"></slot>
        `;
    }

    get css(): string {
        return css`
            :host {
                min-width: 260px;
                width: fit-content;
                max-width: 330px;
                border-radius: 4px;
                box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                    0px 1px 8px 0px rgba(0, 0, 0, 0.12);
                display: flex;
                flex-direction: column;
                background: #fff;
            }

            .content {
                padding: 1rem;
            }

            h2,
            p {
                margin: 0;
            }

            h2 {
                font-size: 1.25rem;
                margin-bottom: 0.25rem;
            }

            p {
                font-size: 0.875rem;
                opacity: 0.6;
            }

            slot::slotted(p) {
                font-size: 0.875rem;
                opacity: 0.6;
            }

            slot[name='actions']::slotted(div) {
                padding: 1rem;
                border-top: 1px solid #d6d1e0;
            }
        `;
    }
}
