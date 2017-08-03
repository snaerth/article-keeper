import Bunyan from 'bunyan';
import stream from 'stream';
import util from 'util';
import Log from '../models/log';
import config from '../config';

// VARIABLES
const { APPLICATION_NAME } = config;
const Writable = stream.Writable;

/**
 * the LogStream constructor.
 * it inherits all methods of a writable stream
 * the constructor takes a options object. A important field is the model, the model will
 * be used for saving the log entry to the mongo db instance.
 * @param options
 * @constructor
 */
function LogStream(options) {
  this.model = options.model || false;

  if (!this.model) {
    throw new Error('[LogStream] - Fatal Error - No mongoose model provided!');
  }

  Writable.call(this, options);
}

/**
 * inherits all Writable Stream methods
 */
util.inherits(LogStream, Writable);

/**
 * the _write method must be overridden by this implementation.
 * This method will be called on every write event on this stream.
 * @param chunk
 * @param enc
 * @param cb
 * @returns {*}
 */
// eslint-disable-next-line
LogStream.prototype._write = function(chunk, enc, cb) {
  if (this.model === false) {
    return cb();
  }

  const newLogEntry = new this.model(JSON.parse(chunk.toString())); // eslint-disable-line

  newLogEntry.save((err) => {
    if (err) {
      throw err;
    }
    return cb();
  });
};

/**
 * export the logStream
 * @param options
 * @returns {LogStream}
 */
function logStream(options) {
  return new LogStream(options || {});
}

const LogEntryStream = logStream({ model: Log });

const options = {
  name: APPLICATION_NAME,
  streams: [
    {
      stream: LogEntryStream,
    },
  ],
  serializers: {
    err: Bunyan.stdSerializers.err,
    req: Bunyan.stdSerializers.req,
    res: Bunyan.stdSerializers.res,
  },
};

const log = Bunyan.createLogger(options);

export default log;
