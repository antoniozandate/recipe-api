const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    items: [{ type: mongoose.Types.ObjectId, ref: 'Menuitems' }],
    total: { type: Number, default: 0 },
    status: { type: String, default: 'pending' }
  },
  { timestamps: true, toJSON: { virtuals: false } }
)

module.exports = mongoose.model('Orders', OrderSchema)