import { html } from 'lit-html';
import { ArgTypes, Story } from './story-types.js';
import { SimplrNotification } from '../src/notification/notification';

export default {
    title: 'Simplr Notification',
    component: 'simplr-notification',
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

export const Notification: Story<ArgTypes> = () => {
    const newNotification = (role: string, message: string) => {
        const title = role.substring(0, 1).toUpperCase() + role.substring(1);
        SimplrNotification.open({ title, message, role });
    };
    return html`
        <style>
            span {
                font-weight: 700;
                font-size: 18px;
            }
            simplr-notification {
                margin: 1rem;
            }
        </style>
        <button @click=${() => newNotification('info', 'Did you know that Simplr Components use Typescript?')}>
            Notification Info
        </button>
        <button @click=${() => newNotification('success', 'Successfully opened a Toast!')}>
            Notification Success
        </button>
        <button
            @click=${() => newNotification('warning', 'Using too many Toasts might cause addiction in the long run.')}
        >
            Notification Warning
        </button>
        <button @click=${() => newNotification('error', 'Toast has failed successfully')}>Notification Error</button>
    `;
};
