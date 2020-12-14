const express = require('express');

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const {
    createOrUpdateUser,
    currentUser,
    createOrUpdateUserGoogle,
} = require('../controllers/auth');

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post(
    '/create-or-update-userGoogle',
    authCheck,
    createOrUpdateUserGoogle
);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;
