import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-virtualized/dist/commonjs/Table';
import Column from 'react-virtualized/dist/commonjs/Table/Column';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import formatISODateTime from '../../../utils/date';
import getUserEmail from '../../../utils/userHelper';
import { sortHelper } from '../../../utils/sortDirection';
import NotifyBox from '../../common/notifyBox';
import tableStyles from '../../../styles/table.css';

class UsersTable extends PureComponent {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onRowClickHandler: PropTypes.func.isRequired,
    onSortClickHandler: PropTypes.func.isRequired,
    rowClassName: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      sort: [],
    };

    this.sort = this.sort.bind(this);
  }

  /**
   * Table sort handler
   *
   * @param {Object} obj
   * @param {String} obj.sortBy
   * @param {String} obj.sortDirection
   */
  sort({ sortBy, sortDirection }) {
    const { sort } = this.state;
    const result = sortHelper(sort, sortBy, sortDirection);

    // Callback to parent component
    this.props.onSortClickHandler(result.currentSort.sortBy, result.currentSort.sortDirection);
    this.setState({ sort: result.sort });
  }

  render() {
    const { list, onRowClickHandler, rowClassName } = this.props;

    if (list.length === 0) {
      return (
        <fieldset className="noPadding">
          <NotifyBox text="No users found" type="info" />
        </fieldset>
      );
    }

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            width={width}
            height={500}
            headerHeight={37}
            rowHeight={37}
            headerClassName={tableStyles.tableHeader}
            rowClassName={rowClassName}
            rowCount={list.length}
            sort={this.sort}
            rowGetter={({ index }) => list[index]}
            onRowClick={({ event, index, rowData }) => onRowClickHandler(event, index, rowData)}
          >
            <Column
              cellRenderer={(cellData) => {
                if (cellData.rowData.thumbnailUrl) {
                  return <img src={cellData.rowData.thumbnailUrl} alt={cellData.rowData.name} />;
                }
                return null;
              }}
              className={tableStyles.tableColumn}
              label="Image"
              dataKey="thumbnailUrl"
              width={100}
              disableSort
            />
            <Column className={tableStyles.tableColumn} label="Name" dataKey="name" width={250} />
            <Column
              cellRenderer={(cellData) => {
                let { email } = cellData.rowData;
                if (!email) {
                  email = getUserEmail(cellData.rowData);
                }
                return email;
              }}
              getUserEmail
              className={tableStyles.tableColumn}
              label="Email"
              dataKey="email"
              width={210}
            />
            <Column
              className={tableStyles.tableColumn}
              label="Id"
              dataKey="id"
              width={230}
              disableSort
            />
            <Column
              cellDataGetter={(columnData) => formatISODateTime(columnData.rowData.createdAt)}
              className={tableStyles.tableColumn}
              label="Created at"
              dataKey="createdAt"
              width={180}
            />
            <Column className={tableStyles.tableColumn} label="Roles" dataKey="roles" width={150} />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

export default UsersTable;
