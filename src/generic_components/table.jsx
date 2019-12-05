import React, {Component} from 'react';

/**
 * props: headers, rows, sort, emptyListMsg
 * headers: [ {headId, text}, ...]
 * rows: [ {rowId, rowData}, ...]
 * rowItems: [ {headId, text}, ... ]
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
            return (
                <table className='table table-hover table-bordered table-secondary'>
                    <thead className='thead-dark'>
                    <tr>
                        {this.props.headers.map(header =>
                            <th key={header.headId} id={header.headId} onClick={this.props.sort}>{header.text}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.rows.map(row =>
                        <tr key={row.rowId}>
                            {row.rowData.map(item =>
                                <td key={item.headId}>
                                    {isNaN(item.text) ? item.text :
                                        (Math.round(item.text * 100) / 100).toFixed(2)}
                                </td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            );
        }
    }
}

export default Table;