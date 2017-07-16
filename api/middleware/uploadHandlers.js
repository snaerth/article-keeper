import formidable from 'formidable';

/**
 * Helper middleware for formidable
 * @param {Object} opts - Formidable options object
 * @returns {func}
 */
export default function formidableMiddleware(opts) {
  const form = new formidable.IncomingForm();
  Object.assign(form, opts);

  return (req, res, next) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return next(err);
      }

      Object.assign(req, { fields, files });
      return next();
    });
  };
}
