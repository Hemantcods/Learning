# K72-YT Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features smooth scrolling animations, GSAP-powered interactions, and a clean, professional design.

## 🚀 Live Demo

[https://learning-gray.vercel.app/](https://learning-gray.vercel.app/)

## ✨ Features

- **Smooth Scrolling**: Powered by Lenis for buttery-smooth scroll behavior
- **Animated Transitions**: GSAP integration for engaging entrance animations
- **Responsive Design**: Optimized for all device sizes
- **Modern Tech Stack**: React 19, TypeScript, Vite, TailwindCSS
- **Intuitive Navigation**: Sticky navbar with full-screen mobile menu
- **Project Showcase**: Interactive project cards with hover effects
- **Video Integration**: Embedded video content with custom controls

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4
- **Animations**: GSAP (GreenSock Animation Platform)
- **Scrolling**: Lenis
- **Routing**: React Router DOM
- **Icons**: React Icons
- **Linting**: ESLint with TypeScript support

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
│   ├── Navigation/  # Navbar and mobile menu
│   ├── common/      # Shared components
│   └── home/        # Home page specific components
├── Pages/           # Page components
│   ├── Home.tsx
│   ├── Agence.tsx
│   └── Projects.tsx
├── context/         # React context providers
├── App.tsx          # Main app component with routing
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## 🔧 Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/k72-yt.git
cd k72-yt
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 📱 Responsive Breakpoints

The design follows a mobile-first approach with these breakpoints:
- Mobile: < 640px
- Tablet: ≥ 640px
- Desktop: ≥ 1024px
- Large Desktop: ≥ 1280px

## 🎨 Customization

### Colors
Modify the TailwindCSS configuration in `tailwind.config.js` (if present) or adjust the color variables in `src/index.css`.

### Typography
Font families and sizes are defined in `src/index.css` using Tailwind's utility classes.

## 🚀 Deployment

This project is deployed on Vercel. To deploy your own version:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Vercel will automatically detect the Vite configuration and deploy the site

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created by Hemant Kumar

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://react.dev/) - JavaScript library for building user interfaces
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [GSAP](https://greensock.com/gsap/) - Professional-grade animation library
- [Lenis](https://github.com/darkroomengineering/lenis) - Smooth scrolling library
- [Vercel](https://vercel.com/) - Platform for frontend deployment