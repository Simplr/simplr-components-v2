import { html } from 'lit-html';
import { ArgTypes, Story } from './story-types.js';
import '../src/input/input';

export default {
    title: 'Simplr input',
    component: 'simplr-input',
};

export const Input: Story<ArgTypes> = () => {
    return html`
        <style>
            simplr-input {
                width: 500px;
                --font-size: 28px;
                margin-bottom: 1rem;
            }
        </style>
        <simplr-input>
            <label>Testing input</label>
            <input type="text" name="test-input-1" autocomplete="off" />
        </simplr-input>
        <simplr-input>
            <label>Testing input Two</label>
            <input type="text" name="test-input-2" />
        </simplr-input>
        <input type="submit" />
    `;
};

export const InputFontSizes: Story<ArgTypes> = () => {
    return html`
        <style>
            simplr-input {
                margin-bottom: 1rem;
            }

            simplr-input:nth-child(1) {
                --font-size: 12px;
            }
            simplr-input:nth-child(2) {
                --font-size: 16px;
            }
            simplr-input:nth-child(3) {
                --font-size: 20px;
            }
            simplr-input:nth-child(4) {
                --font-size: 24px;
            }
            simplr-input:nth-child(5) {
                --font-size: 28px;
            }
            div {
                width: 500px;
            }
        </style>
        <div>
            <simplr-input>
                <label>12 Pixels</label>
                <input type="text" name="test-input-1" autocomplete="off" />
            </simplr-input>
            <simplr-input>
                <label>16 Pixels</label>
                <input type="text" name="test-input-2" />
            </simplr-input>
            <simplr-input>
                <label>20 Pixels</label>
                <input type="text" name="test-input-3" />
            </simplr-input>
            <simplr-input>
                <label>24 Pixels</label>
                <input type="text" name="test-input-4" />
            </simplr-input>
            <simplr-input>
                <label>28 Pixels</label>
                <input type="text" name="test-input-5" />
            </simplr-input>
            <input type="submit" />
        </div>
    `;
};

export const DisabledInput: Story<ArgTypes> = () => {
    return html`
        <style>
            simplr-input {
                width: 500px;
                --font-size: 28px;
                margin-bottom: 1rem;
            }
        </style>
        <simplr-input disabled>
            <label for="test-input-1">Testing input</label>
            <input id="test-input-1" type="text" name="test-input-1" autocomplete="off" />
        </simplr-input>
        <simplr-input>
            <label>Testing input Two</label>
            <input type="text" disabled name="test-input-2" />
        </simplr-input>
        <input type="submit" />
    `;
};
