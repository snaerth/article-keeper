import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import shortid from 'shortid';

import levels from './level';
import Container from '../common/container';
import Button from '../common/button';
import Banner from '../common/banner';
import Delete from '../common/delete';

import tableStyles from '../../styles/table.css';
import styles from './logger.scss';

class LoggerModalData extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showTable: true,
    };

    this.showDeleteView = this.showDeleteView.bind(this);
  }
  /**
   * Render rows from object properties recursively
   *
   * @param {Object} obj
   * @returns {JSX}
   */
  renderObjectRecursive(obj) {
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    return keys.map((v, i) => {
      if (values[i] && typeof values[i] === 'object') {
        return (
          <div key={shortid.generate()} className={classnames(styles.row, styles.rowPadding)}>
            <div>{v}</div>
            <div className={styles.overflowHidden}>{this.renderObjectRecursive(values[i])}</div>
          </div>
        );
      }

      return (
        <div key={shortid.generate()} className={styles.row}>
          <div>{v}</div>
          <div>{JSON.stringify(values[i])}</div>
        </div>
      );
    });
  }

  showDeleteView(showTable) {
    this.setState({ showTable });
  }

  render() {
    const { data, deleteHandler } = this.props;
    if (!data) return <div>No log avaliable</div>;
    const {
      id, time, msg, name, level, err, req, res,
    } = data;
    const { showTable } = this.state;

    return (
      <article className={styles.modal}>
        <header>
          <Banner text="Logs" />
        </header>
        {showTable ? (
          <div>
            <section>
              <div className={classnames(tableStyles.tableOddRow, styles.row)}>
                <div>Id</div>
                <div>{id}</div>
              </div>
              <div className={classnames(tableStyles.tableEvenRow, styles.row)}>
                <div>Time</div>
                <div>{time}</div>
              </div>
              <div className={classnames(tableStyles.tableOddRow, styles.row)}>
                <div>Message</div>
                <div>{msg}</div>
              </div>
              <div className={classnames(tableStyles.tableEvenRow, styles.row)}>
                <div>Name</div>
                <div>{name}</div>
              </div>
              <div className={classnames(tableStyles.tableOddRow, styles.row)}>
                <div>Level</div>
                <div>{`${level} - ${levels(level)}`}</div>
              </div>
              {err || (err && err.stack) ? (
                <div className={classnames(tableStyles.tableEvenRow, styles.row)}>
                  <div>Error</div>
                  <div>{!err.stack ? err : err.stack}</div>
                </div>
              ) : null}
              {req ? (
                <div className={classnames(tableStyles.tableOddRow, styles.row)}>
                  <div>Request</div>
                  <div className={styles.overflowHidden}>{this.renderObjectRecursive(req)}</div>
                </div>
              ) : null}
              {res ? (
                <div className={classnames(tableStyles.tableEvenRow, styles.row)}>
                  <div>Response</div>
                  <div className={styles.overflowHidden}>{this.renderObjectRecursive(res)}</div>
                </div>
              ) : null}
            </section>
            <footer>
              <Container>
                <div className={styles.deleteButtonContainer}>
                  <Button
                    type="button"
                    text="Delete"
                    ariaLabel="Delete log"
                    color="red"
                    onClick={() => this.showDeleteView(false)}
                  />
                </div>
              </Container>
            </footer>
          </div>
        ) : (
          <Delete
            text={`Do you really want to delete ${id}`}
            deleteHandler={deleteHandler}
            deleteHandlerId={id} // eslint-disable-line
            cancelHandler={this.showDeleteView}
            cancelHandlerId
          />
        )}
      </article>
    );
  }
}

LoggerModalData.propTypes = {
  data: PropTypes.object,
  deleteHandler: PropTypes.func.isRequired,
};

export default LoggerModalData;
