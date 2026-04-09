# GST Invoice Generator

A production-ready, scalable invoice generation application with GST (Goods and Services Tax) compliance, built with modern web technologies.

## 🚀 Features

- **📄 Invoice Management**: Create, edit, view, and manage invoices with ease
- **✅ GST Compliance**: Automatic GST calculation and compliance for Indian businesses
- **🎨 Modern UI**: Beautiful, responsive interface with Shadcn UI components
- **🌙 Dark Mode**: Full dark mode support with next-themes
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **⚡ Lightning Fast**: Built with Next.js 14+ for optimal performance
- **🔒 Type-Safe**: Full TypeScript support for robust code
- **🎯 Feature-Driven Architecture**: Scalable folder structure for easy feature additions
- **📡 RESTful API**: Complete API endpoints for invoice operations
- **🔧 Production-Ready**: ESLint, Prettier, and best practices configured

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Shadcn UI](https://shadcn-ui.com/) - High-quality React components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Theme**: [Next-Themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- **Code Quality**: [ESLint](https://eslint.org/) - Code linting
- **Code Formatting**: [Prettier](https://prettier.io/) - Code formatter
- **Utilities**: [clsx](https://github.com/lukeed/clsx) & [class-variance-authority](https://cva.style/) - Dynamic CSS

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── health/              # Health check endpoint
│   │   └── invoices/            # Invoice API routes
│   ├── invoices/                # Invoice pages
│   ├── settings/                # Settings page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── common/                  # Shared components (Button, Card, etc.)
│   └── layout/                  # Layout components (Header, Footer, etc.)
├── features/                     # Feature-driven modules
│   ├── invoices/                # Invoices feature
│   │   ├── components/          # Feature components
│   │   ├── hooks/               # Custom hooks
│   │   ├── services/            # Business logic
│   │   └── types/               # TypeScript types
│   └── settings/                # Settings feature
├── lib/                          # Library utilities
├── utils/                        # Utility functions
├── hooks/                        # Shared custom hooks
├── types/                        # Shared TypeScript types
├── constants/                    # Application constants
└── styles/                       # Additional stylesheets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository** (or create from this template)
   ```bash
   git clone <repository-url>
   cd gst-invoice-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_APP_NAME="GST Invoice Generator"
   NEXT_PUBLIC_API_URL="http://localhost:3000/api"
   NODE_ENV="development"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint and fix issues
npm run lint

# Format code with Prettier
npm run format

# Type check
npm run type-check
```

## 🏗️ Architecture

### Feature-Driven Architecture

The project follows a feature-driven architecture where each feature is self-contained with:
- **Components**: UI components specific to the feature
- **Types**: TypeScript type definitions
- **Services**: Business logic and utilities
- **Hooks**: Custom React hooks for state management

### API Routes

- `GET /api/health` - Health check
- `GET /api/invoices` - List all invoices
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices/[id]` - Get invoice details
- `PUT /api/invoices/[id]` - Update invoice
- `DELETE /api/invoices/[id]` - Delete invoice

## 🌙 Dark Mode

The application includes full dark mode support:
- Automatic theme detection based on system preferences
- Manual theme toggle via UI
- Smooth transitions between themes
- Persistent theme preference in localStorage

### Theme Variables

CSS variables are defined in `src/app/globals.css` for:
- `--background`: Background color
- `--foreground`: Text color
- `--primary`: Primary button/accent color
- `--card`: Card background
- And more (see `globals.css` for complete list)

## 🔧 Configuration

### Environment Variables

Key environment variables:
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_API_URL` - API base URL
- `NEXT_PUBLIC_API_TIMEOUT` - API timeout in milliseconds
- `NEXT_PUBLIC_ENABLE_DARK_MODE` - Enable dark mode feature
- `NODE_ENV` - Environment (development/production)

See `.env.example` for all available options.

### Tailwind CSS

Tailwind configuration is in `tailwind.config.ts` with:
- Dark mode support via `class` mode
- Custom color scheme
- Extended utilities
- Responsive design utilities

## 📱 Components

### Common Components

- **Button**: Versatile button with multiple variants (default, destructive, outline, ghost, link)
- **Card**: Container component with header, title, description, content, and footer
- **Header**: Sticky navigation header with mobile menu
- **Footer**: Footer with links and copyright
- **ThemeToggle**: Light/dark mode toggle button

### Layout Components

- **ThemeProvider**: Next-themes provider for theme management
- **Header**: Main navigation component
- **Footer**: Application footer

## 🔌 API Integration

The application includes a mock API layer. To integrate with a real backend:

1. Update API endpoints in `src/app/api/`
2. Modify services in `src/features/*/services/`
3. Update environment variables in `.env.local`

Example API call:
```typescript
const response = await fetch('/api/invoices', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
const data = await response.json();
```

## 📊 GST Calculation

The application includes utilities for GST calculations:

```typescript
import { calculateGSTDetails } from '@/features/invoices/services/invoiceCalculations';

const lineItems = [
  { id: '1', description: 'Service', quantity: 1, unitPrice: 1000, taxRate: 18 }
];

const { subtotal, tax, grandTotal } = calculateGSTDetails(lineItems);
```

## 🎨 Customization

### Colors

Modify `tailwind.config.ts` to customize colors:
```typescript
colors: {
  primary: 'hsl(var(--primary))',
  // ... other colors
}
```

### Fonts

Update `src/app/layout.tsx` to add custom fonts:
```typescript
const customFont = Poppins({
  variable: '--font-custom',
  subsets: ['latin'],
});
```

### Components

Create new components in `src/components/` following the existing pattern:
```typescript
export function MyComponent() {
  return <div>Component</div>;
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npm run build
# Push to GitHub and connect to Vercel
```

### Docker

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- AWS Amplify
- Google Cloud Run
- Azure App Service
- Railway
- Fly.io
- Self-hosted VPS

## 📖 Documentation

### API Documentation
Visit [http://localhost:3000/api](http://localhost:3000/api) for interactive API documentation.

### Next.js Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Dependencies Issues
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Run type check
npm run type-check
```

## 📝 Best Practices

1. **Always use TypeScript** - Leverage type safety
2. **Follow the folder structure** - Organize features logically
3. **Use component composition** - Break UI into reusable pieces
4. **Environmental variables** - Never hardcode sensitive data
5. **Error handling** - Implement proper try-catch and error boundaries
6. **Performance** - Use Next.js Image optimization and code splitting
7. **Testing** - Add unit and integration tests (setup pending)
8. **Documentation** - Keep code documented and updated

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙌 Support

For support, email support@gstinvoicegenerator.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication
- [ ] Email notifications
- [ ] PDF invoice generation
- [ ] Bulk invoice import/export
- [ ] Payment gateway integration
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] Internationalization (i18n)
- [ ] Automated testing suite

---

**Built with ❤️ using Next.js and TypeScript**
