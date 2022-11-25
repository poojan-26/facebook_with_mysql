const express = require('express');
const router = express.Router();
// const checkauth = require('../api/utils/checkauth'); 
const upload = require('../api/utils/uploads')
const headerValidator = require('../api/utils/headersValidator')

const userController = require('../api/v1/controllers/userController')
const postController = require('../api/v1/controllers/postController')
const friendController = require('../api/v1/controllers/friendController')


/******************************** all user API ******************************* */
//get all user API
router.get('/getuser', headerValidator.authValidation, userController.getuser);
//get all user with pagiation
router.get('/getuserPage', headerValidator.authValidation, userController.getUserPage)
//add user data signup API
router.post('/signup',userController.signup);
//delete user API
router.delete('/deleteUser/:id', headerValidator.authValidation, userController.Deleteuser);
//update user API
router.put('/updateUser/:id', headerValidator.authValidation, userController.updateUser);
//signin API
router.post('/signin', headerValidator.nonAuthValidation, userController.signin);
//change password API
router.post('/changePassword', headerValidator.nonAuthValidation, headerValidator.isUser, userController.changePassword);


/******************************* all post API ************************** */
//get all post API
router.get('/getpost', headerValidator.authValidation, postController.getpost)
//get all post with pagination
router.get('/getPostPage', headerValidator.authValidation, postController.getPostPage)
//create post with image API
router.post('/createPost', headerValidator.authValidation, upload.single('image'), postController.createPost)
//delete post API
router.delete('/deletePost/:id', headerValidator.authValidation, postController.Deletepost)
//update created post API
router.put('/updatePost/:id', headerValidator.authValidation, upload.single('image'), postController.UpdatePost)


/********************************** all friend API ********************** */
//get all friend request API
router.get('/getfriendrequest', headerValidator.authValidation, friendController.getFriendRequest )
//get all friend request with pagination
router.get('/getFriendPage', headerValidator.authValidation, friendController.getFriendPage)
//create friend request API
router.post('/createfriend', headerValidator.authValidation, friendController.createFriendRequest)
//update friend requrest API
router.put('/updatefriend/:id', headerValidator.authValidation, friendController.updateFriendrequest)
//delete friend requiest API
router.delete('/deletefriend/:id', headerValidator.authValidation, friendController.DeleteFriend)

module.exports = router;