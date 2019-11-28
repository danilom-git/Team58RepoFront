import React, {Component} from 'react';

// const sum_headers = [
//     'wow', 'wee', 'guys'
// ];
// const sum_rows = [
//     {
//         id: 1,
//         wow: 'wowOne',
//         wee: 'weeOne',
//         guys: 'guysOne'
//     },
//     {
//         id: 2,
//         wow: 'wowTwo',
//         wee: 'weeTwo',
//         guys: 'guysTwo'
//     },
//     {
//         id: 3,
//         wow: 'wowThree',
//         wee: 'weeThree',
//         guys: 'guysThree'
//     }
// ];

class ListViewTable extends Component {
    render() {
        return (
            this.props.headers && this.props.rows && <table>
                <ListViewTableHeader headers={this.props.headers}/>
                <ListViewTableBody headers={this.props.headers} rows={this.props.rows}/>
            </table>
        );
    }
}

class ListViewTableHeader extends Component {
    render() {
        return (
            <thead>
                <tr>
                    {this.props.headers.map(header => <th key={header}>{header}</th>)}
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
              {this.props.headers.map(header => <td key={header}>{this.props.row[header]}</td>)}
          </tr>
        );
    }
}

export default ListViewTable;