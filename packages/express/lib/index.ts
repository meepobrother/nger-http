import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import serveFavicon from 'serve-favicon';
import compression from 'compression';
import { join } from 'path';
import { Module, OnModuleInit, Config, Injector, HttpResponse, HttpRequest, HttpHeaders, HttpParams, HttpErrorResponse } from '@nger/core';
import { HttpClient } from '@nger/http';
export class EnvConfig extends Config {
    get<T>(key: string, def: T): T {
        return Reflect.get(process.env, key) || def;
    }
}
@Module({
    imports: [],
    providers: [
        {
            provide: Config,
            useClass: EnvConfig
        }
    ]
})
export class HttpExpressModule implements OnModuleInit {
    constructor(public injector: Injector) { }
    ngOnModuleInit() {
        const config = this.injector.get(Config)
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(cors());
        app.use(cookieParser(config.get('COOKIE_SECRET', `cookie secret`)));
        app.use(cookieSession({
            name: 'session',
            keys: [`key1`, `key2`],
            secret: config.get(`SESSION_SECRET`, 'session secret'),
            maxAge: 2 * 3600 * 1000
        }));
        app.use(compression())
        app.use(serveFavicon(join(__dirname, 'favicon.ico')));
        app.use((req: Request, res: Response, next: NextFunction) => {
            const client = this.injector.get(HttpClient, null)
            const request = new HttpRequest<any>(req.method, req.originalUrl, {
                headers: new HttpHeaders(req.headers as any),
                param: new HttpParams(req.query)
            })
            client.request(request).subscribe(item => {
                if (item instanceof HttpResponse) {
                    item.headers.forEach((name: string, value: string[]) => {
                        res.setHeader(name, value)
                    })
                    res.statusCode = item.status;
                    res.statusMessage = item.statusText;
                    if (
                        typeof item.body === 'string' ||
                        typeof item.body === 'number' ||
                        typeof item.body === 'boolean' ||
                        typeof item.body === 'symbol'
                    ) {
                        res.send(`${item.body as string}`)
                    }
                    else {
                        res.send(JSON.stringify(item.body))
                    }
                }
            }, e => {
                if (e instanceof HttpErrorResponse) {
                    e.headers.forEach((name: string, value: string[]) => {
                        res.setHeader(name, value)
                    })
                    res.statusCode = e.status;
                    res.statusMessage = e.statusText;
                    res.send(e.error)
                }
            }, () => res.end())
        });
        const port = config.get('PORT', 9008)
        app.listen(port, '0.0.0.0', () => {
            console.log(`app start at : http://0.0.0.0:${port}`)
        })
    }
}