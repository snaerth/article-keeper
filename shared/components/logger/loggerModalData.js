import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import shortid from 'shortid';

import levels from './level';
import Container from '../common/container';
import Button from '../common/button';
import Banner from '../common/banner';

import tableStyles from '../../styles/table.css';
import styles from './logger.scss';

/**
* Render rows from object properties recursively
*
* @param {Object} obj
* @returns {JSX}
*/
function renderObjectRecursive(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  return keys.map((v, i) => {
    if (values[i] && typeof values[i] === 'object') {
      return (
        <div key={shortid.generate()} className={classnames(styles.row, styles.rowPadding)}>
          <div>{v}</div>
          <div className={styles.overflowHidden}>{renderObjectRecursive(values[i])}</div>
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

function LoggerModalData({ data, deleteHandler }) {
  if (!data) return <div>No log avaliable</div>;
  const { _id, time, msg, name, level, err, req, res } = data;

  return (
    <article className={styles.modal}>
      <header>
        <Banner text="Logs" />
      </header>
      <section>
        <div className={classnames(tableStyles.tableOddRow, styles.row)}>
          <div>Id</div>
          <div>{_id}</div>
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
            <div className={styles.overflowHidden}>{renderObjectRecursive(req)}</div>
          </div>
        ) : null}
        {res ? (
          <div className={classnames(tableStyles.tableEvenRow, styles.row)}>
            <div>Response</div>
            <div className={styles.overflowHidden}>{renderObjectRecursive(res)}</div>
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
              onClick={() => deleteHandler(_id)}
            />
          </div>
        </Container>
      </footer>
    </article>
  );
}

LoggerModalData.propTypes = {
  data: PropTypes.object,
  deleteHandler: PropTypes.func.isRequired,
};

export default LoggerModalData;
