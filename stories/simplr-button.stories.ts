import { html } from 'lit-html';
import '../src/button/button';
import { ArgTypes, Story } from './story-types.js';
import LogDisplayer from '../src/log-displayer/log-displayer';

export default {
    title: 'Simplr Button',
    component: 'simplr-button',
};

export const Button: Story<ArgTypes> = () => html`
    <style></style>
    <simplr-button primary>
        Hello, push me
    </simplr-button>
    <simplr-button secondary>
        Hello, push me
    </simplr-button>
    <simplr-button success>
        Hello, push me
    </simplr-button>
`;

export const Elevated: Story<ArgTypes> = () => html`
    <style>
        simplr-button {
            margin: 1rem;
        }
    </style>
    <simplr-button primary elevated>
        Hello, push me
    </simplr-button>
    <simplr-button secondary elevated>
        Hello, push me
    </simplr-button>
    <simplr-button success elevated>
        Hello, push me
    </simplr-button>
`;

export const Contained: Story<ArgTypes> = () => html`
    <style>
        simplr-button {
            margin: 1rem;
        }
    </style>
    <simplr-button primary contained>
        Hello, push me
    </simplr-button>
    <simplr-button secondary contained>
        Hello, push me
    </simplr-button>
    <simplr-button success contained>
        Hello, push me
    </simplr-button>
`;

export const Outlined: Story<ArgTypes> = () => html`
    <style>
        simplr-button {
            margin: 1rem;
        }
    </style>
    <simplr-button primary outlined>
        Hello, push me
    </simplr-button>
    <simplr-button secondary outlined>
        Hello, push me
    </simplr-button>
    <simplr-button success outlined>
        Hello, push me
    </simplr-button>
`;

export const WithIcon: Story<ArgTypes> = () => html`
    <style>
        simplr-button {
            margin: 1rem;
        }
    </style>
    <simplr-button primary elevated>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
        Back to the previous page
    </simplr-button>
    <simplr-button secondary contained>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
        Back to the previous page
    </simplr-button>
    <simplr-button success outlined>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
        Back to the previous page
    </simplr-button>
    <simplr-button success>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
        Back to the previous page
    </simplr-button>
`;

export const InsideForm: Story<ArgTypes> = () => {
    LogDisplayer();

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const jsonData = {
            name: formData.get('name'),
            nickname: formData.get('nickname'),
        };
        console.log(JSON.stringify(jsonData));
    };
    return html`
        <style>
            simplr-button {
                margin: 1rem;
            }
        </style>
        <form @submit=${handleSubmit}>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="nickname" placeholder="Nickname" />
            <simplr-button type="submit" primary elevated>Submit</simplr-button>
        </form>
    `;
};
