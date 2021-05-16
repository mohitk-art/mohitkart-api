const BlogModel = require('../models/blog.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class BlogController {
    getAllBlogs = async (req, res, next) => {
        let blogList = await BlogModel.find();
        if (!blogList.length) {
            throw new HttpException(404, 'Blogs not found');
        }

        blogList = blogList.map(blog => {
            const { password, ...blogWithoutPassword } = blog;
            return blogWithoutPassword;
        });

        res.send(blogList);
    };

    getBlogById = async (req, res, next) => {
        const blog = await BlogModel.findOne({ id: req.params.id });
        if (!blog) {
            throw new HttpException(404, 'Blog not found');
        }

        const { password, ...blogWithoutPassword } = blog;

        res.send(blogWithoutPassword);
    };

    createBlog = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await BlogModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Blog was created!');
    };

    updateBlog = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await BlogModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Blog not found' :
            affectedRows && changedRows ? 'Blog updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteBlog = async (req, res, next) => {
        const result = await BlogModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Blog not found');
        }
        res.send('Blog has been deleted');
    };

   

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;