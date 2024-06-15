import { Product } from '../product.model';
import { Role } from '../role.model';
import { User } from '../user.model';

async function associations() {
  Role.hasMany(User, { foreignKey: 'role' });
  User.belongsTo(Role, { foreignKey: 'role' });
  Product.belongsTo(User, { foreignKey: 'created_by' });
  User.hasMany(Product, { foreignKey: 'created_by' });
}

associations();
