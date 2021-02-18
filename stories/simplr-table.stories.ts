import { html } from 'lit-html';
import '../src/table/table';
import '../src/button/button';
import SimplrTable, { TableActionClickEvent, TableColumn } from '../src/table/table';
import { ArgTypes, Story } from './story-types.js';

export default {
    title: 'Simplr Table',
    component: 'simplr-table',
};

export const Table: Story<ArgTypes> = () => {
    let table: SimplrTable;
    let users = [
        { id: 1, firstName: 'John', lastName: 'Doe', age: 54, favoriteFood: 'Pizza' },
        { id: 43, firstName: 'Jane', lastName: 'Doe', age: 32, favoriteFood: 'Pasta' },
        { id: 1337, firstName: 'Sam', lastName: 'Sepiol', age: 35, favoriteFood: 'Fried Chicken' },
    ];

    const columns: Array<TableColumn> = [
        { field: 'id', header: 'User ID', width: 50 },
        { field: 'name', header: 'Name', get: (user: any) => user.firstName + ' ' + user.lastName },
        { field: 'age', header: 'Age' },
        { field: 'favoriteFood', header: 'Favorite food' },
    ];

    function addUser() {
        const id = Math.floor(Math.random() * 1000);
        const user = {
            id: id,
            firstName: `New User - `,
            lastName: `${id}`,
            age: Math.floor(Math.random() * 100),
            favoriteFood: 'Foobar',
        };
        users.push(user);
        table.setData(users);
    }

    function handleRowClick(e: any) {
        console.log(e.detail);
    }

    function handleTableAction(e: any) {
        console.log(e);
        const actionClickEvent = e.detail as TableActionClickEvent;
        users = users.filter(u => u.id !== actionClickEvent.row.id);
        table.setData(users);
    }

    setTimeout(() => {
        table = document.querySelector('simplr-table') as SimplrTable;
        table.setData(users);
        table.setColumns(columns);
        console.log(table);
    }, 50);

    return html`
        <style>
            path {
            }
        </style>

        <simplr-table
            selectable
            @table-row-clicked=${(e: any) => handleRowClick(e)}
            @table-action-clicked=${(e: any) => handleTableAction(e)}
        >
            <simplr-button slot="actions-left" primary rounded data-action-name="Favorite">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
                    />
                </svg>
            </simplr-button>
            <simplr-button slot="actions-right" secondary rounded data-action-name="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M20 4h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711v2zm-7 15.5c0-1.267.37-2.447 1-3.448v-6.052c0-.552.447-1 1-1s1 .448 1 1v4.032c.879-.565 1.901-.922 3-1.006v-7.026h-18v18h13.82c-1.124-1.169-1.82-2.753-1.82-4.5zm-7 .5c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm5 0c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm13-.5c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-3.086-2.122l-1.414 1.414-1.414-1.414-.707.708 1.414 1.414-1.414 1.414.707.708 1.414-1.414 1.414 1.414.708-.708-1.414-1.414 1.414-1.414-.708-.708z"
                    />
                </svg>
            </simplr-button>
        </simplr-table>
        <button @click=${addUser}>Add User</button>
    `;
};
