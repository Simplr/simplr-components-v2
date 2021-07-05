import { html } from 'lit-html';
import '../src/dialog/dialog';
import '../src/button/button';
import { ArgTypes, Story } from './story-types.js';
import { SimplrDialog } from '../src/dialog/dialog';

export default {
    title: 'Simplr Dialog',
    component: 'simplr-dialog',
};

export const Dialog: Story<ArgTypes> = () => {
    const openDialog = () => {
        const dialog = document.createElement('simplr-dialog') as SimplrDialog;
        dialog.innerHTML = `
            <h2>Hello World</h2>
            <p>I am a dialog popup</p>
        `;
        document.body.appendChild(dialog);
        dialog.open();
    };

    return html`
        <style></style>

        <simplr-button @click=${openDialog} primary elevated>Open Dialog</simplr-button>
    `;
};
