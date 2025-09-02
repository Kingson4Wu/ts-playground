/**
 * Database utilities
 *
 * Implements database connection and models with Sequelize
 */

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false, // Set to console.log to see SQL queries
});

// Define User model attributes
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare name: string;
  declare email: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  }
);

// Define Todo model attributes
interface TodoAttributes {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoCreationAttributes
  extends Optional<
    TodoAttributes,
    'id' | 'description' | 'completed' | 'createdAt' | 'updatedAt'
  > {}

class TodoModel
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  declare id: number;
  declare title: string;
  declare description?: string;
  declare completed: boolean;
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

TodoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'todos',
    modelName: 'Todo',
  }
);

// Define relationships
UserModel.hasMany(TodoModel, {
  foreignKey: 'userId',
  as: 'todos',
});

TodoModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'user',
});

// Export models and sequelize instance
export { sequelize, UserModel, TodoModel };
