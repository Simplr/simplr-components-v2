import { html } from 'lit-html';
import { ArgTypes, Story } from './story-types.js';
import '../src/input/input';
import LogDisplayer from '../src/log-displayer/log-displayer.js';

export default {
    title: 'Simplr input',
    component: 'simplr-input',
};

export const input: Story<ArgTypes> = () => {
    LogDisplayer();

    const onSubmit = (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const formData: FormData = new FormData(target);
        let dataJSON: any = {};
        formData.forEach((val: any, key: string) => {
            dataJSON[key] = val;
        });
        console.log(JSON.stringify(dataJSON, null, 2));
    };

    return html`
        <style>
            simplr-input {
                width: 500px;
                --font-size: 28px;
                margin-bottom: 1rem;
            }
        </style>
        <form @submit="${onSubmit}">
            <simplr-input>
                <label>Testing input</label>
                <input type="text" name="test-input-1" />
            </simplr-input>
            <simplr-input>
                <label>Testing input Two</label>
                <input type="text" name="test-input-2" />
            </simplr-input>
            <input type="submit" />
        </form>
    `;
};
