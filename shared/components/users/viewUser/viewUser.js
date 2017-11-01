import React from 'react';
import PropTypes from 'prop-types';
import Container from '../../common/container';
import ImageBlurWrapper from '../../common/imageBlurWrapper';
import Button from '../../common/button';
import Tags from '../../common/tags';
import formatISODateTime, { formatDateWithMonthName } from '../../../utils/date';
import getUserEmail from '../../../utils/userHelper';
import Person from '../../../assets/images/person.svg';
import s from './viewUser.scss';

const View = ({ data, changeViewHandler }) => {
  const {
    _id,
    roles,
    profile,
    name,
    createdAt,
    updatedAt,
    dateOfBirth,
    imageUrl,
    thumbnailUrl,
  } = data;
  const email = getUserEmail(data);

  return (
    <div>
      <Container>
        <div className={s.grid}>
          <aside>
            {imageUrl ? (
              <ImageBlurWrapper
                src={imageUrl}
                thumbnail={thumbnailUrl}
                alt={name}
                className={s.profileImage}
              />
            ) : (
              <Person className={s.person} />
            )}
          </aside>
          <section>
            <div className={s.row}>
              <div>Email</div>
              <div>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
            <div className={s.row}>
              <div>Id</div>
              <div>{_id}</div>
            </div>
            <div className={s.row}>
              <div>Roles</div>
              <div>
                <Tags roles={roles} />
              </div>
            </div>
            <div className={s.row}>
              <div>Profile</div>
              <div>{profile}</div>
            </div>
            <div className={s.row}>
              <div>Created at</div>
              <div>{formatISODateTime(createdAt)}</div>
            </div>
            {updatedAt ? (
              <div className={s.row}>
                <div>Updated at</div>
                <div>{formatISODateTime(updatedAt)}</div>
              </div>
            ) : null}
            {dateOfBirth ? (
              <div className={s.row}>
                <div>Date of birth</div>
                <div>{formatDateWithMonthName(dateOfBirth)}</div>
              </div>
            ) : null}
          </section>
        </div>
      </Container>
      <footer>
        <Container>
          <div className={s.buttonsContainer}>
            <Button
              type="button"
              text="Edit"
              ariaLabel="Edit user"
              color="grey"
              onClick={() => changeViewHandler(2)}
            />
            <Button
              type="button"
              text="Delete"
              ariaLabel="Delete user"
              color="red"
              onClick={() => changeViewHandler(1)}
            />
          </div>
        </Container>
      </footer>
    </div>
  );
};

View.propTypes = {
  data: PropTypes.object.isRequired,
  changeViewHandler: PropTypes.func.isRequired,
};

export default View;
