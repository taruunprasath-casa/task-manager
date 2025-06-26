import { User } from "../models/User";

class UserService {
  async createUser(data: any) {
    return await User.create(data);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id: string): Promise<any> {
    return await User.findByPk(id);
  }

  async updateUser(id: string, data: any) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User Not Found");
    return await user.update(data);
  }

  async deleteUser(id: string) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User Not Found");
    await user.destroy();
    return true;
  }
}

export default new UserService();
