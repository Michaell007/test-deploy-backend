import cors from 'cors'
import path from 'path'
import i18n from '../i18n'
import morgan from 'morgan'
import express from 'express'
import compression from 'compression'
import { compile, headersSent } from '../../middleware/morgan'
import { initLanguage } from "../../middleware"
import { errorHandler as bodyErrorHandler } from 'bodymen'

export default (root, routes) => {
    const app = express()

    app.set('views', path.resolve('./src/views'))
    app.set('view engine', 'ejs')
    app.use(cors())
    app.use(compression())
    app.use(morgan(function developmentFormatLine (tokens, req, res) {
        /* Ce middleware permet d'afficher les routes consultees dans la console */

        // get the status code if response written
        var status = headersSent(res) ? res.statusCode : undefined
  
        // get status color
        var color = status >= 500 ? 31 // red
          : status >= 400 ? 33 // yellow
            : status >= 300 ? 36 // cyan
              : status >= 200 ? 32 // green
                : 0 // no color
  
        // get colored function
        var fn = developmentFormatLine[color]
  
        if (!fn) {
          // compile
          fn = developmentFormatLine[color] = compile('\x1b[0m:method :url \x1b[' +
            color + 'm:status\x1b[0m :response-time ms - :res[content-length]\x1b[0m')
        }
  
        const string = [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'), '-',
          tokens['response-time'](req, res), 'ms'
        ].join(' ')
  
        // postSystemQueryLog({ queryString: string, userid: req.user ? req.user.id : '' })
        return fn(tokens, req, res)
    }))
    // this will let us get the data from a POST
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(initLanguage(i18n))
    app.use(root, routes)
    app.use(bodyErrorHandler())

    return app
}



