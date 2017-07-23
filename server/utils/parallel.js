import async from 'async';

export default function parallel(middlewares) {
  return function fn(req, res, next) {
    async.each(
      middlewares,
      (mw, cb) => {
        mw(req, res, cb);
      },
      next,
    );
  };
}
