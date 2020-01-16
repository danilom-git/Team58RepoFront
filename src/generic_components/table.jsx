import React, {Component} from 'react';

/**
 * props: headers, rows, onHeaderClick, onRowClick, emptyListMsg
 * headers: [ {headId, text}, ...]
 * rows: [ { rowId: value,
 *           headId1: value,
 *           headId2: value,... }, ...]
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
                <table className='table table-hover table-bordered table-secondary'>
                    <thead className='thead-dark'>
                    <tr>
                        {this.props.headers.map(header =>
                            <th key={header.headId} id={header.headId} onClick={this.props.onHeaderClick}>{header.text}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.rows.map(row =>
                        <tr key={row.rowId} id={row.rowId} onClick={(e) => this.props.onRowClick(e,row.rowId)}>
                            {this.props.headers.map(header => {
                                let value = row[header.headId];
                                value = isNaN(value) ? value : (Math.round(value * 100) / 100).toFixed(2);
                                return <td key={header.headId} id={header.headId} data-row-id={row.rowId}>{value}</td>;
                            })}
                        </tr>
                    )}
                    </tbody>
                </table>
            );
        }
    }
}

export default Table;