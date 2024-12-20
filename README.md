# 🚀 B2B Marketplace Backend

Welcome to the **B2B Marketplace Backend**! This API powers a marketplace platform where users can interact with sellers, manage products, and handle orders. The API is built with **Next.js**, **Node.js**, **SQLite**, and **JWT Authentication** for secure access.

---

## 📌 Features

- 🛍️ **Seller Management**: Create, update, and retrieve seller details.
- 📦 **Product Management**: Manage product listings, statuses, and details.
- 🔒 **Authentication**: Secure authentication with **JWT** tokens for customers and sellers.
- 🌐 **Dynamic Routes**: Product pages and seller profiles are automatically generated.
- ⚡ **Fast & Lightweight**: Designed for quick and efficient API interactions.

---

## ⚙️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- 🌍 [Node.js](https://nodejs.org/en/download/)
- 🧰 [npm](https://www.npmjs.com/get-npm)
- 📦 [SQLite](https://www.sqlite.org/download.html) (or use the in-memory SQLite database for testing)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kuldeep-shr/b2b_market_place.git


   cd b2b-marketplace-backend
   ```

2. Install dependencies:

```bash
      npm install
```

3. Before you proceed further, you have to run seed command for creating the database, hit the URL

```bash
      {BASE_URL}/api/users/seed
```

4. Set up your .env file with required environment variables (example)

```
      JWT_SECRET: <your-jwt-secret-key>
      DATABASE_URL: <your preferred name for the database>
      DATABASE_URL: <your preferred name for the database>
      env: <production> or <local>
```

5. Run the dev mode:

```bash
      npm run dev
```

5. For build

```bash
      npm run build
```

5. Run the application

```bash
      npm start
```

**NOTE:** If you want to change the port number then change in package.json file like this `"dev": "next dev -p 8000",`

<br />

## 📚 API Endpoints

### Seller Endpoints:

- Login: /api/users/login - Login to get a JWT token.
- Register: /api/users/register - Register a new seller.
- Get Seller by ID: /api/sellers/[id] - Get details of a single seller by ID.
- Get All Sellers: /api/sellers - Retrieve a list of all sellers.
- Update Seller: /api/sellers/[id] - Update seller details (e.g., name, email).

### Product Endpoints:

- Get Product by ID: /api/products/[id] - Retrieve details of a single product by ID.
- Get Product by Sellers ID: /api/products?sellerId=[id] - Retrieve details of all products by seller.
- Create Product: /api/products - Add a new product.
- Update Product: /api/products/[id] - Update product details.
- Delete Product: /api/products/[id] - Delete a product.

## For API Documentation

Click below button 👇👇

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/30468072-48bdcfb8-56f1-45f5-ad38-06c774729370?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D30468072-48bdcfb8-56f1-45f5-ad38-06c774729370%26entityType%3Dcollection%26workspaceId%3Df5a24441-4ecd-4d98-b21a-8a2d8ce1f3b9)
