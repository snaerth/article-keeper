import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import Container from '../../components/container';

class Logger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          _id: '598da61706c2d924403f8486',
          name: 'Application name',
          level: 50,
          req: {
            remotePort: 49929,
            remoteAddress: '::1',
            headers: {
              cookie: 'connect.sid=s%3AOCfJp0J1rr7egEUe_vaXdUbSRZFi8GmV.pK3RYowlJe1Twq4xX9PhchQdgIEZpg3s6A9zn5UOhTM',
              'accept-language': 'en-US,en;q=0.8,sv;q=0.6,fa;q=0.4',
              'accept-encoding': 'gzip, deflate, br',
              accept: '*/*',
              'content-type': 'application/x-www-form-urlencoded',
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
              origin: 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop',
              'cache-control': 'no-cache',
              'postman-token': '5caeef7a-5ff4-cc5e-9d76-bce68245af28',
              'content-length': '9',
              connection: 'keep-alive',
              host: 'localhost:3030',
            },
            url: '/createfakelogs',
            method: 'POST',
          },
          res: {
            header: null,
            statusCode: 200,
          },
          err: {
            stack: 'Error: Fake Error log 0\n    at c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:97:26\n    at Generator.next (<anonymous>)\n    at step (c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:687)\n    at c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:917\n    at Promise (<anonymous>)\n    at c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:598\n    at createFakeLogs (c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:61)\n    at Layer.handle [as handle_request] (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\route.js:137:13)\n    at Route.dispatch (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\route.js:112:3)\n    at Layer.handle [as handle_request] (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\index.js:281:22\n    at Function.process_params (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at c:\\projects\\starter-kit-universal\\node_modules\\async\\dist\\async.js:421:16\n    at iteratorCallback (c:\\projects\\starter-kit-universal\\node_modules\\async\\dist\\async.js:998:13)\n    at c:\\projects\\starter-kit-universal\\node_modules\\async\\dist\\async.js:906:16\n    at Immediate.<anonymous> (c:\\projects\\starter-kit-universal\\node_modules\\express-session\\index.js:489:7)\n    at runCallback (timers.js:785:20)\n    at tryOnImmediate (timers.js:743:5)\n    at processImmediate [as _immediateCallback] (timers.js:714:5)',
            name: 'Error',
            message: 'Fake Error log 0',
          },
          msg: 'Fake Error log 0',
          time: '2017-08-11T12:41:59.788Z',
          __v: 0,
        },
        {
          _id: '598da61706c2d924403f8486',
          name: 'Application name',
          level: 50,
          req: {
            remotePort: 49929,
            remoteAddress: '::1',
            headers: {
              cookie: 'connect.sid=s%3AOCfJp0J1rr7egEUe_vaXdUbSRZFi8GmV.pK3RYowlJe1Twq4xX9PhchQdgIEZpg3s6A9zn5UOhTM',
              'accept-language': 'en-US,en;q=0.8,sv;q=0.6,fa;q=0.4',
              'accept-encoding': 'gzip, deflate, br',
              accept: '*/*',
              'content-type': 'application/x-www-form-urlencoded',
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
              origin: 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop',
              'cache-control': 'no-cache',
              'postman-token': '5caeef7a-5ff4-cc5e-9d76-bce68245af28',
              'content-length': '9',
              connection: 'keep-alive',
              host: 'localhost:3030',
            },
            url: '/createfakelogs',
            method: 'POST',
          },
          res: {
            header: null,
            statusCode: 200,
          },
          err: {
            stack: 'Error: Fake Error log 0\n    at c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:97:26\n    at Generator.next (<anonymous>)\n    at step (c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:687)\n    at c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:917\n    at Promise (<anonymous>)\n    at c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:598\n    at createFakeLogs (c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:61)\n    at Layer.handle [as handle_request] (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\route.js:137:13)\n    at Route.dispatch (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\route.js:112:3)\n    at Layer.handle [as handle_request] (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\index.js:281:22\n    at Function.process_params (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at c:\\projects\\starter-kit-universal\\node_modules\\async\\dist\\async.js:421:16\n    at iteratorCallback (c:\\projects\\starter-kit-universal\\node_modules\\async\\dist\\async.js:998:13)\n    at c:\\projects\\starter-kit-universal\\node_modules\\async\\dist\\async.js:906:16\n    at Immediate.<anonymous> (c:\\projects\\starter-kit-universal\\node_modules\\express-session\\index.js:489:7)\n    at runCallback (timers.js:785:20)\n    at tryOnImmediate (timers.js:743:5)\n    at processImmediate [as _immediateCallback] (timers.js:714:5)',
            name: 'Error',
            message: 'Fake Error log 0',
          },
          msg: 'Fake Error log 0',
          time: '2017-08-11T12:41:59.788Z',
          __v: 0,
        },
        {
          _id: '598da61706c2d924403f8486',
          name: 'Application name',
          level: 50,
          req: {
            remotePort: 49929,
            remoteAddress: '::1',
            headers: {
              cookie: 'connect.sid=s%3AOCfJp0J1rr7egEUe_vaXdUbSRZFi8GmV.pK3RYowlJe1Twq4xX9PhchQdgIEZpg3s6A9zn5UOhTM',
              'accept-language': 'en-US,en;q=0.8,sv;q=0.6,fa;q=0.4',
              'accept-encoding': 'gzip, deflate, br',
              accept: '*/*',
              'content-type': 'application/x-www-form-urlencoded',
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
              origin: 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop',
              'cache-control': 'no-cache',
              'postman-token': '5caeef7a-5ff4-cc5e-9d76-bce68245af28',
              'content-length': '9',
              connection: 'keep-alive',
              host: 'localhost:3030',
            },
            url: '/createfakelogs',
            method: 'POST',
          },
          res: {
            header: null,
            statusCode: 200,
          },
          err: {
            stack: 'Error: Fake Error log 0\n    at c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:97:26\n    at Generator.next (<anonymous>)\n    at step (c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:687)\n    at c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:917\n    at Promise (<anonymous>)\n    at c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:598\n    at createFakeLogs (c:\\projects\\starter-kit-universal\\debug\\api\\controllers\\logs.js:105:61)\n    at Layer.handle [as handle_request] (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\route.js:137:13)\n    at Route.dispatch (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\route.js:112:3)\n    at Layer.handle [as handle_request] (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\index.js:281:22\n    at Function.process_params (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (c:\\projects\\starter-kit-universal\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at c:\\projects\\starter-kit-universal\\node_modules\\async\\dist\\async.js:421:16\n    at iteratorCallback (c:\\projects\\starter-kit-universal\\node_modules\\async\\dist\\async.js:998:13)\n    at c:\\projects\\starter-kit-universal\\node_modules\\async\\dist\\async.js:906:16\n    at Immediate.<anonymous> (c:\\projects\\starter-kit-universal\\node_modules\\express-session\\index.js:489:7)\n    at runCallback (timers.js:785:20)\n    at tryOnImmediate (timers.js:743:5)\n    at processImmediate [as _immediateCallback] (timers.js:714:5)',
            name: 'Error',
            message: 'Fake Error log 0',
          },
          msg: 'Fake Error log 0',
          time: '2017-08-11T12:41:59.788Z',
          __v: 0,
        },
      ],
    };
  }
  render() {
    const { list } = this.state;

    return (
      <Container className="mt25">
        <Helmet title="Log" />
        Log
        <Table
          width={300}
          height={300}
          headerHeight={20}
          rowHeight={30}
          rowCount={list.length}
          rowGetter={({ index }) => list[index]}
        >
          <Column label="Id" dataKey="_id" width={100} />
          <Column label="Time" dataKey="time" width={100} />
          <Column label="Message" dataKey="message" width={100} />
          <Column label="Name" dataKey="name" width={100} />
          <Column label="Level" dataKey="level" width={100} />
          <Column label="Error" dataKey="error" width={100} />
        </Table>
      </Container>
    );
  }
}

export default Logger;
