# Director Portfolio Website

A minimalistic and elegant portfolio website built for directors and screenwriters, featuring a modern React TypeScript architecture with dark/light theme switching.

## 🎬 Features

- **Minimalistic Design**: Clean, cinematic aesthetic perfect for creative professionals
- **Dark/Light Theme**: Seamless theme switching with persistent storage (Light theme default)
- **Component Architecture**: Modular React components for maintainability
- **TypeScript**: Full type safety and better developer experience
- **Responsive Design**: Works beautifully on all devices
- **Professional Sections**: Home, Work, About, and Contact pages
- **Interactive Elements**: Film strip animation and smooth transitions
- **Linting & Formatting**: ESLint and Prettier configured for code quality

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd director-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navigation.tsx   # Navigation bar with theme toggle
│   ├── HomeSection.tsx  # Hero section with stats
│   ├── WorkSection.tsx  # Portfolio showcase
│   ├── AboutSection.tsx # Professional background
│   ├── ContactSection.tsx # Contact form
│   └── Footer.tsx       # Footer with social links
├── contexts/            # React Context providers
│   └── ThemeContext.tsx # Theme state management
├── App.tsx             # Main application component
├── App.css             # Global styles and theme variables
└── index.tsx           # Application entry point
```

## 🎨 Customization

### Changing Content

1. **Personal Information**: Update the director name and details in `Navigation.tsx`
2. **Portfolio Projects**: Modify the projects array in `WorkSection.tsx`
3. **About Content**: Edit the text and skills in `AboutSection.tsx`
4. **Contact Information**: Update contact details in `ContactSection.tsx`

### Styling

- **Theme Colors**: Modify CSS variables in `App.css` under `:root`
- **Typography**: Change font imports in `public/index.html`
- **Layout**: Adjust component-specific styles in `App.css`

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to the navigation in `Navigation.tsx`
3. Include it in the main content switching logic in `App.tsx`

## 🔧 Development Tools

- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting for consistent style
- **TypeScript**: Static type checking
- **React DevTools**: Browser extension for debugging

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🌟 Theme System

The website features a sophisticated theme system with:

- **Light Theme**: White backgrounds with dark text (default)
- **Dark Theme**: Black backgrounds with white text
- **Circular Toggle**: Bordered theme toggle button with hover effects
- **Smooth Transitions**: CSS transitions for seamless switching
- **Persistent Storage**: Theme preference saved to localStorage
- **Context API**: Global theme state management

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the repository or contact the maintainer.

---

Built with ❤️ for creative professionals who value clean, minimalistic design.