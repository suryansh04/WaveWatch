# WaveWatch (SIH)

WaveWatch is a full-stack coastal hazard monitoring and reporting platform built for Smart India Hackathon (SIH).
It enables real-time hazard reporting,social media analysis, and interactive geospatial visualization for analysts and administrators. This project is developed for the Smart India Hackathon (SIH) 2025.

## Key Features

- **Real-time Alerts:** System for creating and displaying active alerts.
- **Interactive Map:** Utilizes Leaflet to display geographical data, including alerts, reports, and other points of interest.
- **Data Visualization:** Includes charts and statistical cards to analyze data trends.
- **Multi-faceted Reporting:** Functionality for users to submit reports, which are then displayed and managed by analysts.
- **Call & SMS Analysis:** Backend capabilities to process and analyze call and SMS data via Twilio.
- **Social Media Analysis:** Module for analyzing social media data to gather insights.
- **User Authentication:** Secure login and registration system for different user roles (e.g., regular users, analysts).
- **Analyst Dashboard:** A dedicated dashboard for analysts to review reports, manage users, and view comprehensive analytics.
- **User Approval System:** Admins/analysts can approve or deny new user registrations.

## Tech Stack

### Frontend

- **Framework:** React.js
- **Build Tool:** Vite
- **Routing:** React Router
- **Styling:** CSS Modules
- **Mapping:** Leaflet & React-Leaflet, Google Maps API
- **Charting:** Recharts
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

### Backend

- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) and bcryptjs for password hashing.
- **SMS/Communication:** Twilio
- **Middleware:** CORS, Morgan (for logging), Express-Validator (for input validation).

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm (or yarn) installed.
- A MongoDB instance (local or cloud-based).
- A Twilio account for SMS functionalities.
- A Google Maps API Key.

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/WaveWatch-SIH.git
    cd WaveWatch-SIH
    ```

2.  **Setup Backend:**

    - Navigate to the backend directory: `cd backend`
    - Install NPM packages: `npm install`
    - Create a `.env` file in the `backend` directory and add the following environment variables:
      ```
      PORT=3000
      DB=your_mongodb_connection_string
      DB_PASSWORD=your_mongodb_password
      DATABASE_NAME=your_database_name
      JWT_SECRET=your_jwt_secret
      TWILIO_ACCOUNT_SID=your_twilio_account_sid
      TWILIO_AUTH_TOKEN=your_twilio_auth_token
      TWILIO_PHONE=your_twilio_phone_number
      MY_PHONE=your_phone_number
      VAPI_API_KEY=your_vapi_api_key
      VAPI_ASSISTANT_ID=your_vapi_assistant_id
      VAPI_NUMBER_ID=your_vapi_number_id
      BASE_URL=your_ngrok_or_base_url
      GOOGLE_MAPS_API_KEY=your_google_maps_api_key
      ```

3.  **Setup Frontend:**
    - Navigate to the frontend directory: `cd ../frontend`
    - Install NPM packages: `npm install`
    - If your backend is running on a different port, you might need to configure the proxy in `vite.config.js` or set the base URL for Axios calls.

### Running the Application

1.  **Start the backend server:**

    - From the `backend` directory, run:
      ```sh
      npm start
      ```
    - The server will start on the configured port (e.g., http://localhost:3000).

2.  **Start the frontend development server:**
    - From the `frontend` directory, run:
      ```sh
      npm run dev
      ```
    - The application will be available at http://localhost:5173 (or another port if 5173 is in use).

## Project Structure

The project is organized into two main parts: a `frontend` directory and a `backend` directory.

```
WaveWatch-SIH/
├── backend/
│   ├── controllers/  # Handles business logic
│   ├── middlewares/  # Express middlewares (e.g., auth)
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   ├── app.js        # Express app setup
│   └── server.js     # Server entry point
│
└── frontend/
    ├── src/
    │   ├── assets/       # Static assets (images, svgs)
    │   ├── components/   # Reusable React components
    │   ├── Pages/        # Main pages of the application
    │   ├── App.jsx       # Main App component with routing
    │   └── main.jsx      # React app entry point
    ├── vite.config.js  # Vite configuration
    └── package.json
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
