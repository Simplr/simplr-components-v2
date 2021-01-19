import { html } from 'lit-html';
import '../src/simplr-components.js';
import { ArgTypes, Story } from './story-types.js';

export default {
  title: 'SimplrComponents',
  component: 'simplr-components',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Template: Story<ArgTypes> = ({
  title,
  backgroundColor = 'white',
}: ArgTypes) => html`
  <simplr-components
    style="--simplr-components-background-color: ${backgroundColor}"
    .title=${title}
  ></simplr-components>
`;
