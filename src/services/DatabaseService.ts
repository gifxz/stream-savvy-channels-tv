
import { User, SubscriptionPlan, Channel, Category } from "@/types";
import { subscriptionPlans, channels, categories, mockUser } from "@/data/mockData";

// Storage keys
const STORAGE_KEYS = {
  USERS: 'pptv_db_users',
  PLANS: 'pptv_db_plans',
  CHANNELS: 'pptv_db_channels',
  CATEGORIES: 'pptv_db_categories',
};

export class DatabaseService {
  // Initialize the database with default data if it doesn't exist
  static init(): void {
    // Initialize users
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([
        {
          ...mockUser,
          role: 'user',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'admin-1',
          email: 'admin@example.com',
          name: 'Administrator',
          role: 'admin',
          createdAt: new Date().toISOString(),
        }
      ]));
    }

    // Initialize plans
    if (!localStorage.getItem(STORAGE_KEYS.PLANS)) {
      localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(subscriptionPlans));
    }

    // Initialize channels
    if (!localStorage.getItem(STORAGE_KEYS.CHANNELS)) {
      localStorage.setItem(STORAGE_KEYS.CHANNELS, JSON.stringify(channels));
    }

    // Initialize categories
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    }
  }

  // User operations
  static getUsers(): User[] {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  }

  static getUserById(id: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  static addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  static updateUser(updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex(user => user.id === updatedUser.id);
    
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  }

  static deleteUser(id: string): void {
    const users = this.getUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filteredUsers));
  }

  // Plan operations
  static getPlans(): SubscriptionPlan[] {
    const plans = localStorage.getItem(STORAGE_KEYS.PLANS);
    return plans ? JSON.parse(plans) : [];
  }

  static getPlanById(id: string): SubscriptionPlan | undefined {
    const plans = this.getPlans();
    return plans.find(plan => plan.id === id);
  }

  static updatePlan(updatedPlan: SubscriptionPlan): void {
    const plans = this.getPlans();
    const index = plans.findIndex(plan => plan.id === updatedPlan.id);
    
    if (index !== -1) {
      plans[index] = updatedPlan;
      localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
    }
  }

  static addPlan(plan: SubscriptionPlan): void {
    const plans = this.getPlans();
    plans.push(plan);
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
  }

  static deletePlan(id: string): void {
    const plans = this.getPlans();
    const filteredPlans = plans.filter(plan => plan.id !== id);
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(filteredPlans));
  }

  // Channel operations
  static getChannels(): Channel[] {
    const channels = localStorage.getItem(STORAGE_KEYS.CHANNELS);
    return channels ? JSON.parse(channels) : [];
  }

  static updateChannel(updatedChannel: Channel): void {
    const channels = this.getChannels();
    const index = channels.findIndex(channel => channel.id === updatedChannel.id);
    
    if (index !== -1) {
      channels[index] = updatedChannel;
      localStorage.setItem(STORAGE_KEYS.CHANNELS, JSON.stringify(channels));
    }
  }

  // Category operations
  static getCategories(): Category[] {
    const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return categories ? JSON.parse(categories) : [];
  }

  static updateCategory(updatedCategory: Category): void {
    const categories = this.getCategories();
    const index = categories.findIndex(category => category.id === updatedCategory.id);
    
    if (index !== -1) {
      categories[index] = updatedCategory;
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    }
  }
}
