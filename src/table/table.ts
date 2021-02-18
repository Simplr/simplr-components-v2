import { html, TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { SimplrComponentBase, CustomElement, Property, css } from '@simplr-wc/core';
import '@simplr-wc/checkbox';
import SimplrCheckbox from '@simplr-wc/checkbox';

export interface TableColumn {
    field: string;
    header?: string;
    width?: number;
    sortable?: boolean;
    get?: Function;
}

export interface TableRowClickEvent {
    row: any;
    allSelectedRows: Array<any>;
    selected: boolean;
}

export interface TableActionClickEvent {
    row: any;
    actionName: string;
    rowIndex: number;
}

const paddingHeader = html`<th class="actioncolumn"></th>`;
const tablePropertyPrefix = '_simplrtable';

@CustomElement('simplr-table')
export default class SimplrTable extends SimplrComponentBase {
    @Property({})
    data: Array<any> = [];
    @Property({})
    columns: Array<TableColumn> = [];

    @Property({ reflect: true })
    dense: boolean = false;
    @Property({ reflect: true })
    selectable: boolean = false;
    @Property({ reflect: true })
    clickable: boolean = false;

    @Property({})
    leftSideActions: Array<Node> = [];
    @Property({})
    rightSideActions: Array<Node> = [];

    selectedRows: Array<any> = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {}

    public setData(newData: Array<any>): void {
        this.data = Array.from(newData);

        const tableRowIdKey = `${tablePropertyPrefix}_id`;
        this.data.forEach(dRow => {
            if (!dRow.hasOwnProperty(tableRowIdKey)) {
                dRow[tableRowIdKey] = `${Date.now()}${Math.floor(Math.random() * (999 - 100) + 100)}`;
            }
        });
    }

    public update(): void {
        this.requestRender();
    }

    public setColumns(newColumns: Array<TableColumn>): void {
        this.columns = newColumns;
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        switch (name) {
            case 'dense':
            case 'selectable':
            case 'clickable':
                (this as any)[name] = newValue != null;
                break;
            default:
                (this as any)[name] = newValue;
        }
    }

    static get observedAttributes() {
        return ['dense', 'clickable', 'selectable'];
    }

    handleSlotChange(e: Event) {
        const slotNode = e.composedPath()[0] as HTMLSlotElement;
        const slotName = slotNode.name;
        const isLeftActions = slotName === 'actions-left';

        if (isLeftActions) {
            this.leftSideActions = slotNode.assignedNodes();
        } else {
            this.rightSideActions = slotNode.assignedNodes();
        }
    }

    async handleRowClick(e: Event, row: any, rowNum: number) {
        const firstNode = e.composedPath()[0] as Node;
        // Check if clicked the row, or an element inside the row
        const clickedRowElement = ['TD', 'TR'].includes(firstNode.nodeName);

        if (clickedRowElement) {
            const rowElem = this.getRows()[rowNum];
            const checkbox = rowElem.querySelector('simplr-checkbox') as SimplrCheckbox;

            const selected = !checkbox.checked;
            checkbox.checked = selected;

            this.handleRowSelect(row, rowNum, selected);
        }
    }

    handleRowSelect(row: any, rowNum: number, selected: boolean) {
        const clickDetail: TableRowClickEvent = {
            row,
            allSelectedRows: [],
            selected: selected,
        };

        if (selected) {
            this.selectedRows.push(this.data[rowNum]);
        } else {
            this.selectedRows = this.selectedRows.filter(d => d._table_id != row._table_id);
        }

        clickDetail.allSelectedRows = this.getSelectedRows();
        this.dispatchEvent(new CustomEvent('table-row-clicked', { detail: clickDetail }));
    }

    async handleCheckboxClick(e: Event, row: any, rowNum: number) {
        const checkbox = e.target as SimplrCheckbox;
        await this.getFrame();
        const checked = Boolean(checkbox.checked);
        this.handleRowSelect(row, rowNum, checked);
    }

    public getSelectedRows() {
        return this.sanitizeRowList(this.selectedRows);
    }

    /**
     * Remove properties set by Simplr Table
     * */
    private sanitizeRowList(rowList: Array<any>): Array<any> {
        if (rowList.length < 1) return rowList;

        const keysToRemove = Object.keys(rowList[0]).filter((key: string) => key.startsWith('_simplrtable_'));
        return rowList.map(row => {
            const copy = { ...row };
            keysToRemove.forEach(key => delete copy[key]);
            return copy;
        });
    }

    getRows(): Array<HTMLTableRowElement> {
        const tableBody = this.shadowRoot?.querySelector('tbody');
        const rows = tableBody?.querySelectorAll('tr');
        return rows ? Array.from(rows) : [];
    }

    private getFrame(): Promise<void> {
        return new Promise(resolve => window.requestAnimationFrame(() => resolve()));
    }

    getColumnHeader(col: TableColumn): string {
        return col.header ? col.header : col.field;
    }

    getColumnData(row: any, col: TableColumn): string {
        if (col.get) {
            return col.get(row);
        }

        return row.hasOwnProperty(col.field) ? row[col.field] : '';
    }

    createTableDataHeader(col: TableColumn): TemplateResult {
        if (col.width) {
            return html`<th style="width: ${col.width}px;">${this.getColumnHeader(col)}</th>`;
        }
        return html`<th>${this.getColumnHeader(col)}</th>`;
    }

    createTableDataCell(row: any, col: TableColumn): TemplateResult {
        return html`<td>${this.getColumnData(row, col)}</td>`;
    }

    renderSelectableCheckboxes(row: any, rowNum: number): TemplateResult {
        if (!this.selectable) return html``;
        return html`<td class="actioncolumn">
            <simplr-checkbox @click=${(e: Event) => this.handleCheckboxClick(e, row, rowNum)} primary></simplr-checkbox>
        </td>`;
    }

    /**
     * Create the TemplateResult for the left side actions, and
     * save them since we don't want to re-create them
     * */
    renderLeftSideActions(row: any, i: number): TemplateResult {
        const actionKey = `${tablePropertyPrefix}_leftActions`;
        return this.createSideActions(row, i, this.leftSideActions, actionKey);
    }

    /**
     * Create the TemplateResult for the right side actions, and
     * save them since we don't want to re-create them
     * */
    renderRightSideActions(row: any, i: number): TemplateResult {
        const actionKey = `${tablePropertyPrefix}_rightActions`;
        return this.createSideActions(row, i, this.rightSideActions, actionKey);
    }

    createSideActions(row: any, i: number, sideActions: Array<Node>, actionKey: string) {
        if (row[actionKey]) return row[actionKey];

        const actions = document.createDocumentFragment();
        sideActions.map(action => {
            // Create a clone of the slotted actions,
            // and apply listeners to trigger table events
            const actionClone = action.cloneNode(true) as HTMLElement;
            actionClone.addEventListener('click', () => {
                const actionName = actionClone.dataset['actionName'] ?? '';
                const actionClickEventData: TableActionClickEvent = { row, rowIndex: i, actionName };
                this.dispatchEvent(new CustomEvent('table-action-clicked', { detail: actionClickEventData }));
            });
            actions.appendChild(actionClone);
        });
        row[actionKey] = html`<td class="actioncolumn">${actions}</td>`;
        return row[actionKey];
    }

    padLeftSideActions(): TemplateResult {
        return html` ${this.selectable ? paddingHeader : ''} ${this.leftSideActions.map(() => paddingHeader)} `;
    }
    padRightSideActions(): TemplateResult {
        return html`${this.rightSideActions.map(() => paddingHeader)}`;
    }

    get html(): TemplateResult {
        return html`
            <slot @slotchange=${(e: Event) => this.handleSlotChange(e)} name="actions-left"></slot>
            <slot @slotchange=${(e: Event) => this.handleSlotChange(e)} name="actions-right"></slot>
            <table>
                <thead>
                    <tr>
                        ${this.padLeftSideActions()} ${this.columns.map(col => this.createTableDataHeader(col))}
                        ${this.padRightSideActions()}
                    </tr>
                </thead>
                <tbody>
                    ${repeat(
                        this.data,
                        row => row[tablePropertyPrefix + '_id'],
                        (row, i) => html`
                            <tr
                                @click=${(e: Event) => this.handleRowClick(e, row, i)}
                                id=${row[tablePropertyPrefix + '_id']}
                            >
                                ${this.renderSelectableCheckboxes(row, i)} ${this.renderLeftSideActions(row, i)}
                                ${this.columns.map(col => this.createTableDataCell(row, col))}
                                ${this.renderRightSideActions(row, i)}
                            </tr>
                        `,
                    )}
                </tbody>
            </table>
        `;
    }

    get css(): string {
        return css`
            :host {
                display: flex;
                width: 100%;
            }

            table {
                width: 100%;
                color: rgba(0, 0, 0, 0.87);
                border-spacing: 0;
            }

            th {
                text-align: left;
            }

            th.actioncolumn,
            td.actioncolumn {
                padding: 0;
                white-space: nowrap;
                width: 1px;
            }

            th,
            td {
                box-sizing: border-box;
                padding: 1rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.4);
            }

            tr {
                transition: 100ms ease-in-out;
                border-radius: 2px;
            }

            :host([clickable]) tr {
                cursor: pointer;
            }

            tbody tr:hover {
                z-index: 1;
                box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                    0px 1px 8px 0px rgba(0, 0, 0, 0.12), 0px -1px 1px 2px rgba(0, 0, 0, 0.08);
            }

            :host([dense]) th,
            :host([dense]) td {
                padding: 0.2rem;
            }

            slot {
                display: none;
            }
        `;
    }
}
