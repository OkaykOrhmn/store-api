import express from 'express'
import users from './routes/user'

export const app = express()
app.use(express.json())
app.use("/auth", users)


app.listen(8080, () => {
    console.log(`Server is Running on port 8080`)
})