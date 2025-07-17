# 🎟️ QR Code Ticket Booking Application

This is a full-stack ticket booking application where users can book tickets for various services (Bus, Train, Cinema, etc.) and receive a QR code as their digital ticket. The QR code can be scanned and verified for ticket validation.

---

## 🚀 Tech Stack

- **Frontend:** React.js  
- **Backend:** Spring Boot  
- **Database:** MySQL  

---

## 📱 Features

- Book tickets by selecting the type (Bus, Train, Cinema, etc.) and number of seats  
- Integrated payment process  
- Generates a **unique Ticket ID** and **QR Code** after successful payment  
- QR Code can be verified for authenticity  
- Clean and responsive UI  

---

## 🛠️ Installation Steps

Follow these steps to set up the project on your local system:

## 1) Clone the repository

git clone https://github.com/Vishnuvarman007/Qr_code_ticket_booking
cd Qr_code_ticket_booking
npm install
npm start



## 2) Set Up MySQL Database
Open MySQL and create a new database:

CREATE DATABASE ticket_booking_db;

Update the database connection details in backend/src/main/resources/application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/ticket_booking_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update


## 3) Run the Backend (Spring Boot)
Navigate to the backend folder and run:

cd Qr_code_ticket_booking
./mvnw spring-boot:run
        Or 
if you have Maven installed globally:

mvn spring-boot:run
The backend will start on: http://localhost:8080