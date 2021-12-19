const router = require('express').Router()
const UserRouter = require('./user.router')
const menuitemRouter = require('./menuitem.router')
const PreviewRouter = require('./preview.router')
const RestaurantRouter = require('./restaurant.router')
const OrderRouter = require('./order.router')
const jsonwebtoken = require('jsonwebtoken')
const config = require('../config')


router.use((req, res, next) => {
	const url = req.originalUrl
	if (url === '/api/login' || url === '/api/register' || url === '/api/register/restaurant') {
		return next()
	}
	const authorization = req.headers.authorization
	const isValid = /^Bearer\s+[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/i.test(authorization)
	if (!isValid) {
		return next({message: 'Invalid authorization header', status: 401})
	}
	const token = authorization.split(' ').pop()
	const user = jsonwebtoken.decode(token, config.jwt.secret)

	req.user = user

	next()
})

router.use(UserRouter)
router.use(menuitemRouter)
router.use(PreviewRouter)
router.use(RestaurantRouter)
router.use(OrderRouter)

router.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(401).json('Invalid Token')
	}
	return res.status(err.code || 400).json({ code: err.code, message: err.message })
})

module.exports = router
