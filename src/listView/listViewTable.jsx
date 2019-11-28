import React, {Component} from 'react';

class ListViewTable extends Component {
    render() {
        if (this.props.rows && this.props.rows.length) {
            return (
                <table>
                    <ListViewTableHeader headers={Object.keys(this.props.rows[0])} onHeaderClick={this.props.onHeaderClick}/>
                    <ListViewTableBody headers={Object.keys(this.props.rows[0])} rows={this.props.rows}/>
                </table>
            );
        } else {
            return (
                <div>Nothing to display.</div>
            );
        }
    }
}

class ListViewTableHeader extends Component {
    render() {
        return (
            <thead>
                <tr>
                    {this.props.headers.map(header => header!=='id' && <th key={header} id={header} onClick={this.props.onHeaderClick}>{header}</th>)}
                </tr>
            </thead>
        );
    }
}

class ListViewTableBody extends Component {
    render() {
        return (
            <tbody>
                {this.props.rows.map(row => <ListViewTableRow key={row.id} headers={this.props.headers} row={row}/>)}
            </tbody>
        );
    }
}

class ListViewTableRow extends Component {
    render() {
        return (
          <tr>
              {this.props.headers.map(header => header!=='id' && <td key={header}>{this.props.row[header]}</td>)}
          </tr>
        );
    }
}

export default ListViewTable;