const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateFields,
    validateJWT,
    hasRole
} = require('../middlewares');

const { isValidRole, isValidEmail, existUserById } = require('../helpers/db-validators');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controller/user.controller');

const router = Router();

router.get( '/', [ validateJWT ], userGet );

router.put( '/:id', [
    check('id', 'Is NOT a valid ID').isMongoId(),
    check('id').custom( existUserById ),
    check('role').custom( isValidRole ),
    validateFields
], userPut );

router.post( '/', [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'Password must contain more than 6 caracteres').isLength({ min: 6 }),
    check('email').custom( isValidEmail ),
    validateFields
], userPost );

router.delete( '/:id', [
    validateJWT,
    check('id', 'Is NOT a valid ID').isMongoId(),
    check('id').custom( existUserById ),
    validateFields
], userDelete );

router.patch( '/', userPatch );


module.exports = router;