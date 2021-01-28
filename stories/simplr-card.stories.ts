import { html } from 'lit-html';
import '../src/card/card';
import { ArgTypes, Story } from './story-types.js';

export default {
    title: 'Simplr Card',
    component: 'simplr-card',
};

export const Card: Story<ArgTypes> = () => html`
    <simplr-card label="Card Title" subtitle="Card subtitle">
        <p>The card can contain any kind of content, but text is mostly the preferred way to display information</p>
    </simplr-card>
`;

export const WithMedia: Story<ArgTypes> = () => html`
    <style>
        [slot='media'] {
            background: #f1f1f1;
            padding: 10%;
        }
    </style>
    <simplr-card label="Card Title" subtitle="Card subtitle">
        <div slot="media">
            <img src="https://simplr.company/assets/simplr_horisontal_black.svg" />
        </div>
        <p>The card can contain any kind of content, but text is mostly the preferred way to display information</p>
    </simplr-card>
`;

export const WithAction: Story<ArgTypes> = () => html`
    <style>
        [slot='media'] {
            background: #f1f1f1;
            padding: 10%;
        }
        span {
            color: var(--primary-color);
            cursor: pointer;
        }
    </style>
    <simplr-card label="Card Title" subtitle="Card subtitle">
        <div slot="media">
            <img src="https://simplr.company/assets/simplr_horisontal_black.svg" />
        </div>
        <p>The card can contain any kind of content, but text is mostly the preferred way to display information</p>
        <div slot="actions">
            <span>Go to page</span>
        </div>
    </simplr-card>
`;
