const UserRoutes = require('../routes/UserRoutes')
const ProductRoutes = require('../routes/ProductRoutes')

const routes = (app)=>{

// app.get('/api/user', (req, res) => {
//   res.send('Hello World')
// })
app.use('/api/user', UserRoutes)
app.use('/api/product', ProductRoutes)
}

module.exports = routes