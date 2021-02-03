import { html } from 'lit-html';
import '../src/checkbox/checkbox';
import '../src/checkbox-group/checkbox-group';
import { ArgTypes, Story } from './story-types.js';

export default {
    title: 'Simplr Checkbox Group',
    component: 'simplr-checkbox-group',
};

export const Group: Story<ArgTypes> = () => html`
    <style>
        simplr-checkbox {
            margin-bottom: 1rem;
        }
    </style>
    <simplr-checkbox-group primary label="Fillings">
        <simplr-checkbox primary name="fillings[]" label="Cucumber"></simplr-checkbox>
        <simplr-checkbox primary name="fillings[]" label="Tomato"></simplr-checkbox>
        <simplr-checkbox primary name="fillings[]" label="Paprika"></simplr-checkbox>
        <simplr-checkbox primary name="fillings[]" label="Salad"></simplr-checkbox>
    </simplr-checkbox-group>

    <simplr-checkbox-group primary label="Spices">
        <simplr-checkbox primary name="spices[]" label="Salt"></simplr-checkbox>
        <simplr-checkbox primary name="spices[]" label="Pepper"></simplr-checkbox>
    </simplr-checkbox-group>
`;
