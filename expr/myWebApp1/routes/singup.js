const express = require('express');
const userM = require('../modules/usersM');
const router = express.Router();
router.get('/signup', async(req, res, next)=>{
    const userId = req.params.userId;
    const inputData = {id:userId};
    const {rows,f} = await userM.getUsers(inputData);
    res.status(200).json(rows);
  });
  
  router.post('/', async(req, res, next)=>{
    const body = req.body;
    const {rows,f} = await userM.postUsers(body);
    res.status(201).json(rows);
  });
  // sign up 