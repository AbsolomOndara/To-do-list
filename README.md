# To-Do List Application

![To-Do List Screenshot](./frontend/assets/screenshot.png) *(Add a screenshot later)*

A full-stack to-do list application with a clean, modern UI and robust functionality.

## Features

- ✅ Add, edit, and delete tasks
- 📝 Add descriptions and due dates to tasks
- ✔️ Mark tasks as complete
- 🔍 Filter tasks by status (All/Active/Completed)
- 🎨 Responsive design that works on all devices
- 💾 Persistent data storage using MongoDB

## Technologies Used

### Frontend
- HTML5, CSS3, JavaScript
- Font Awesome for icons
- Modern CSS with Flexbox and variables

### Backend
- Node.js with Express
- MongoDB (with Mongoose ODM)
- RESTful API design

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas cluster)
- Git

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AbsolomOndara/To-do-list.git
   cd To-do-list
Set up the backend:

bash
cd backend
npm install
Configure MongoDB:

Create a .env file in the backend directory:

text
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=5000
Start the backend server:

bash
npm run dev
Set up the frontend:

Open the frontend/index.html file in your browser

Or use VS Code Live Server extension

API Endpoints
Endpoint	Method	Description
/api/tasks	GET	Get all tasks
/api/tasks	POST	Create new task
/api/tasks/:id	PUT	Update a task
/api/tasks/:id	DELETE	Delete a task
Project Structure
text
todo-app/
├── backend/               # Backend API code
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── server.js         # Main server file
│   └── package.json      # Backend dependencies
├── frontend/             # Frontend code
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   ├── assets/           # Images/icons
│   └── index.html        # Main HTML file
└── README.md             # This file
Future Enhancements
User authentication

Task categories/tags

Drag-and-drop reordering

Dark mode toggle

Task search functionality

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For questions or feedback, please contact:

Absolom Ondara

GitHub: @AbsolomOndara
