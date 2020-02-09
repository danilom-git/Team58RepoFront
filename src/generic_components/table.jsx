import React, {Component} from 'react';

/**
 * props: headers, rows, onHeaderClick, onRowClick, emptyListMsg
 * headers: [ {headId, text}, ...]
 * rows: [ { rowId: value,
 *           headId1: value,
 *           headId2: value,... }, ...]
 * extraHeaders : [ {id: value, text: value, onClick: value}, ... ]
 */
class Table extends Component {
    render() {
        let defaultEmptyListMsg = 'Table is empty.';

        if (!this.props.headers)
            return <p className='text-danger font-weight-bold'>No table to display.</p>;
        else if (!this.props.rows || !this.props.rows.length) {
            return <p className='text-warning font-weight-bold'>{this.props.emptyListMsg ? this.props.emptyListMsg : defaultEmptyListMsg}</p>;
        }
        else {
            //(e) => this.props.onRowClick(e,row.rowId)
            return (
                <div className='table-responsive'>
                    <table className='table table-hover table-bordered table-secondary'>
                        <thead className='thead-dark'>
                        <tr>
                            {this.props.headers.map(header =>
                                <th key={header.headId} id={header.headId} onClick={this.props.onHeaderClick}>{header.text}</th>
                            )}
                            {this.props.extraHeaders && this.props.extraHeaders.map(extraHeader =>
                                <th key={extraHeader.id} id={extraHeader.id}/>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.rows.map(row =>
                            <tr key={row.rowId} id={row.rowId} onClick={(e) => this.props.onRowClick && this.props.onRowClick(e, row.rowId)}>
                                {
                                    this.props.headers.map(header => {
                                        let value = row[header.headId];
                                        value = isNaN(value) ? value : (Math.round(value * 100) / 100).toFixed(2);
                                        return <td key={header.headId} id={header.headId} data-row-id={row.rowId}>{value}</td>;
                                    })
                                }
                                {
                                    this.props.extraHeaders && this.props.extraHeaders.map(extraHeader => {
                                        return (
                                            <td key={extraHeader.id} id={extraHeader.id}>
                                                <button className='btn btn-secondary' onClick={() => extraHeader.onClick && extraHeader.onClick(row.rowId)}>
                                                    {extraHeader.text}
                                                </button>
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default Table;
