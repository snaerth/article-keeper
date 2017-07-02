import News from '../models/news';
import { validateEmail } from '../services/utils';

/**
 * Create new news and save to database
 *
 * @param {Object} news - Mongoose news schema object
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
function saveNews(news) {
  return new Promise((resolve, reject) => {
    if (news.constructor.name === 'model') {
      // Save news to databases
      return news.save((error) => {
        if (error) {
          return reject(error);
        }

        return resolve(news);
      });
    }
    return reject('Object is not a mongoose object');
  });
}

/**
 * Validates news properties
 *
 * @param {Object} news - News properties
 * @param {Object} res
 * @returns {Promise}
 * @author Snær Seljan Þóroddsson
 */
function validateNewsProps({
  title,
  shortDescription,
  description,
  author,
  authorEmail,
}) {
  return new Promise((resolve, reject) => {
    // Validate email
    if (!validateEmail(authorEmail)) {
      return reject(`${authorEmail} is not a valid email`);
    }

    // Name has to have aleast two names
    if (!/^([^0-9]*)$/.test(author) || author.trim().split(' ').length < 2) {
      return reject('Name has aleast two 2 names consisting of letters');
    }

    if (!title) {
      return reject('Yout must provide news title');
    }

    if (!shortDescription) {
      return reject('Yout must provide news short description');
    }

    if (!description) {
      return reject('Yout must provide news description');
    }

    return resolve();
  });
}

/**
 * Creates news
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {res}
 * @author Snær Seljan Þóroddsson
 */
export async function createNews(req, res) {
  const {
    title,
    shortDescription,
    description,
    author,
    authorEmail,
  } = req.body;

  try {
    await validateNewsProps({
      title,
      shortDescription,
      description,
      author,
      authorEmail,
    });
    const news = new News({
      title,
      shortDescription,
      description,
      author,
      authorEmail,
    });

    const newNews = await saveNews(news);

    return res.status(200).send(newNews);
  } catch (error) {
    return res.status(422).send({ error });
  }
}

/**
 * Deletes news
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function deleteNews(req, res) {
  // TODO implement
  res.send('Deleting news');
}

/**
 * Update news
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function updateNews(req, res) {
  // TODO implement
  res.send('Editing news');
}

/**
 * Gets list of all news
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function getNews(req, res) {
  // TODO implement
  res.send('Getting news');
}
