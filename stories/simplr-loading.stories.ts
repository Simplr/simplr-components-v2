import { html } from 'lit-html';
import '../src/loading/loading';
import { ArgTypes, Story } from './story-types.js';

export default {
    title: 'Simplr Loading',
    component: 'simplr-loading',
};

export const Loading: Story<ArgTypes> = () => html`
    <style></style>
    <div class="content">
        <h2>Hello world!</h2>
        <p>I am a content area covered by loading</p>
    </div>
    <simplr-loading></simplr-loading>
`;

export const LoadingInsideElement: Story<ArgTypes> = () => html`
    <style>
        .container {
            position: relative;
            margin: 3rem 0 0 3rem;
            width: 200px;
            height: 200px;
            border: 2px solid #000000;
        }
    </style>
    <div class="container">
        <h2>Hello world!</h2>
        <p>I am a content area covered by loading</p>
        <simplr-loading></simplr-loading>
    </div>
`;
