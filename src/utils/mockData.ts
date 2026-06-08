import { User, Product, Order, Task } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u-1',
    name: 'Sarah Connor',
    email: 'sarah.connor@monolith.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    title: 'System Administrator',
    department: 'IT Infrastructure',
    status: 'active',
  },
  {
    id: 'u-2',
    name: 'Marcus Wright',
    email: 'marcus.w@monolith.com',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    title: 'Senior Merchant Executive',
    department: 'E-commerce Support',
    status: 'active',
  },
  {
    id: 'u-3',
    name: 'John Connor',
    email: 'john.c@monolith.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    title: 'Operations Analyst',
    department: 'Facilities Management',
    status: 'active',
  },
  {
    id: 'u-4',
    name: 'Elena Rostova',
    email: 'elena.r@monolith.com',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    title: 'Regional Seller Lead',
    department: 'E-commerce Support',
    status: 'active',
  },
  {
    id: 'u-5',
    name: 'David Vance',
    email: 'david.vance@monolith.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop',
    title: 'Support Coordinator',
    department: 'Customer Success',
    status: 'inactive',
  }
];

export const mockProducts: Product[] = [
  { id: 'p-1', name: 'Titanium Mechanical Keyboard', sku: 'KB-TITAN-85', price: 189.99, stock: 42, category: 'Hardware', status: 'In Stock' },
  { id: 'p-2', name: 'Ergonomic Mesh Office Chair', sku: 'CR-MESH-09', price: 349.50, stock: 8, category: 'Furniture', status: 'Low Stock' },
  { id: 'p-3', name: 'USB-C Dual 4K Docking Station', sku: 'DK-DUAL-4K', price: 129.00, stock: 115, category: 'Accessories', status: 'In Stock' },
  { id: 'p-4', name: 'Pro Noise-Cancelling Headphones', sku: 'HP-PRO-ANC', price: 249.99, stock: 0, category: 'Audio', status: 'Out of Stock' },
  { id: 'p-5', name: 'Ultra-Wide 34" Curved Monitor', sku: 'MN-34-CRV', price: 499.99, stock: 15, category: 'Hardware', status: 'In Stock' },
  { id: 'p-6', name: 'Smart Ambient Desk Light Bar', sku: 'LT-AMB-RGB', price: 59.99, stock: 3, category: 'Accessories', status: 'Low Stock' },
];

export const mockOrders: Order[] = [
  { id: 'ORD-9024', customerName: 'Emma Watson', date: '2026-06-08', total: 628.98, status: 'Shipped', itemsCount: 3 },
  { id: 'ORD-9023', customerName: 'Liam Neeson', date: '2026-06-08', total: 129.00, status: 'Pending', itemsCount: 1 },
  { id: 'ORD-9022', customerName: 'Bruce Wayne', date: '2026-06-07', total: 1198.40, status: 'Delivered', itemsCount: 4 },
  { id: 'ORD-9021', customerName: 'Selina Kyle', date: '2026-06-06', total: 249.99, status: 'Cancelled', itemsCount: 1 },
  { id: 'ORD-9020', customerName: 'Clark Kent', date: '2026-06-05', total: 349.50, status: 'Delivered', itemsCount: 1 },
  { id: 'ORD-9019', customerName: 'Diana Prince', date: '2026-06-04', total: 818.97, status: 'Delivered', itemsCount: 3 },
];

export const mockTasks: Task[] = [
  { id: 'TSK-101', title: 'Audit server backup logs', description: 'Ensure the nightly AWS S2 buckets backup succeeded without checksum discrepancies.', priority: 'High', status: 'In Progress', deadline: '2026-06-09' },
  { id: 'TSK-102', title: 'Onboard new Seller accounts', description: 'Approve or comment on regional merchant seller applications and verify tax IDs.', priority: 'Medium', status: 'To Do', deadline: '2026-06-12' },
  { id: 'TSK-103', title: 'Address shipping discrepancy ORD-9015', description: 'Coordinate with DHL Ground to locate missing container and contact customer.', priority: 'High', status: 'Completed', deadline: '2026-06-07' },
  { id: 'TSK-104', title: 'Update system privacy guidelines', description: 'Incorporate new regional compliance requirements into the monolithic privacy policy documentation.', priority: 'Low', status: 'To Do', deadline: '2026-06-20' },
  { id: 'TSK-105', title: 'Optimize static asset CDNs', description: 'Compress SVG resources and set up caching header guidelines on Nginx reverse proxies.', priority: 'Medium', status: 'Completed', deadline: '2026-06-08' },
];
