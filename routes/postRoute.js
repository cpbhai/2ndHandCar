const express = require("express");
const {
  add,
  get,
  getAll,
  update,
  remove,
} = require("../controllers/postController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/get/:id").get(get);
router.route("/getAll").get(getAll);
router.route("/add").post(isAuthenticated, add);
router.route("/update/:id").put(isAuthenticated, update);
router.route("/remove/:id").delete(isAuthenticated, remove);

module.exports = router;
