# VPLAK Order Management

A full-stack Order Management system inspired by the VPLAK admin panel.

## Features

* Search orders by Order ID, Name, Mobile, or Email
* View order and customer details
* View multiple order items per order
* Item-level order status
* Order total calculation
* Order tracking
* Invoice generation
* Admin role-based access
* Input validation and centralized error handling

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Frontend

* React
* React Router
* Axios
* CSS / Tailwind CSS

## Order Total

```text
Total = Σ(price × quantity − discount + deliveryCharges)
```

## Project Structure

```text
vplak-order-management/

│
├── backend/
├── frontend/
│   └── public/
│       └── order_images/
└── README.md
```

## Screenshots

Screenshots of the Order Management system are included in the frontend's public assets:

```text
frontend/public/order_images/
```

The `order_images` folder contains screenshots demonstrating the order listing, order details, customer information, order items, and other parts of the Order Management interface.

## Run Locally

### Backend

```bash
cd backend

npm install

npm run dev
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

## Environment Variables

Create a `.env` file inside the `backend` directory with your MongoDB and JWT configuration.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```