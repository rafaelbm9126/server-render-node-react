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

const apli = new App({});

app.get('/user/:user', (req, res) => {
    apli.fetchDataUser(req.params.user, (data) => {
        triggerView(res, data);
    });
});

app.get('/user/:user/post/:post', (req, res) => {
    apli.fetchDataUser(req.params.user, (data) => {
        triggerView(res, data);
    }, req.params.post);
});

app.get('*', (req, res) => {
    // console.log( req.originalUrl );
    apli.fetchDataUsers()
        .then(({ data }) => {
            triggerView(res, { ListUser: data });
        })
});

function triggerView(res: any, data: any) {
    const sheet = new ServerStyleSheet();
    const markup = renderToString(
        sheet.collectStyles(<App objeto={data} />)
    );
    const styles = sheet.getStyleTags();
    res.send( Static(markup, styles, data) );
}

app.listen(port, () => {
    console.log('runnig for :' + port);
});
