import * as Express from 'express';
import * as cors from 'cors';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import axios from  'axios';

import { App } from '../client/components/App';
import { Static } from '../browser';

const app: any = Express();
const port = process.env.PORT || 3000;

app.use(cors());

app.set('port', port);

app.use(Express.static("dist"));

app.get('*', (req, res) => {
    const sheet = new ServerStyleSheet();

    new App({}).fetchData()
        .then(({ data }) => {

            const markup = renderToString(
                sheet.collectStyles(<App objeto={data} />)
            );

            const styles = sheet.getStyleTags();

            res.send( Static(markup, styles, data) );

        })
        .catch((error) => {
            console.log('Error: axios ~> server/index.tsx', error);
        });
});

app.listen(port, () => {
    console.log('runnig for :' + port);
});
