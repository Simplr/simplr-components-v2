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
        <simplr-input label="Testing input one" name="input-one" placeholder="Input the desired value"> </simplr-input>
        <simplr-input label="Testing input two" name="input-two"> </simplr-input>
        <input type="submit" />
    `;
};

export const Number: Story<ArgTypes> = () => {
    return html`
        <style>
            simplr-input {
                width: 500px;
                --font-size: 28px;
                margin-bottom: 1rem;
            }
        </style>
        <simplr-input type="number" label="Testing input one" name="input-one" placeholder="Input the desired value">
        </simplr-input>
        <simplr-input type="number" label="I have a step of 0.01" name="input-two" step="0.01"> </simplr-input>
        <input type="submit" />
    `;
};

export const Email: Story<ArgTypes> = () => {
    return html`
        <style>
            simplr-input {
                width: 500px;
                --font-size: 28px;
                margin-bottom: 1rem;
            }
        </style>
        <simplr-input type="email" label="Testing input one" name="input-one" placeholder="Input the desired value">
        </simplr-input>
        <simplr-input type="email" label="I have a step of 0.01" name="input-two"> </simplr-input>
        <input type="submit" />
    `;
};

export const Required: Story<ArgTypes> = () => {
    return html`
        <style>
            simplr-input {
                width: 500px;
                --font-size: 28px;
                margin-bottom: 1rem;
            }
        </style>
        <simplr-input required label="Testing input one" name="input-one" placeholder="Input the desired value">
        </simplr-input>
        <simplr-input required label="Testing input two" name="input-two"> </simplr-input>
        <input type="submit" />
    `;
};

export const FontSizes: Story<ArgTypes> = () => {
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
            <simplr-input label="12 Pixels"> </simplr-input>
            <simplr-input label="16 Pixels"> </simplr-input>
            <simplr-input label="20 Pixels"> </simplr-input>
            <simplr-input label="24 Pixels"> </simplr-input>
            <simplr-input label="28 Pixels"> </simplr-input>
            <input type="submit" />
        </div>
    `;
};

export const Disabled: Story<ArgTypes> = () => {
    return html`
        <style>
            simplr-input {
                width: 500px;
                --font-size: 28px;
                margin-bottom: 1rem;
            }
        </style>
        <simplr-input disabled label="Input one"> </simplr-input>
        <simplr-input disabled label="Input two"> </simplr-input>
        <input type="submit" />
    `;
};

export const Invalid: Story<ArgTypes> = () => {
    return html`
        <style>
            simplr-input {
                width: 500px;
                --font-size: 28px;
                margin-bottom: 1rem;
            }
        </style>
        <simplr-input invalid label="Input one"> </simplr-input>
        <simplr-input invalid label="Input two"> </simplr-input>
        <input type="submit" />
    `;
};
