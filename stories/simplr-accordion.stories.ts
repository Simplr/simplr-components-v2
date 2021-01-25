import { html } from 'lit-html';
import '../src/accordion/accordion';
import { ArgTypes, Story } from './story-types.js';

export default {
    title: 'Simplr Accordion',
    component: 'simplr-accordion',
};

export const accordion: Story<ArgTypes> = () => html`
    <style>
        span {
            font-size: 18px;
        }
    </style>
    <simplr-accordion>
        <label slot="label">Click me to open </label>
        <span>
            <h2>Let's create something awesome together</h2>
            <p>My Name:</p>
            <p><b>Phone:</b> +22 1231233</p>
            <p><b>Email</b> john.doe@foobar.dot</p>
        </span>
    </simplr-accordion>
    <simplr-accordion>
        <label slot="label">Click me to open</label>
        <span>
            <h2>Let's create something awesome together</h2>
            <p>My Name:</p>
            <p><b>Phone:</b> +22 1231233</p>
            <p><b>Email</b> john.doe@foobar.dot</p>
        </span>
    </simplr-accordion>
    <simplr-accordion>
        <label slot="label">Click me to open</label>
        <span>
            <h2>Let's create something awesome together</h2>
            <p>My Name:</p>
            <p><b>Phone:</b> +22 1231233</p>
            <p><b>Email</b> john.doe@foobar.dot</p>
        </span>
    </simplr-accordion>
`;
