import { html } from 'lit-html';
import '../src/file-input/file-input';
import { SimplrFileInput } from '../src/file-input/file-input';
import { ArgTypes, Story } from './story-types.js';

export default {
    title: 'Simplr File Input',
    component: 'simplr-file-input',
};

export const FileInput: Story<ArgTypes> = () => {
    function handleSubmit(e: Event) {
        e.preventDefault();
        const fileInput = document.querySelector('simplr-file-input') as SimplrFileInput;
        const files = fileInput.getFiles();
        console.log(files);
    }
    return html`
        <style></style>
        <form @submit=${handleSubmit}>
            <simplr-file-input name="files" multi label="Drag and Drop your files here"></simplr-file-input>
            <input type="submit" />
        </form>
    `;
};
