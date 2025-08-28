/**
 * Business logic for Service B
 *
 * Implements business logic for customer and product operations
 */

import { Customer, Product } from '../models/data.js';

/**
 * In-memory storage for customers and products
 */
let customers: Customer[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St, City, State',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    address: '456 Oak Ave, Town, State',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let products: Product[] = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    inventory: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Mouse',
    description: 'Wireless optical mouse',
    price: 29.99,
    inventory: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let nextCustomerId = 3;
let nextProductId = 3;

/**
 * Retrieves a customer by ID
 *
 * @param id - Customer ID to retrieve
 * @returns Customer if found, undefined otherwise
 */
export function getCustomerById(id: number): Customer | undefined {
  return customers.find(customer => customer.id === id);
}

/**
 * Validates if a customer exists
 *
 * @param id - Customer ID to validate
 * @returns True if customer exists, false otherwise
 */
export function validateCustomer(id: number): boolean {
  return customers.some(customer => customer.id === id);
}

/**
 * Retrieves a product by ID
 *
 * @param id - Product ID to retrieve
 * @returns Product if found, undefined otherwise
 */
export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

/**
 * Checks if a product is available in the specified quantity
 *
 * @param id - Product ID to check
 * @param quantity - Quantity to check
 * @returns True if product is available, false otherwise
 */
export function checkProductAvailability(
  id: number,
  quantity: number
): boolean {
  const product = getProductById(id);
  if (!product) {
    return false;
  }
  return product.inventory >= quantity;
}

/**
 * Updates product inventory after an order is processed
 *
 * @param id - Product ID to update
 * @param quantity - Quantity to deduct from inventory
 * @returns True if inventory was updated, false if product not found or insufficient inventory
 */
export function updateProductInventory(id: number, quantity: number): boolean {
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex === -1) {
    return false;
  }

  if (products[productIndex].inventory < quantity) {
    return false;
  }

  products[productIndex].inventory -= quantity;
  products[productIndex].updatedAt = new Date();
  return true;
}

/**
 * Creates a new customer
 *
 * @param customer - Customer data to create
 * @returns Created customer
 */
export function createCustomer(
  customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>
): Customer {
  const newCustomer: Customer = {
    id: nextCustomerId++,
    ...customer,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  customers.push(newCustomer);
  return newCustomer;
}

/**
 * Creates a new product
 *
 * @param product - Product data to create
 * @returns Created product
 */
export function createProduct(
  product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Product {
  const newProduct: Product = {
    id: nextProductId++,
    ...product,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  products.push(newProduct);
  return newProduct;
}

/**
 * Gets all customers
 *
 * @returns Array of all customers
 */
export function getAllCustomers(): Customer[] {
  return [...customers];
}

/**
 * Gets all products
 *
 * @returns Array of all products
 */
export function getAllProducts(): Product[] {
  return [...products];
}
