module.exports = app => {
  const perpustakaans = require("../controllers/perpustakaan.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", perpustakaans.create);

  // Retrieve all Tutorials
  router.get("/", perpustakaans.findAll);

  // Retrieve all published Tutorials
  router.get("/published", perpustakaans.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", perpustakaans.findOne);

  // Update a Tutorial with id
  router.put("/:id", perpustakaans.update);

  // Delete a Tutorial with id
  router.delete("/:id", perpustakaans.delete);

  // Delete all Tutorials
  router.delete("/", perpustakaans.deleteAll);

  app.use('/api/perpustakaans', router);
};
