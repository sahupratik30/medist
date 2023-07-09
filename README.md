# Medist - E-commerce Medicine Delivery Platform
[![GitHub stars](https://img.shields.io/github/stars/sahupratik30/medist.svg?style=social)](https://github.com/sahupratik30/medist/stargazers)
![Language](https://img.shields.io/badge/OpenSource-❤-yellow.svg)

Medist is an **E-commerce platform** that enables users to **order medicines** online from **nearby pharmacies** using their current location. It utilizes the **Geolocation API** for tracking user's current location and the **Places API** for finding nearby pharmacy stores. The platform offers a seamless online shopping experience for medicines and integrates with **Razorpay** for secure and convenient payment processing.

## Tech Stack

- ### **Frontend**:
  - **React.js**: A JavaScript library for building user interfaces.
  - **Tailwind CSS**: A utility-first CSS framework for rapidly building responsive designs.
  - **Redux Toolkit**: A Redux package for efficient state management.
  - **Vite**: A fast and opinionated frontend build tool.

- ### **Backend**:
  - **Django**: A high-level Python web framework for building robust web applications.
  - **Django Rest Framework**: A powerful and flexible toolkit for building Web APIs.
  - **SQLite**: A lightweight and serverless database management system.

## Features

- User authentication and authorization.
- User location tracking using the Geolocation API.
- Nearby pharmacy stores information using the Places API.
- Search functionality for finding medicines.
- Filter medicines based on various health conditions.
- User-friendly interface for browsing and selecting medicines.
- Cart management and order placement.
- Integration with Razorpay for secure online payments.

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- Python (v3.8 or higher)
- SQLite database

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/sahupratik30/medist.git
   ```
   
2. Install the frontend dependencies::

   ```shell
   cd medist-frontend
   npm install
   ```
   
3. Install the backend dependencies::

   ```shell
   cd ../medist-backend
   pip install -r requirements.txt
   ```
   
4. Start the frontend development server:

   ```shell
   cd ../medist-frontend
   npm run dev
   ```

5. Start the backend server:

   ```shell
   cd ../medist-backend
   python manage.py runserver
   ```

6. Open your browser and visit `http://localhost:3000` to access the Medist application.

## Contributing

Contributions are welcome! If you would like to contribute to the project, please follow these steps:
```
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request, explaining your changes and their benefits.
```

If you find this project helpful or interesting, please consider dropping a ⭐ to the repository.

