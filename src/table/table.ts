import { html, TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
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

const rowIdKey = `${tablePropertyPrefix}_id`;
const leftSideActionsKey = `${tablePropertyPrefix}_leftActions`;
const rightSideActionsKey = `${tablePropertyPrefix}_rightActions`;

/**
 * @tagname simplr-table
 * */
@CustomElement('simplr-table')
export class SimplrTable extends SimplrComponentBase {
    @Property({})
    data: Array<any> = [];
    @Property({})
    columns: Array<TableColumn> = [];

    @Property({})
    shownRows: Array<any> = [];
    @Property({ reflect: true })
    pagesize: number = 20;
    @Property({ reflect: true })
    currentpage: number = 0;

    @Property({ reflect: true })
    dense: boolean = false;
    @Property({ reflect: true })
    selectable: boolean = false;
    @Property({ reflect: true })
    clickable: boolean = false;

    @Property({ reflect: true })
    nofooter: boolean = false;

    @Property({})
    leftSideActions: Array<Node> = [];
    @Property({})
    rightSideActions: Array<Node> = [];

    selectedRows: Array<any> = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() { }

    public setData(newData: Array<any>): void {
        this.data = Array.from(newData);

        const tableRowIdKey = rowIdKey;
        this.data.forEach(dRow => {
            if (!dRow.hasOwnProperty(tableRowIdKey)) {
                dRow[tableRowIdKey] = `${Date.now()}${Math.floor(Math.random() * (999 - 100) + 100)}`;
            }
        });
        this.setPage(this.currentpage);
        this.initializeHeaderWidths();
    }

    private async initializeHeaderWidths() {
        // Wait for all columns to initialize
        for (let i = 0; i < 2; i++) await this.getFrame();

        this.shadowRoot?.querySelectorAll('th').forEach((th: HTMLTableHeaderCellElement) => {
            console.log(th);
            console.log(th.clientWidth);
            const clientWidth = th.clientWidth;
            const hasWidthSet = !!th.style.width;
            if (!hasWidthSet) {
                th.style.width = clientWidth + 'px';
            }
        });
    }

    public update(): void {
        //this.requestRender();
    }

    public setColumns(newColumns: Array<TableColumn>): void {
        this.columns = newColumns;
    }

    setPage(pageNum: number) {
        this.currentpage = pageNum;
        this.setShownRows(this.data.slice(this.getFirstRowIndex(), this.getLastRowIndex()));
    }

    getFirstRowIndex(): number {
        return this.pagesize * this.currentpage;
    }

    getLastRowIndex(): number {
        const pageStart = this.getFirstRowIndex();
        const pageEnd = pageStart + this.pagesize;
        return pageEnd < this.data.length ? pageStart + this.pagesize : this.data.length;
    }

    setShownRows(shownRows: Array<any>) {
        this.shownRows = shownRows;
    }

    public nextPage() {
        if (this.onLastPage()) throw Error('No more pages to display');
        this.setPage(this.currentpage + 1);
    }

    public previousPage() {
        if (this.onFirstPage()) throw Error('Already at the last page');
        this.setPage(this.currentpage - 1);
    }

    public onLastPage(): boolean {
        return this.data.length - (this.currentpage + 1) * this.pagesize <= 0;
    }

    public onFirstPage(): boolean {
        return this.currentpage === 0;
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        switch (name) {
            case 'dense':
            case 'selectable':
            case 'clickable':
            case 'nofooter':
                (this as any)[name] = newValue != null;
                break;
            default:
                (this as any)[name] = newValue;
        }
    }

    static get observedAttributes() {
        return ['dense', 'clickable', 'selectable', 'pagesize', 'currentpage', 'nofooter'];
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
            const selectedData = this.shownRows[rowNum];
            this.selectedRows.push(selectedData);
        } else {
            this.selectedRows = this.selectedRows.filter(d => d[rowIdKey] != row[rowIdKey]);
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

    getTotalColumnCount(): number {
        return (
            this.columns.length + this.leftSideActions.length + this.rightSideActions.length + (this.selectable ? 1 : 0)
        );
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

    renderSelectableCheckboxes(row: any, rowNum: number, selectedRowIds: Array<string>): TemplateResult {
        if (!this.selectable) return html``;
        console.log(selectedRowIds);
        return html`<td class="actioncolumn">
            <simplr-checkbox
                ?checked=${selectedRowIds.includes(row[rowIdKey])}
                @click=${(e: Event) => this.handleCheckboxClick(e, row, rowNum)}
                primary
            ></simplr-checkbox>
        </td>`;
    }

    /**
     * Create the TemplateResult for the left side actions, and
     * save them since we don't want to re-create them
     * */
    renderLeftSideActions(row: any, i: number): TemplateResult {
        const actionKey = leftSideActionsKey;
        return this.createSideActions(row, i, this.leftSideActions, actionKey);
    }

    /**
     * Create the TemplateResult for the right side actions, and
     * save them since we don't want to re-create them
     * */
    renderRightSideActions(row: any, i: number): TemplateResult {
        const actionKey = rightSideActionsKey;
        return this.createSideActions(row, i, this.rightSideActions, actionKey);
    }

    createSideActions(row: any, i: number, sideActions: Array<Node>, actionKey: string) {
        if (sideActions.length <= 0) return '';
        if (row[actionKey]) return row[actionKey];

        const actions = document.createDocumentFragment();
        const column = document.createElement('td');
        column.className = 'actioncolumn';
        actions.appendChild(column);
        sideActions.map(action => {
            // Create a clone of the slotted actions,
            // and apply listeners to trigger table events
            const actionClone = action.cloneNode(true) as HTMLElement;
            actionClone.addEventListener('click', () => {
                const actionName = actionClone.dataset['actionName'] ?? '';
                const actionClickEventData: TableActionClickEvent = { row, rowIndex: i, actionName };
                this.dispatchEvent(new CustomEvent('table-action-clicked', { detail: actionClickEventData }));
            });
            column.appendChild(actionClone);
        });
        row[actionKey] = actions.querySelector('td'); // Get the actual element to keep reference
        return row[actionKey];
    }

    padLeftSideActions(): TemplateResult {
        return html` ${this.selectable ? paddingHeader : ''} ${this.leftSideActions.map(() => paddingHeader)} `;
    }
    padRightSideActions(): TemplateResult {
        return html`${this.rightSideActions.map(() => paddingHeader)}`;
    }

    get html(): TemplateResult {
        const selectedRowIds = this.selectedRows.map(r => r[rowIdKey]);
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
            this.shownRows,
            row => row[rowIdKey],
            (row, i) => html`
                            <tr @click=${(e: Event) => this.handleRowClick(e, row, i)} id=${row[rowIdKey]}>
                                ${this.renderSelectableCheckboxes(row, i, selectedRowIds)}
                                ${this.renderLeftSideActions(row, i)}
                                ${this.columns.map(col => this.createTableDataCell(row, col))}
                                ${this.renderRightSideActions(row, i)}
                            </tr>
                        `,
        )}
                    <tr class="spacer"></tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="${this.getTotalColumnCount()}">
                            ${this.nofooter
                ? html`<slot name="footer"></slot>`
                : html`
                                      <div>
                                          <p>
                                              ${this.getFirstRowIndex() + 1} - ${this.getLastRowIndex()} of
                                              ${this.data.length}
                                          </p>
                                          <button ?disabled=${this.onFirstPage()} @click=${() => this.previousPage()}>
                                              <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                              >
                                                  <path
                                                      d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
                                                  />
                                              </svg>
                                          </button>

                                          <button ?disabled=${this.onLastPage()} @click=${() => this.nextPage()}>
                                              <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                              >
                                                  <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
                                              </svg>
                                          </button>
                                      </div>
                                  `}
                        </td>
                    </tr>
                </tfoot>
            </table>
        `;
    }

    get css(): string {
        return css`
            :host {
                overflow: auto;
                display: flex;
                width: 100%;
                border: 1px solid rgba(224, 224, 224, 1);
                border-radius: 4px;
            }

            table {
                width: 100%;
                height: 100%;
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
                width: 2px;
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

            .spacer {
                height: 100%;
            }

            slot {
                display: none;
            }

            tfoot {
                font-size: 14px;
            }

            tfoot button {
                border: none;
                background: transparent;
                padding: 0;
                margin: 0 0.5rem;
                display: flex;
                align-items: center;
                cursor: pointer;
            }

            tfoot button[disabled] {
                opacity: 0.5;
                cursor: default;
            }

            tfoot button svg {
                width: 14px;
                height: 14px;
            }

            tfoot td {
                padding: 0.5rem 1rem;
            }

            tfoot td * {
                opacity: 0.8;
            }

            :host([nofooter]) tfoot td {
                border: none;
            }

            tfoot,
            tfoot tr,
            tfoot td {
                position: -webkit-sticky;
                position: sticky;
                bottom: 0;
                z-index: 5;
                background: #fff;
            }

            tfoot p {
                margin: 0 1rem 0 0;
            }

            tfoot div {
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        `;
    }
}
