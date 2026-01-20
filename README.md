# TaskBoard SaaS

A modern Task Management Software as a Service (SaaS) built with React and FastAPI.

## 🚀 Features

- **Authentication**: Secure user authentication using [Clerk](https://clerk.com/).
- **Task Management**: Create, view, and manage tasks on a visual board.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-time Performance**: Fast and reactive UI built with React and Vite.
- **Scalable Backend**: Robust API powered by FastAPI and SQLAlchemy.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Authentication**: [Clerk React SDK](https://clerk.com/docs/references/react/overview)
- **Routing**: [React Router](https://reactrouter.com/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Authentication**: [Clerk Backend SDK](https://clerk.com/docs/references/backend/overview)
- **Database**: SQLite (Development)
- **Server**: [Uvicorn](https://www.uvicorn.org/)

## 🏗️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python 3.13+
- [uv](https://github.com/astral-sh/uv) (recommended for Python package management)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/agarwalson02/TaskBoard_SaaS.git
   cd TaskBoard_SaaS
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   # Create a .env file and add your Clerk keys
   # Example:
   # CLERK_SECRET_KEY=sk_test_...
   # CLERK_PUBLISHABLE_KEY=pk_test_...
   
   uv sync
   python start.py
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   # Create a .env file and add your Clerk publishable key
   # VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   
   npm install
   npm run dev
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
