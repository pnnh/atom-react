import express, {Request, Response, NextFunction} from "express";
import http from "http";
import stripAnsi from "strip-ansi";

const workerPort = 5163

function handleErrors(
    handlerFunc: (request: Request, response: Response) => Promise<Response<any, Record<string, any>> | undefined | void>) {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handlerFunc(req, res);
        } catch (e) {
            next(e);
        }
    }
}

async function helloHandler(request: Request, response: Response) {
    return response.json({
        message: "Hello World",
    })
}

function runMain() {
    const server = express();

    server.use(express.json());

    server.get("/", handleErrors(helloHandler));

    server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        const message = stripAnsi(err.stack || err.message || 'Unknown error')
        res.status(500).send({
            code: 500,
            message: message
        })
    })

    const httpServer = http.createServer(server);

    httpServer.listen(workerPort, async () => {
        console.log(
            `Worker server is running on http://localhost:${workerPort}`,
        );
    });
}

runMain();
