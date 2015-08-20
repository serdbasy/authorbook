/**
 * Created by serdarbasyigit on 19/08/15.
 */
var Author = require('./author.js');
module.exports = function(sequelize, DataTypes) {
	console.log(sequelize);
	return sequelize.define('book', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED, //DataTypes.INTEGER(11)
			allowNull: false,
			autoIncrement : true,
			primaryKey : true
		},
		author: {
			type: DataTypes.INTEGER(11).UNSIGNED, //DataTypes.INTEGER(11)
			allowNull: false,
			references: {
				model: Author,
				key: 'id'
			}
		},
		name: {
			type: 'CHAR(255)',
			allowNull: false
		}
	},
	{
		createdAt: false,
		updatedAt: false,
	//	underscored: true,
	//	paranoid: true
	});
};