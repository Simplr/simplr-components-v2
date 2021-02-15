import { html } from 'lit-html';
import '../src/file-input/file-input';
import { ArgTypes, Story } from './story-types.js';

export default {
    title: 'Simplr File Input',
    component: 'simplr-file-input',
};

export const FileInput: Story<ArgTypes> = () => {
    return html`
        <style></style>
        <form method="POST">
            <simplr-file-input name="files" multi label="Drag and Drop your files here"></simplr-file-input>
            <input type="submit" />
        </form>
    `;
};
