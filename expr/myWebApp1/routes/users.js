const express = require('express');
const userM = require('../modules/usersM');
const router = express.Router();

/* GET users listing. */
router.get('/', async(req, res, next)=>{
  const [rows,f] = await userM.getUsers({});
  res.status(200).json(rows);
});
router.get('/:userId', async(req, res, next)=>{
  const userId = req.params.userId;
  const inputData = {id:userId};
  const [rows,f] = await userM.getUsers(inputData);
  res.status(200).json(rows);
});
router.post('/', async(req, res, next)=>{
  const body = req.body;
  console.log(`body:`);
  console.log(body);
  const [rows,f] = await userM.postUsers(body);
  res.status(201).json(rows);
});
router.put('/:userId', async(req, res, next)=>{
  const userId = req.params.userId;
  const body = req.body;
  const [rows,f] = await userM.putUsers({id:userId,...body});
  res.status(201).json(rows);
});
router.delete('/:userId', async(req, res, next)=>{
  const userId = req.params.userId;
  console.log(`userId:`);
  console.log(userId);
  const [rows,f] = await userM.deleteUsers({id:userId});
  res.status(200).json(rows);
});



module.exports = router;
