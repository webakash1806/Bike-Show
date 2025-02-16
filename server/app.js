import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from 'express'
import cors from 'cors'
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js"
import bikeRoutes from "./routes/bike.routes.js"
import scootyRoutes from "./routes/scooty.routes.js"
import accessoriesRoutes from "./routes/accessories.routes.js"
import helmetRoutes from "./routes/helmet.routes.js"
import miscellaneousRoutes from "./routes/miscellaneous.routes.js"
import formRoutes from "./routes/form.routes.js"
import http from "http"
import { Server } from "socket.io";
import { fetchLiveData } from "./controllers/socketController.js";
config()

const app = express()



app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true
}))

app.use(morgan('dev'))

app.use('/ping', function (req, res) {
    res.send('/pong')
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/bikes', bikeRoutes)
app.use('/api/v1/scooty', scootyRoutes)
app.use('/api/v1/accessories', accessoriesRoutes)
app.use('/api/v1/helmet', helmetRoutes)
app.use('/api/v1/form', formRoutes)
app.use('/api/v1', miscellaneousRoutes)

app.all('*', (req, res) => {
    res.status(404).send('OOPS! 404 Page not found')
})

app.use(errorMiddleware)

export default app