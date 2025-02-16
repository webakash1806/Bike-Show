import axios from 'axios'
import { io } from 'socket.io-client'

const BASE_URL = "http://localhost:8000/api/v1"

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = BASE_URL
axiosInstance.defaults.withCredentials = true

const socket = io('http://localhost:8000')

export { axiosInstance, socket }