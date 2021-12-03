const express = require("express");
const {
  add,
  get,
  getAll,
  update,
  remove,
} = require("../controllers/categController");
const { isAuthenticated, allowedRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/get/:id").get(get);
router.route("/getAll").get(getAll);
router.route("/add").post(isAuthenticated, allowedRoles("admin"), add);
router.route("/update/:id").put(isAuthenticated, allowedRoles("admin"), update);
router
  .route("/remove/:id")
  .delete(isAuthenticated, allowedRoles("admin"), remove);

module.exports = router;
