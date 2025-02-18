# Bus Booking Web Application

## Overview
The **Bus Booking Web Application** is designed to streamline bus booking and scheduling in Kenya. The system allows users to book seats, manage schedules, and process payments efficiently. This web application is hosted on [https://rapid-bus-transport.vercel.app/], allowing for seamless access from any device with an internet connection. For a deeper look into the application's features and functionality, check out the presentation slides below:
[(https://www.canva.com/design/DAGeWSeQA8E/Wj8YovF0Z6G5O5RmMpPfuQ/edit?utm_content=DAGeWSeQA8E&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)]

## Features
### **User Roles & Functionalities**
#### **1. Admin**
- Manages system operations.
- Oversees bookings, payments, and bus schedules.
- **Note**: The first user registered is the sole admin.

#### **2. Drivers / Bus Owners**
- Register new buses (seats, cost, routes, schedules).
- Manage existing buses (add, update, delete).
- Set seat prices and availability.

#### **3. Customers**
- View available buses and seats.
- Book, update, or cancel bookings.
- Process payments securely.

## Tech Stack
### **Backend**
- **Framework:** Flask (Python)
- **Database:** PostgreSQL
- **Authentication:** Flask-JWT-Extended
- **API Design:** Flask-RESTful
- **Migrations:** Flask-Migrate

### **Frontend**
- **Library:** ReactJS (Redux Toolkit)
- **UI Design:** Figma (Mobile-Friendly)
- **State Management:** Redux Toolkit


## Setup & Installation

### **Prerequisites**
Ensure you have the following installed:
- Python 3.8+
- PostgreSQL
- Node.js and npm (for frontend setup)

### **Backend Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/bus-booking-app.git
   cd bus-booking-app
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Set up environment variables (`.env` file):
   ```env
   DATABASE_URI=postgresql://username:password@localhost:5432/bus_booking_db
   JWT_SECRET_KEY=your_secret_key
   FRONTEND_URL=https://rapid-bus-transport.vercel.app
   ```
5. Run database migrations:
   ```sh
   flask db upgrade
   ```
6. Start the Flask server:
   ```sh
   flask run
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```

## API Endpoints

### **Authentication**
- **Register User:** `POST /signup`
- **Login User:** `POST /login`

### **Buses**
- **Get all buses:** `GET /buses`
- **Get a bus:** `GET /buses/<bus_id>`
- **Add a bus:** `POST /buses`
- **Update a bus:** `PUT /buses/<bus_id>`
- **Delete a bus:** `DELETE /buses/<bus_id>`

### **Schedules**
- **Get all schedules:** `GET /schedules`
- **Add a schedule:** `POST /schedules`

### **Seats**
- **Get available seats:** `GET /seats/<schedule_id>`
- **Add seats:** `POST /seats`

### **Bookings**
- **Get all bookings:** `GET /bookings`
- **Book a seat:** `POST /bookings`

### **Payments**
- **Process payment:** `POST /payments`



### **Running Tests**
- Backend:
  ```sh
  pytest
  ```
- Frontend:
  ```sh
  npm test
  ```

## License
This project is licensed under the MIT License.

## Contributors
- **Shukri** - Application & Database Configuration
- **Wamboi** - Models & Migrations
- **Steve** - Authentication & Testing
- **Innocent & Adirahman** - API Routes & Integrations


