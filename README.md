# Vendor Saathi - Your Digital Partner

Vendor Saathi is a full-stack web application designed as a complete digital support system for street food vendors and their suppliers. It aims to digitize daily operations, provide financial clarity, and build a stronger community, helping micro-entrepreneurs save time, money, and energy.

This project was built for the TuteDude Web Dev Hackathon.

## ✨ Features

### For Vendors:

* **OTP-based Login/Registration:** Secure and accessible authentication using mobile numbers.
* **Smart Dashboard:** An at-a-glance view of the business with key stats.
* **AI Demand Forecast:** Live weather-based predictions to help vendors manage stock and reduce waste.
* **Profit Calculator:** Easily track daily sales and expenses to calculate net profit.
* **Raw Material Marketplace:** Find local, verified suppliers by area and category.
* **Supplier Detail Pages:** View supplier inventory, place orders, and read/write reviews.
* **Leftover Marketplace:** A vendor-to-vendor marketplace to sell extra raw materials at the end of the day.

### For Suppliers:

* **Email/Password Login/Registration:** Secure account management for businesses.
* **Functional Supplier Portal:** A complete dashboard to manage the business.
* **Order Management:** A Trello-style board to track incoming orders from "New" to "Completed".
* **Inventory Management:** Easily add new products with prices and units.
* **Editable Business Profile:** Update business details, address, and supply categories.
* **Analytics Dashboard:** View sales charts, top-selling products, and manage featured items.

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Recharts
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JWT (JSON Web Tokens), bcrypt.js
* **APIs:** OpenWeatherMap API

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
* Node.js (which includes npm): [https://nodejs.org/](https://nodejs.org/)
* Git: [https://git-scm.com/](https://git-scm.com/)

### Setup Instructions

1.  **Create a Main Project Folder:**
    First, create a main folder on your computer to hold both the frontend and backend projects.
    ```sh
    mkdir VendorSaathiProject
    cd VendorSaathiProject
    ```

2.  **Clone the Backend Repository:**
    ```sh
    git clone https://github.com/vp007-dev/Rendor-Saathi-Backend
    ```

3.  **Clone the Frontend Repository:**
    ```sh
    git clone https://github.com/vp007-dev/Rendor-Saathi-Frontend
    ```

4.  **Install Backend Dependencies:**
    Navigate into the backend folder and install the required npm packages.
    ```sh
    cd your-backend-repo-name
    npm install
    ```

5.  **Install Frontend Dependencies:**
    Navigate into the frontend folder and install its packages.
    ```sh
    cd ../your-frontend-repo-name
    npm install
    ```

### Environment Variables

The backend requires a few secret keys to run.

1.  In your **backend folder**, create a new file named `.env`.
2.  Open the `.env` file and add the following variables, replacing the placeholder values with your actual keys:

    ```
    # Your MongoDB connection string from Atlas
    MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/yourDatabaseName
    
    # A long, random string for signing tokens
    JWT_SECRET=your_super_secret_key_for_jwt
    
    # Your free API key from OpenWeatherMap
    OPENWEATHER_API_KEY=your_openweathermap_api_key
    ```

### Running the Application

You will need to have two terminals open to run both the frontend and backend servers simultaneously.

1.  **Run the Backend (Server):**
    Open a terminal, navigate to your **backend folder**, and run:
    ```sh
    # Make sure you are inside the backend folder
    node server.js
    ```
    The backend API will be running at `http://localhost:5000`.

2.  **Run the Frontend (React App):**
    Open a **second** terminal, navigate to your **frontend folder**, and run:
    ```sh
    # Make sure you are inside the frontend folder
    npm start
    ```
    The frontend will be available at `http://localhost:3000`.

Your application is now fully running locally!
