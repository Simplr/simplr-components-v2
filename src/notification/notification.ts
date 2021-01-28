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

/**
 *   A Notification element From Simplr Components
 *
 *   Usage:
 *
 *   SimplrNotification.open({ title, message, role?, timeout? });
 *
 *   Create a new Notification by calling the static function SimplrNotification.open();
 *
 *   @element simplr-notification
 *
 *   @prop {number} timeout          - Timeout of the Notification. Defaults to 4000, Set to 0 to disable timeout.
 *   @prop {string} title            - Title of the Notification
 *   @prop {string} message          - Message of the Notification
 *   @prop {NotificationRole} role   - Role of the Notification. Determines the color and icon.
 *
 *   @csspart [--success-color=#41d888]     - Color of the success-role Notification
 *   @csspart [--error-color=#f94416]       - Color of the error-role Notification
 *   @csspart [--info-color=#0087d7]        - Color of the info-role Notification
 *   @csspart [--warning-color=#ffbc00]     - Color of the warning-role Notification
 *
 * */
@CustomElement('simplr-notification')
export class SimplrNotification extends SimplrComponentBase {
    @Property({})
    timeout: number = 4000;
    @Property({})
    title: string = '';
    @Property({})
    message: string = '';
    @Property({})
    role: NotificationRole | string = 'info';

    private closeNotificationRef: EventListener | undefined;

    /**
     * Spawn a new Simplr Notification
     *
     * @param {SimplrNotificationOptions} options    - Options to build Notification from
     * */
    public static open(options: SimplrNotificationOptions) {
        const notification = document.createElement('simplr-notification') as SimplrNotification;
        if (typeof options.timeout !== 'undefined') {
            notification.timeout = options.timeout;
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
        this.addCloseListener();
    }

    private addCloseListener(): void {
        if (this.timeout > 0) {
            window.requestAnimationFrame(() => {
                this.closeNotificationRef = this.closeNotification.bind(this);
                const timeoutbar = this.shadowRoot?.querySelector('.timeout-bar');

                timeoutbar?.addEventListener('animationend', this.closeNotificationRef);
            });
        }
    }

    private closeNotification(): void {
        if (this.closeNotificationRef) {
            this.removeEventListener('animationend', this.closeNotificationRef);
        }

        this.addEventListener('animationend', () => {
            this.remove();
        });
        this.setAttribute('closing', '');
    }

    get html(): TemplateResult {
        return html`
            <div class="notification">
                <div class="icon-area">
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
                <div class="timeout-bar"></div>
            </div>
        `;
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

                --min-height: 100px;

                display: block;
                color: #fff;
                width: 350px;
                min-height: var(--min-height);
                border-radius: 4px;
                background: var(--notification-color);
                box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                    0px 1px 8px 0px rgba(0, 0, 0, 0.12);

                opacity: 1;
                transition: 200ms ease-in-out;

                animation-name: slide-in;
                animation-duration: 500ms;
                position: static;
                top: 0;
                left: 0;
                right: 0;
                margin: 1rem auto 0
            }

            @keyframes slide-in {
                from {
                    transform: translate(0, -100px);
                    opacity: 0;
                }
            }

            :host([closing]) {
                animation-name: closing-animation;
                animation-duration: 1000ms;
            }

            @keyframes closing-animation {
                0% {
                    opacity: 1;
                }

                50% {
                    opacity: 0;
                    min-height: var(--min-height);
                    margin: 1rem auto 0;
                }
                100% {
                    opacity: 0;
                    height: 0;
                    min-height: 0;
                    margin: 0 auto;
                }
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

            .notification {
                position: relative;
                display: flex;
                justify-content: space-between;
                width: 100%;
                min-height: inherit;
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
                animation-duration: ${this.timeout}ms;
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
