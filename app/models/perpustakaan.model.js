module.exports = (sequelize, Sequelize) => {
    const Perpustakaan = sequelize.define("perpustakaan", {
        judul: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Perpustakaan;
};