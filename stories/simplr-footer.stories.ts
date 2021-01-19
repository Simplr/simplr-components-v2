import { html } from 'lit-html';
import '../src/simplr-components.js';
import '../src/footer/footer';
import { ArgTypes, Story } from './story-types.js';

export default {
    title: 'Simplr Footer',
    component: 'simplr-components',
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

export const Footer: Story<ArgTypes> = () => html` <simplr-footer .testProperties=${[1, 2, 3]}></simplr-footer> `;

export const SecondFooter: Story<ArgTypes> = () => {
    return html` <simplr-footer></simplr-footer> `;
};
