const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createBlogSchema, updateBlogSchema } = require('../middleware/validators/blogValidator.middleware');


router.get('/', auth(), awaitHandlerFactory(blogController.getAllBlogs)); // localhost:3000/api/v1/users
router.get('/id/:id', auth(), awaitHandlerFactory(blogController.getBlogById)); // localhost:3000/api/v1/users/id/1
router.post('/', createBlogSchema, awaitHandlerFactory(blogController.createBlog)); // localhost:3000/api/v1/users
router.patch('/id/:id', auth(Role.Admin), updateBlogSchema, awaitHandlerFactory(blogController.updateBlog)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(blogController.deleteBlog)); // localhost:3000/api/v1/users/id/1

module.exports = router;