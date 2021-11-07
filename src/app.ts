import http2 from 'http2'
import fs from 'fs'
import express, { Request as Req, Response as Res, NextFunction as Next} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { config } from './config'


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