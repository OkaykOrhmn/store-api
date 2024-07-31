import express from 'express'
import users from './routes/user'
import products from './routes/product'

export const app = express()
app.use(express.json())
app.use("/auth", users)
app.use("/product", products)


app.listen(8000, () => {
    console.log(`Server is Running on port 8080`)
})