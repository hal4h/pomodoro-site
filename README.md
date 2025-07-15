# 🍅 Pomoverse - Aesthetic Pomodoro Timer

A highly customizable, aesthetic Pomodoro timer application built with React and Vite. Features real-time database synchronization, Spotify integration, task management, and unlockable backgrounds with a beautiful pastel design system.

**🌐 Live Demo:** [pomo-verse.vercel.app](https://pomo-verse.vercel.app)

## ✨ Features

### 🎯 Core Functionality
- **Pomodoro Timer**: 25/5 minute sessions with custom duration input
- **Task Management**: Full CRUD operations with due dates, priorities, and subtasks
- **Points System**: Earn points through completed sessions and tasks
- **Background Shop**: Unlock 20+ animated and static backgrounds
- **Music Integration**: Spotify embed player with custom playlist support
- **Real-time Sync**: Supabase integration for cross-device synchronization

### 🎨 Design & UX
- **Aesthetic UI**: Beautiful pastel color scheme with smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dynamic Theming**: Background colors adapt to selected themes
- **Accessibility**: Keyboard navigation and screen reader support
- **Onboarding Flow**: Guided tour for new users

### 🔧 Technical Features
- **Authentication**: Supabase Auth with email/password
- **Database**: PostgreSQL with real-time subscriptions
- **State Management**: React Context with reducer pattern
- **Data Migration**: Automatic localStorage to database migration
- **Offline Support**: Graceful fallback to localStorage
- **Performance**: Optimized bundle with code splitting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for full features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/pomodoro-site.git
cd pomodoro-site
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Database Setup**
Run the SQL schema from `database-schema.sql` in your Supabase dashboard.

5. **Start development server**
```bash
npm run dev
```

6. **Open [http://localhost:5173](http://localhost:5173)** in your browser

## 🎮 How to Use

### Timer
- **Start/Pause**: Control Pomodoro sessions
- **Reset**: Return to original time
- **Custom Duration**: Input field for custom session lengths
- **Current Task**: Display and manage active task
- **Points**: Earn 10 points per completed session

### Task Management
- **Add Tasks**: Create tasks with due dates and priorities
- **Subtasks**: Break down complex tasks
- **Notes**: Add detailed descriptions
- **Set Current Task**: Link tasks to timer sessions
- **Complete Tasks**: Earn 5 points per completed task

### Background Shop
- **Unlock Backgrounds**: Use points to unlock new themes
- **Dynamic Colors**: Accent colors adapt to background
- **Preview System**: See backgrounds before purchasing
- **Categories**: Pixel art, animated GIFs, and Persian rugs

### Music Integration
- **Spotify Embeds**: Direct integration with Spotify
- **Custom Playlists**: Add any Spotify URL
- **Focus Music**: Curated study playlists
- **Persistent Library**: Saved across sessions

### User Experience
- **Onboarding**: Guided tour for new users
- **Data Migration**: Automatic localStorage to database sync
- **Real-time Updates**: Live sync across devices
- **Offline Mode**: Works without internet connection

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Styled Components** - CSS-in-JS with dynamic theming
- **React Icons** - Comprehensive icon library
- **React Router** - Client-side routing

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Row Level Security** - Secure data access
- **Real-time Subscriptions** - Live data updates
- **Supabase Auth** - Authentication system

### Design & UX
- **Pastel Color System** - Consistent design language
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - CSS transitions and transforms
- **Accessibility** - WCAG 2.1 compliance

## 📊 Database Schema

### Tables
- `user_profiles` - User data and preferences
- `tasks` - Task management with relationships
- `user_music` - Spotify track storage
- `study_sessions` - Session tracking and analytics

### Features
- **Row Level Security** - User-specific data access
- **Real-time Subscriptions** - Live updates
- **Automatic Indexing** - Optimized queries
- **Data Triggers** - Automated point calculations

3. Deploy automatically on push to main branch

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pomodoro Technique** - Francesco Cirillo for productivity methodology
- **Spotify** - Music integration and embed API
- **Supabase** - Backend infrastructure and real-time features
- **Vercel** - Deployment and hosting platform
- **React Community** - Open source contributions and documentation
