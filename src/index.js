import 'dotenv/config'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'
import bodyParser from 'body-parser'
import swaggerUI from 'swagger-ui-express'
import { Server } from 'socket.io'
import { router } from './routes'
import { notFound } from './utils/http'
import { swaggerDocs } from './swagger'
import { connectDatabase } from './database'
import { checkJWT, onConnection, options } from './socket-io'
import { generateTestUsers, generateGenders, generateLanguages, generateReports, generateAdmin } from './utils/datatest'

const app = express()
const server = http.Server(app)
const PORT = process.env.PORT || 3000

const io = new Server(server, options)
io.use(checkJWT).on('connection', onConnection)

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.redirect('/docs'))
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs()))
app.use('/api', router)
app.use((req, res) => notFound(res))

connectDatabase()
  .then(() => {
    const url = `http://localhost:${PORT}`;
    server.listen(PORT, () => console.log(`Server is running: ${url}`));
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });


// Data testing
setTimeout(async () => {
  await generateAdmin();

  await generateTestUsers({
    totalSuscriptor: 70,
    totalCreator: 30
  });

  await generateGenders()
  await generateLanguages()

  await generateReports()
}, 5000);