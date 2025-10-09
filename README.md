# FinSight 💰

*Track smarter. Spend wiser.*

🔗 [Live Demo](https://finsightbeta.vercel.app/) | 💻 [GitHub Repository](https://github.com/rishigxsh/ai-expense-tracker)

FinSight is a fully deployed, AI-powered expense tracking web app that delivers real-time analytics, personalized insights, and a sleek, modern UI. Built with React, Firebase, and Tailwind CSS — now live on Vercel.

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-11.10-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📸 Screenshots

*Showcasing the latest UI with final polish and dark mode support*

### Login Page
![Login Page](../main/screenshots/login.png)
*Modern, professional SaaS-style login with Google authentication*

### Dashboard
![Dashboard](../main/screenshots/dashboard.png)
*Real-time expense tracking with interactive charts and smart insights*

### Analytics Page
![Analytics Page](../main/screenshots/analytics.png)
*Deep dive into spending patterns with monthly breakdowns and category analysis*

---

## ✨ Features

### 💳 **Expense Management**
- Add, edit, and delete expenses with ease
- Automatic category suggestions using AI
- Real-time Firebase Firestore synchronization
- Categorized expense tracking (Food, Transportation, Entertainment, etc.)

### 📊 **Comprehensive Analytics**
- **Monthly Spending Breakdown**: Interactive bar chart showing last 6 months
- **Top Categories**: Pie chart highlighting your spending distribution
- **Spending Trends**: Area chart visualizing spending patterns over time
- **Spending Heatmap**: Visual representation of daily spending intensity

### 💡 **Smart Recommendations**
- AI-powered budget analysis
- Overspending alerts
- Category-specific spending insights
- Personalized financial tips

### 🎯 **Spend Tracking**
- Real-time spend summary with progress bars
- Monthly budget limits with visual indicators
- Warning alerts when approaching limits
- Transaction count and remaining budget display

### ⚙️ **Settings & Customization**
- **Profile Management**: Edit display name and view account details
- **Dark Mode**: Seamless light/dark theme toggle with persistence
- **Data Management**: Reset all expenses and limits with confirmation
- **Google Authentication**: Secure login with profile integration

### 🎨 **Modern UI/UX**
- Responsive design for desktop, tablet, and mobile
- Smooth animations and transitions
- Professional SaaS-style interface
- Icon-enhanced components
- Intuitive navigation with React Router

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18.2** - Modern UI library with hooks
- **Vite 5.0** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **React Router DOM 7.9** - Client-side routing

### **Data Visualization**
- **Recharts 2.15** - Responsive chart library
  - Bar Charts (monthly breakdown)
  - Pie Charts (category distribution)
  - Area Charts (spending trends)
  - Custom tooltips and animations

### **Backend & Authentication**
- **Firebase 11.10** - Backend as a Service
  - **Firestore**: Real-time NoSQL database
  - **Authentication**: Google OAuth integration
  - **Cloud Storage**: Persistent data sync

### **Development Tools**
- **Vite**: Fast HMR and optimized builds
- **PostCSS**: CSS processing with Autoprefixer
- **ES Modules**: Modern JavaScript architecture

---

## 📂 Project Structure

```
finsight/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ExpenseForm.jsx      # Add expense form with AI suggestions
│   │   ├── ExpenseList.jsx      # Expense table with category icons
│   │   ├── ExpenseSummary.jsx   # Spend summary with progress bars
│   │   ├── ExpenseCharts.jsx    # Pie and bar chart visualizations
│   │   ├── SpendingHeatmap.jsx  # Daily spending intensity map
│   │   ├── ExpensePrediction.jsx # Future spending predictions
│   │   ├── Recommendations.jsx  # AI-powered budget tips
│   │   ├── SpendLimit.jsx       # Monthly limit tracker
│   │   ├── Navbar.jsx           # Navigation with dropdown
│   │   ├── Login.jsx            # Google auth login page
│   │   └── Loader.jsx           # Loading spinner
│   │
│   ├── pages/                # Page components
│   │   ├── Home.jsx             # Main dashboard
│   │   ├── Analytics.jsx        # Analytics page with charts
│   │   └── Settings.jsx         # User settings page
│   │
│   ├── context/              # React Context providers
│   │   ├── AuthContext.jsx      # Authentication state
│   │   └── ThemeContext.jsx     # Theme management
│   │
│   ├── services/             # Business logic & utilities
│   │   ├── firebase.js          # Firebase configuration
│   │   ├── categorizer.js       # AI category suggestions
│   │   ├── predictor.js         # Spending predictions
│   │   ├── recommender.js       # Budget recommendations
│   │   └── storage.js           # Storage utilities
│   │
│   ├── styles/               # Global styles
│   │   └── tailwind.css         # Tailwind imports & custom CSS
│   │
│   ├── App.jsx               # Root component with routing
│   └── main.jsx              # Application entry point
│
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Firebase account (free tier works)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rishigxsh/ai-expense-tracker.git
   cd ai-expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   
   a. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   
   b. Enable **Firestore Database**:
      - Click "Create database"
      - Start in production mode
      - Choose your region
   
   c. Enable **Authentication**:
      - Go to Authentication → Sign-in method
      - Enable "Google" provider
      - Add authorized domains (localhost for development)
   
   d. Get your Firebase config:
      - Project Settings → General
      - Scroll to "Your apps" → Web app
      - Copy the configuration object
   
   e. Update `src/services/firebase.js`:
      ```javascript
      const firebaseConfig = {
        apiKey: "your-api-key",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "your-sender-id",
        appId: "your-app-id"
      };
      ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 🎯 Key Features Explained

### AI-Powered Category Suggestions
The app uses keyword matching algorithms to automatically suggest expense categories based on your description. For example:
- "Uber ride" → Transportation
- "Pizza delivery" → Food
- "Netflix subscription" → Entertainment

### Real-Time Data Sync
All expense data is stored in Firebase Firestore, providing:
- ✅ Automatic synchronization across devices
- ✅ Real-time updates without page refresh
- ✅ Offline support with local caching
- ✅ Secure, scalable cloud storage

### Smart Budget Recommendations
The recommendation engine analyzes your spending patterns and provides:
- 💰 Budget optimization tips
- ⚠️ Overspending warnings
- 📈 Category-specific insights
- 🎯 Personalized financial advice

### Responsive Design
Built mobile-first with Tailwind CSS:
- 📱 Mobile: Stacked layout, touch-friendly
- 💻 Tablet: 2-column grid
- 🖥️ Desktop: Full dashboard with sidebar

---

## 🎨 Design Highlights

- **Modern SaaS Aesthetic**: Professional login page with gradient backgrounds
- **Consistent Color Palette**: Blue (info), Green (positive), Orange (warning), Red (error)
- **Smooth Animations**: Fade-in effects, hover transitions, loading states
- **Icon Integration**: SVG icons throughout for better UX
- **Dark Mode Support**: Seamless theme switching with localStorage persistence

---

## 🔒 Security & Privacy

- ✅ Google OAuth for secure authentication
- ✅ Firebase security rules for data protection
- ✅ User data isolation (per-user collections)
- ✅ No sensitive data stored client-side
- ✅ HTTPS-only in production

---

## 📊 Firestore Data Structure

```
users/{userId}/
  ├── profile/
  │   └── profile (doc)
  │       ├── displayName
  │       ├── email
  │       └── photoURL
  │
  ├── expenses/ (collection)
  │   └── {expenseId} (doc)
  │       ├── amount
  │       ├── category
  │       ├── description
  │       └── date
  │
  └── limit/
      └── limit (doc)
          └── value
```

---

## 🚢 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Environment Variables
Set these in your deployment platform:
- Firebase config values (if using environment variables)

---

## 🛣️ Roadmap

- [x] Core expense tracking
- [x] Firebase integration
- [x] Google Authentication
- [x] Analytics dashboard
- [x] Dark mode
- [x] AI recommendations
- [ ] Export to CSV/PDF
- [ ] Budget templates
- [ ] Recurring expenses
- [ ] Multi-currency support
- [ ] Shared budgets (family/team)
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🌟 Project Summary

### Key Achievements
✅ **Live Deployment** - Successfully deployed and running on Vercel at [https://finsightbeta.vercel.app/](https://finsightbeta.vercel.app/)  
✅ **Firebase Integration** - Real-time database sync with Google OAuth authentication  
✅ **Mobile Responsive** - Fully optimized for desktop, tablet, and mobile devices  
✅ **AI-Driven Recommendations** - Smart budget insights and spending pattern analysis  
✅ **Dark Mode Support** - Seamless theme switching with localStorage persistence  
✅ **Production Ready** - Optimized build with modern tooling and best practices

### Technologies Used
- **Frontend**: React 18.2, Vite 5.0, Tailwind CSS 3.4, React Router DOM 7.9
- **Backend**: Firebase 11.10 (Firestore, Authentication)
- **Data Visualization**: Recharts 2.15
- **Deployment**: Vercel (CI/CD enabled)
- **State Management**: React Context API

### Live Application
🚀 **[Visit FinSight Live](https://finsightbeta.vercel.app/)**

Experience the full power of AI-driven expense tracking with real-time analytics, personalized recommendations, and a beautiful, intuitive interface.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Rishigesh R**
- Portfolio: [https://finsightbeta.vercel.app/](https://finsightbeta.vercel.app/)
- LinkedIn: [https://www.linkedin.com/in/rajer03/](https://www.linkedin.com/in/rajer03/)
- GitHub: [@rishigxsh](https://github.com/rishigxsh)

---

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) for backend infrastructure
- [Recharts](https://recharts.org/) for beautiful data visualizations
- [Tailwind CSS](https://tailwindcss.com/) for rapid UI development
- [Heroicons](https://heroicons.com/) for SVG icons

---

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or reach out via email.

---

<div align="center">
  
**FinSight** - Track smarter. Spend wiser. 💰

Made with ❤️ using React + Firebase + Tailwind CSS

[Live Demo](https://finsight.vercel.app) • [Report Bug](https://github.com/rishigxsh/ai-expense-tracker/issues) • [Request Feature](https://github.com/rishigxsh/ai-expense-tracker/issues)

</div>
