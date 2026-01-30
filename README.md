# Work Tracker

[![Vercel Production Deployment](https://github.com/pi3t0m/work-tracker/actions/workflows/vercel-production.yml/badge.svg?branch=main)](https://github.com/pi3t0m/work-tracker/actions/workflows/vercel-production.yml)  
**[🚀 Live App](https://work-tracker-sage.vercel.app/)**

A modern, full-stack task management application built with **React**, **TypeScript**, and **Node.js**. Organize your work across three workflow stages: Backlog, In Progress, and Done.

## 🎯 Features

- ✅ **Three-Column Kanban Board** - Organize tasks across Backlog, In Progress, and Done
- ✅ **Task Management** - Create, move, and delete tasks with ease
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Clean UI** - Minimalist interface focused on productivity
- ✅ **Real-time Updates** - Instant task state changes

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with Flexbox
- **Vite** - Fast build tool
- **Node.js** - Backend (planned)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/pi3t0m/work-tracker.git
cd work-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open browser at `http://localhost:5173`

## 🚀 Usage

### Create a Task
1. Enter task title in input field
2. Click "Add Task" button
3. Task appears in Backlog column

### Move Tasks
- Click **→** button to move forward (Backlog → In Progress → Done)
- Click **←** button to move backward

### Delete Tasks
- Click **Delete** button (red) to remove task

## 📊 Project Structure

```
work-tracker/
├── src/
│   ├── App.jsx           # Main component
│   ├── App.css           # Styles
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies
├── vite.config.js        # Vite config
└── README.md             # This file
```

## 🎨 Key Features Explained

### Kanban Workflow
- **Backlog** - Tasks to be started
- **In Progress** - Tasks currently being worked on
- **Done** - Completed tasks

### Responsive Layout
- Centered container with max-width 1200px
- Flexbox grid for flexible column layout
- Mobile-friendly design

## 🔄 State Management

Uses React **useState** hook for task management:
- Tasks stored in component state
- Real-time UI updates
- Task IDs for unique identification

## 📚 Future Enhancements

- [ ] Backend API with Node.js & Express
- [ ] PostgreSQL database for persistence
- [ ] User authentication
- [ ] Drag-and-drop functionality
- [ ] Task filtering & search
- [ ] Dark mode
- [ ] Docker containerization
- [ ] GitHub Actions CI/CD

## 🚀 Deployment

- **Vercel** - Frontend deployment: [https://work-tracker-sage.vercel.app/](https://work-tracker-sage.vercel.app/)
- **Railway/Heroku** - Backend deployment (future)

### CI/CD Pipeline
- **GitHub Actions** - Automated builds and deployments on push to `main`
- **Preview deployments** - Auto-deployed on branches other than `main`
- **Production deployment** - Auto-deployed on `main` branch

## 👨‍💻 Author

**Tomasz Pietkiewicz**
- 📧 pietkiewicz.tomasz@outlook.com
- 💼 [LinkedIn](https://linkedin.com/in/pietkiewicz-tomasz)
- 🐙 [GitHub](https://github.com/pi3t0m)
- 📍 Wrocław, Poland

## 📝 License

This project is licensed under the **MIT License** - see LICENSE file for details.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements!

---

**Built as part of my portfolio journey: L2/L3 Support Engineer → Full-Stack Developer/DevOps Engineer** 🚀
