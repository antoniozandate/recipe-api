const Order = require('../models/order.model')

class OrderController {
  async getByUser(req, res, next) {
    try {
      const orders = await Order.find({ user: req.user.id })
        .populate('items')
        .lean()
        .exec()
      res.json(orders)
    } catch (err) {
      next(err)
    }
  }

  async addOne(req, res, next) {
    try {
      const order = await Order.create({
        user: req.user.id,
        items: req.body.items,
        total: req.body.total,
        status: 'pending'
      })
      res.json(order)
    } catch (err) {
      next(err)
    }
  }

  async cancel(req, res, next) {
    try {
      const order = await Order.findOne({_id: req.params.id, user: req.user.id})

      if (!order) {
        return res.status(404).json({ message: 'Order not found' })
      }

      order.status = 'cancelled'
      await order.save()

      res.json(order)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new OrderController()
