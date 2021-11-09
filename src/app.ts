import http2 from 'http2'
import fs from 'fs'
import express, { Request as Req, Response as Res, NextFunction as Next} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { config } from './config'

const server = http2.createSecureServer({
  "key": fs.readFileSync('/etc/letsencrypt/live/mztestinghost.hopto.org/privkey.pem'),
  "cert": fs.readFileSync('/etc/letsencrypt/live/mztestinghost.hopto.org/fullchain.pem')
}) 

server.on('stream', (stream, headers) => {
  stream.respond({
    "content-type": "application/json",
    "status": 200
  })

  stream.end(JSON.stringify({
    "user": "Mati",
    "id": 22
  }))
})

const app = express()
app.use(express.json())
app.use(cors({origin: '*'}))
app.use(morgan('dev'))

app.get('/', (req:Req, res:Res, next:Next) => {
  res.status(200).json({message: 'Root route'})
})

app.listen(config.server.PORT, () => {
  console.log(`App listening on port ${config.server.PORT}`)
})

// ssl_certificate /etc/letsencrypt/live/mztestinghost.hopto.org/fullchain.pem;
// ssl_certificate_key /etc/letsencrypt/live/mztestinghost.hopto.org/privkey.pem;
// include /etc/letsencrypt/options-ssl-nginx.conf;
// ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;