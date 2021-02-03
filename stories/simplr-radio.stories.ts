import { html } from 'lit-html';
import '../src/radio/radio';
import { ArgTypes, Story } from './story-types.js';

export default {
    title: 'Simplr Radio',
    component: 'simplr-radio',
};

export const Radio: Story<ArgTypes> = () => html`
    <style>
        simplr-radio {
            margin-top: 1rem;
        }
    </style>
    <label class="radio-label">Sandwich type</label>
    <simplr-radio primary value="steak-and-cheese" name="sandwich-type" label="Steak and Cheese"></simplr-radio>
    <simplr-radio primary value="tuna" name="sandwich-type" label="Tuna"></simplr-radio>
    <simplr-radio primary value="ham" name="sandwich-type" label="Ham"></simplr-radio>
    <simplr-radio primary value="roast-beef" name="sandwich-type" label="Roast Beef"></simplr-radio>
`;
