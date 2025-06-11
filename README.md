# Theray - Therapy Management App

A full-stack therapy management application built with Express.js, TypeScript, React, and MongoDB.

## Features

- **User Authentication**: Register/login for clients and therapists
- **Role-based Access Control**: Different interfaces for clients and therapists
- **Therapist Profiles**: Complete profile management with specializations, availability, etc.
- **Session Booking**: Clients can book sessions with therapists
- **Session Management**: Full CRUD operations for therapy sessions
- **Real-time Dashboard**: User-specific dashboards with session information

## Tech Stack

### Backend
- **Express.js** with TypeScript
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **helmet** for security
- **cors** for cross-origin requests

### Frontend
- **React** with TypeScript
- **Vite** for development and building
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **TanStack Query** for API state management
- **Tailwind CSS** with shadcn/ui components
- **Axios** for API calls

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd theray
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   **Server (.env in `/server` directory):**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/theray
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   ```

   **Client (.env in `/client` directory):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

6. **Run the application**
   
   **Start the server:**
   ```bash
   cd server
   npm run dev
   ```

   **Start the client (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```

7. **Access the application**
   - Client: http://localhost:5173
   - Server API: http://localhost:5000/api
   - Health check: http://localhost:5000/api/health

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (authenticated)
- `PUT /api/auth/profile` - Update user profile (authenticated)

### Therapists
- `GET /api/therapists` - Get all therapists (with filters)
- `GET /api/therapists/:id` - Get therapist by ID
- `POST /api/therapists/profile` - Create therapist profile (therapist only)
- `GET /api/therapists/my-profile` - Get own therapist profile (therapist only)
- `PUT /api/therapists/profile` - Update therapist profile (therapist only)

### Sessions
- `POST /api/sessions` - Book a session (client only)
- `GET /api/sessions` - Get user's sessions (with filters)
- `GET /api/sessions/:id` - Get session by ID
- `PUT /api/sessions/:id` - Update session
- `PATCH /api/sessions/:id/cancel` - Cancel session

## User Roles

### Client
- Register and manage profile
- Browse and filter therapists
- Book therapy sessions
- View and manage their sessions
- Add session notes

### Therapist
- Register and create detailed profile
- Set availability and rates
- Manage scheduled sessions
- Add session notes and meeting links
- View client information

## Database Models

### User
- Basic user information (name, email, role, etc.)
- Authentication data
- Profile information

### Therapist
- Extended profile for therapists
- Specializations, experience, education
- Availability schedule
- Rates and session types

### Session
- Session booking information
- Client and therapist references
- Date, time, and duration
- Status tracking
- Notes and meeting links

## Development

### Server Development
```bash
cd server
npm run dev  # Starts with nodemon for auto-reload
```

### Client Development
```bash
cd client
npm run dev  # Starts Vite dev server
```

### Building for Production

**Server:**
```bash
cd server
npm run build
npm start
```

**Client:**
```bash
cd client
npm run build
npm run preview
```

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet for security headers
- Role-based access control

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
