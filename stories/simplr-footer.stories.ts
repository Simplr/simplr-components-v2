import { html } from 'lit-html';
import '../src/footer/footer';
import { ArgTypes, Story } from './story-types.js';

export default {
    title: 'Simplr Footer',
    component: 'simplr-footer',
};

export const Footer: Story<ArgTypes> = () => html`
    <style>
        span {
            font-weight: 700;
            font-size: 18px;
        }
    </style>
    <simplr-footer>
        <span>
            <h2>Let's create something awesome together</h2>
            <p>My Name:</p>
            <p><b>Phone:</b> +22 1231233</p>
            <p><b>Email</b> john.doe@foobar.dot</p>
        </span>
    </simplr-footer>
`;

export const FooterWithMultipleColumns: Story<ArgTypes> = () => html`
    <style>
        span {
            font-weight: 700;
            font-size: 18px;
        }
    </style>
    <simplr-footer>
        <span>
            <h2>Let's create something awesome together</h2>
            <p>My Name:</p>
            <p><b>Phone:</b> +22 1231233</p>
            <p><b>Email</b> john.doe@foobar.dot</p>
        </span>
        <span>
            <h2>I am a secondary column</h2>
            <p>Foo</p>
            <p>Bar</p>
        </span>
        <span>
            <h2>Let's create something awesome together</h2>
            <p>My Name:</p>
            <p><b>Phone:</b> +22 1231233</p>
            <p><b>Email</b> john.doe@foobar.dot</p>
        </span>
    </simplr-footer>
`;
