const express = require('express');
const userM = require('../modules/usersM');
const { deepCopy } = require('../modules/deepCopy');
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
  userM.postUsers(body)
  .then(result=>res.status(201).json(result[0]))
  .catch(error=>{
    console.log(error);
    const json = deepCopy({error:error});
    console.log(json);
    res.status(403).json(json);
  });
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
