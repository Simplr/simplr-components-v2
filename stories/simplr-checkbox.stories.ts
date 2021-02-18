import { html } from 'lit-html';
import '../src/checkbox/checkbox';
import { ArgTypes, Story } from './story-types.js';

export default {
    title: 'Simplr Checkbox',
    component: 'simplr-checkbox',
};

export const Checkbox: Story<ArgTypes> = () => html`
    <style>
        simplr-checkbox {
            margin-bottom: 1rem;
        }
    </style>
    <div @click=${() => console.log('Click')}>
        <simplr-checkbox
            @click="${(e: Event) => console.log('ebin', e)}name"
            ="schwarma"
            label="Chicken Schwarma"
        ></simplr-checkbox>
        <simplr-checkbox primary name="kebab" label="Kebab"></simplr-checkbox>
        <simplr-checkbox secondary name="döner" label="Döner"></simplr-checkbox>
        <simplr-checkbox success name="falafel" label="Falafel"></simplr-checkbox>
    </div>
`;

export const Intermediate: Story<ArgTypes> = () => html`
    <style>
        simplr-checkbox {
            margin-bottom: 1rem;
        }
    </style>
    <simplr-checkbox intermediate name="schwarma" label="Chicken Schwarma"></simplr-checkbox>
    <simplr-checkbox intermediate primary name="kebab" label="Kebab"></simplr-checkbox>
    <simplr-checkbox intermediate secondary name="döner" label="Döner"></simplr-checkbox>
    <simplr-checkbox intermediate success name="falafel" label="Falafel"></simplr-checkbox>
`;
