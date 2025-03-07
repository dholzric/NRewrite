# Modern Lotus Notes - Installation Guide

This application is a modern web-based alternative to Lotus Notes, featuring document management, customizable forms, and view filtering.

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/modern-lotus-notes.git
   cd modern-lotus-notes
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

The application is organized into several key components:

- **ModernNotesApp**: Main application component with document management
- **FormDesigner**: Form creation and editing component
- **FormListDialog**: Dialog for managing form templates

## Configuration

### Tailwind CSS

This project uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`. You can customize the theme by modifying this file:

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Add your custom theme extensions here
    },
  },
  plugins: [],
}
```

### Storage

By default, the application uses browser localStorage for data persistence. To configure a backend server:

1. Update the API endpoints in `src/services/api.js`
2. Configure CORS on your server to accept requests from your frontend

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate optimized files in the `build` directory that can be deployed to any static hosting service.

## Features in Development

Future releases will include:

- Full-text search
- Agent scripting (automation)
- Document versioning
- Advanced access controls
- Mobile responsive design

## Troubleshooting

If you encounter issues during installation:

1. Make sure you're using a compatible Node.js version
2. Try clearing npm cache: `npm cache clean --force`
3. If you see module resolution errors, try: `npm install --legacy-peer-deps`

## Contributing

Contributions are welcome! Please check the CONTRIBUTING.md file for guidelines.
