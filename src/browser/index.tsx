import * as serialize from 'serialize-javascript';

export function Static (markup: any, styles: any, data: any): string {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Servidor - Render</title>
                <script src="/bundle.js" defer></script>
                ${styles}
                <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
            </head>

            <body>
                <div id="app">${markup}</div>
            </body>
        </html>
    `;
}