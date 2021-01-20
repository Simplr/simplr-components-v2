import { html } from 'lit-html';
import { ArgTypes, Story } from './story-types.js';
import '../src/toast/toast';
import { SimplrToast } from '../src/toast/toast';

export default {
    title: 'Simplr Toast',
    component: 'simplr-toast',
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

export const Toast: Story<ArgTypes> = () => {
    const openSnackbar = (role: string) => {
        SimplrToast.open({ title: 'Hello!', message: 'This is a example toast!', role: role });
    };
    return html`
        <style>
            span {
                font-weight: 700;
                font-size: 18px;
            }
            simplr-toast {
                margin: 1rem;
            }
        </style>
        <button @click=${() => openSnackbar('info')}>Open Snackbar Info</button>
        <button @click=${() => openSnackbar('success')}>Open Snackbar Success</button>
        <button @click=${() => openSnackbar('warning')}>Open Snackbar Warning</button>
        <button @click=${() => openSnackbar('error')}>Open Snackbar Error</button>
    `;
};
