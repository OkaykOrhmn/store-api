import express from 'express'
import users from './routes/user'
import products from './routes/product'
import categories from './routes/categories'

export const app = express()
app.use(express.json())
app.use("/auth", users)
app.use("/product", products)
app.use("/categories", categories)


app.listen(8000, () => {
    console.log(`Server is Running on port 8080`)
})