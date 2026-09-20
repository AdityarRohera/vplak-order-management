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
└── README.md
```

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

Create a `.env` file in the backend with MongoDB and JWT configuration.
