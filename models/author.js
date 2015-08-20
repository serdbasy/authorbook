/**
 * Created by serdarbasyigit on 19/08/15.
 */


module.exports = function(sequelize, DataTypes) {
	return sequelize.define('author', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED, //DataTypes.INTEGER(11)
			allowNull: false,
			autoIncrement : true,
			primaryKey : true
		},
		name: {
			type: 'CHAR(20)',
			allowNull: false,
		},
		surname: {
			type: 'CHAR(20)',
			allowNull: false,
		}
	},
		{
			createdAt: false,
			updatedAt: false,
		//	underscored: true
		});
};