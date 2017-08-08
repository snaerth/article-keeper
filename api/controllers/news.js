import News from '../models/news';
import { validateEmail, validateSeoUrl } from '../services/utils';
import log from '../services/logService';
import convertToFriendlyUrl from '../utils/friendlyUrl';

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
  seoUrl,
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
      return reject('You must provide news title');
    }

    if (!shortDescription) {
      return reject('You must provide news short description');
    }

    if (!description) {
      return reject('You must provide news description');
    }

    if (!seoUrl) {
      return reject('No SEO url provided or created');
    }

    if (!validateSeoUrl(seoUrl)) {
      return reject('SEO url could not be validated');
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
    const seoUrl = convertToFriendlyUrl(title);
    await validateNewsProps({
      title,
      shortDescription,
      description,
      author,
      authorEmail,
      seoUrl,
    });
    const news = new News({
      title,
      shortDescription,
      description,
      author,
      authorEmail,
      seoUrl,
    });

    const newNews = await saveNews(news);

    return res.status(200).send(newNews);
  } catch (err) {
    log.error({ req, res, err }, 'Error creating news');
    return res.status(422).send({ error: err });
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
