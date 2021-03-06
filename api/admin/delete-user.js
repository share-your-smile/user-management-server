const { validationResult } = require('express-validator');
const MongodbInterface = require('../common/interface/mongodb');

const db = 'share-your-smile-user';
const userCollection = new MongodbInterface(db, 'host_users');

const deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()});
  }

  try {
    // DB接続
    await userCollection.connectDataBase();

    await userCollection.deleteDocument("_id", req.body.id);

    res.status(201);
    res.send({
      result: 'OK'
    });
  } catch (err) {
    res.status(400);
    res.send({
      error_message: err.message
    });
  }
}

module.exports = deleteUser;