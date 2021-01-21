import { html, TemplateResult } from 'lit-html';
import { Property, SimplrComponentBase, CustomElement, css } from '@simplr-wc/core';
import { infoSign, errorSign, successSign, warningSign } from './notification-icons';

export type SimplrNotificationOptions = {
    timeout?: number;
    title: string;
    message: string;
    role?: NotificationRole | string;
};

type NotificationRole = 'info' | 'error' | 'warning' | 'success';

@CustomElement('simplr-notification')
export class SimplrNotification extends SimplrComponentBase {
    @Property({})
    timeoutDuration: number = 4000;
    @Property({})
    title: string = '';
    @Property({})
    message: string = '';
    @Property({})
    role: NotificationRole | string = 'info';

    public static open(options: SimplrNotificationOptions) {
        const notification = document.createElement('simplr-notification') as SimplrNotification;
        if (options.timeout) {
            notification.timeoutDuration = options.timeout;
        }
        notification.title = options.title;
        notification.message = options.message;
        if (options.role) {
            notification.role = options.role;
        }
        document.body.appendChild(notification);
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.setAttribute(this.role, '');
        window.requestAnimationFrame(() => {
            this.shadowRoot?.querySelector('.timeout-bar')?.addEventListener('animationend', () => {
                this.closeNotification();
            });
        });
    }

    private closeNotification() {
        this.addEventListener('transitionend', () => {
            this.remove();
        });
        this.setAttribute('closing', '');
    }

    get html(): TemplateResult {
        return html`<div class="icon-area">
                <div class="status-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="" />
                    </svg>
                </div>
            </div>
            <div class="information-area">
                <h2>${this.title}</h2>
                <p>${this.message}</p>
            </div>
            <div class="exit-button" @click=${this.closeNotification.bind(this)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="${errorSign}" />
                </svg>
            </div>
            <div class="timeout-bar"></div> `;
    }

    get css(): string {
        return css`
            :host {
                --success-color: #41d888;
                --error-color: #f94416;
                --info-color: #0087d7;
                --warning-color: #ffbc00;

                --notification-color: var(--info-color);
                --icon-size: 18px;

                color: #fff;
                width: 350px;
                min-height: 100px;
                border-radius: 4px;
                background: var(--notification-color);
                box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                    0px 1px 8px 0px rgba(0, 0, 0, 0.12);

                position: relative;
                display: flex;
                justify-content: space-between;
                opacity: 1;
                transition: 200ms ease-in-out;

                animation-name: slide-in;
                animation-duration: 500ms;
            }

        @keyframes slide-in {
            from {
                transform: translate(-100px);
                opacity: 0;
            }
        }

            :host([closing]) {
                opacity: 0;
            }

            :host([success]) {
                --notification-color: var(--success-color);
            }
            :host([error]) {
                --notification-color: var(--error-color);
            }
            :host([info]) {
                --notification-color: var(--info-color);
            }
            :host([warning]) {
                --notification-color: var(--warning-color);
            }

            .status-icon svg {
                fill: var(--notification-color);
                width: var(--icon-size);
                height: var(--icon-size);
            }

            .exit-button svg {
                fill: #FFF;
                width: 10px;
                height: 10px;
            }

            :host([success]) .status-icon path {
                d: path("${successSign}");
            }
            :host([error]) .status-icon path {
                d: path("${errorSign}");
            }
            :host([info]) .status-icon path {
                d: path("${infoSign}");
            }
            :host([warning]) .status-icon path {
                d: path("${warningSign}");
            }

            .exit-button {
                position: absolute;
                top:7.5px;
                right: 10px;
                color: #FFF;
                cursor: pointer;
            }

            .icon-area {
                flex-basis: 17.5%;
                display: flex;
                justify-content: center;
                padding-top: 1.25rem;
            }

            .status-icon {
                width: calc(var(--icon-size) * 2);
                height: calc(var(--icon-size) * 2);
                border-radius: 50%;
                background: #FFF;
                display: flex;
                align-items: center;
                justify-content: center;

                box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
            }

            .information-area {
                flex-basis: 80%;
                padding: 4px 0 0;
            }

            .information-area h2 {
                font-size: 1.2rem;
                margin: 0.85rem 0 0.5rem
            }

            .information-area p {
                font-size: 0.875rem;
                margin: 0 0 1.5rem;
            }

            .timeout-bar {
                width: 0%;
                position: absolute;
                bottom: 0;
                left: 0;
                height: 10px;
                background: rgba(255,255,255, 0.6);
                animation-duration: ${this.timeoutDuration}ms;
                animation-name: timeout-animation;
                animation-timing-function: linear;
            }

            @keyframes timeout-animation {
                from {
                    width: 100%;
                }
            }
        `;
    }
}
