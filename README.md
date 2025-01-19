# BURGRRR 🍔

BURGRRR is a web application that allows users to order and customize their favorite burgers. Built using React for the frontend and Node.js with Express for the backend, BURGRRR ensures a seamless burger-ordering experience. MongoDB powers the database for storing user information, orders, and menu details.

---

## Features ✨

- **User Authentication**: Secure login and registration functionality.
- **Burger Menu**: Browse a variety of delicious burgers.
- **Burger Customization**: Add or remove ingredients to create your perfect burger.
- **Cart Management**: Add customized burgers to your cart.
- **Checkout Process**: Review your cart, place orders, and view detailed receipts.

---

## Tech Stack 🛠️

- **Frontend**: React, Vite, CSS/SCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Development Tools**: ESLint, Prettier

---

## Prerequisites 🛠️

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/) (cloud or local instance)
- [Git](https://git-scm.com/)

---

## Installation 🖥️

Follow these steps to run the BURGRRR application locally:

### Step 1: Clone the Repository

git clone https://github.com/your-username/burgrrr.git
cd burgrrr

### Step 2: Install Dependencies

Navigate to the client directory and install dependencies:
- cd client
- npm install

Navigate to the server directory and install dependencies:
- cd ../server
- npm install

### Step 3: Configure Environment Variables

Create a .env file in the server directory with the following content:
- PORT=5000
- MONGO_URL=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret


