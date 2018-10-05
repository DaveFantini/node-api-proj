const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrdersConstroller = require('../controllers/orders');


router.get('/', checkAuth, OrdersConstroller.orders_get_all);

router.post('/',checkAuth, OrdersConstroller.orders_create_order);

router.get('/:orderId', checkAuth, OrdersConstroller.orders_get_order);

router.delete('/:orderId',checkAuth, OrdersConstroller.orders_delete_order);

module.exports = router;