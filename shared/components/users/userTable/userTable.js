import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-virtualized/dist/commonjs/Table';
import Column from 'react-virtualized/dist/commonjs/Table/Column';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import formatISODateTime from '../../../utils/date';
import getUserEmail from '../../../utils/userHelper';
import NotifyBox from '../../common/notifyBox';
import tableStyles from '../../../styles/table.css';

class UsersTable extends PureComponent {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onRowClickHandler: PropTypes.func.isRequired,
    rowClassName: PropTypes.func.isRequired,
  };

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
            height={600}
            headerHeight={30}
            rowHeight={30}
            headerClassName={tableStyles.tableHeader}
            rowClassName={rowClassName}
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}
            onRowClick={({ event, index, rowData }) =>
              onRowClickHandler(event, index, rowData)}
          >
            <Column
              cellRenderer={(cellData) => {
                if (cellData.rowData.thumbnailUrl) {
                  return (
                    <img
                      src={cellData.rowData.thumbnailUrl}
                      alt={cellData.rowData.name}
                    />
                  );
                }
                return null;
              }}
              className={tableStyles.tableColumn}
              label="Image"
              dataKey="thumbnailUrl"
              width={100}
            />
            <Column
              className={tableStyles.tableColumn}
              label="Name"
              dataKey="name"
              width={250}
            />
            <Column
              cellRenderer={(cellData) => {
                let email = cellData.rowData.email;
                if (!email) {
                  email = getUserEmail(cellData.rowData);
                }
                return email;
              }}
              getUserEmail
              className={tableStyles.tableColumn}
              label="Email"
              dataKey="thumbnailUrl"
              width={210}
            />
            <Column
              className={tableStyles.tableColumn}
              label="Id"
              dataKey="_id"
              width={230}
            />
            <Column
              cellDataGetter={(columnData) =>
                formatISODateTime(columnData.rowData.createdAt)}
              className={tableStyles.tableColumn}
              label="Created at"
              dataKey="createdAt"
              width={180}
            />
            <Column
              className={tableStyles.tableColumn}
              label="Roles"
              dataKey="roles"
              width={150}
            />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

export default UsersTable;
