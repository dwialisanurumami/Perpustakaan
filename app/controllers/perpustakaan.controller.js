const db = require("../models");
const Perpustakaan = db.perpustakaans;
const Op = db.Sequelize.Op;

// Create and Save a new Perpustakaan
exports.create = (req, res) => {
    // Validate request
    if (!req.body.judul) {
        res.status(400).send({
            message: "Cannot can not be empty!"
        });
        return;
    }

    // Create a Perpustakaan
    const perpustakaan = {
        judul: req.body.judul,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Perpustakaan in the database
    Perpustakaan.create(perpustakaan)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occurred while creating the Perpustakaan."
        });
    });
};

// Retrieve all Perpustakaan from the database.
exports.findAll = (req, res) => {
    const judul =  req.query.judul;
    const condition = judul ? { judul: {[Op.like]: `%${judul}%` } } : null;

    Perpustakaan.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving perpustakaans."
        });
    });
};

// Find a single Perpustakaan with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Perpustakaan.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Perpustakaan with id=" + id
        });
    });
};

// Update a Perpustakaan by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Perpustakaan.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if(num == 1) {
        res.send({
          message: "Perpustakaan was update successfully."
        });
      } else {
        res.send({
          message: `Cannot update Perpustakaan with id=${id}. Maybe Perpustakaan was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Perpustakaan with id=" + id
      });
    });
};

// delete a Perpustakaan with the specified id in the request
    exports.delete = (req, res) => {
        const id = req.params.id;
      
        Perpustakaan.destroy({
          where: { id: id }
        })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Perpustakaan was deleted succesfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Perpustakaan with id=${id}. Maybe Perpustakaan was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Perpustakaan with id=" + id
          });
        });
      };

// Delete All Perpustakaan with the specified id in the request
    exports.deleteAll = (req, res) => {
        Perpustakaan.destroy({
          where: {},
          truncate: false
        })
        .then(nums => {
         res.send({ message: `${nums} Perpustakaan were deleted successfully` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all perpsutakaans."
          });
        });
      };
      
// Find all published Perpustakaan
exports.findAllPublished = (req, res) => {
        Perpustakaan.findAll({ where: { published: true} })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            mesage:
            err.message || "Some error occurred while retrieving perpustakaans."
          });
        });
      };