const router = require('express').Router()
const OrderRouter = require('../controllers/order.controller')

router.get('/orders', OrderRouter.getByUser)
router.post('/orders', OrderRouter.addOne)
router.put('/orders/:id/cancel', OrderRouter.cancel)

module.exports = router