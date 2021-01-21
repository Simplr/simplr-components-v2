import { TemplateResult } from 'lit-html';
import { SimplrComponentBase } from '@simplr-wc/core';
export declare type SimplrNotificationOptions = {
    timeout?: number;
    title: string;
    message: string;
    role?: NotificationRole | string;
};
declare type NotificationRole = 'info' | 'error' | 'warning' | 'success';
/**
 *   A Notification element From Simplr Components
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
export declare class SimplrNotification extends SimplrComponentBase {
    timeout: number;
    title: string;
    message: string;
    role: NotificationRole | string;
    private closeNotificationRef;
    /**
     * Spawn a new Simplr Notification
     *
     * @param {SimplrNotificationOptions} options    - Options to build Notification from
     * */
    static open(options: SimplrNotificationOptions): void;
    constructor();
    connectedCallback(): void;
    private addCloseListener;
    private closeNotification;
    get html(): TemplateResult;
    get css(): string;
}
export {};
//# sourceMappingURL=notification.d.ts.map