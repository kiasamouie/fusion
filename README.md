# Fusion - B2B Loyalty Dashboard

A modern B2B SaaS loyalty management dashboard built with **Refine**, **React**, **TypeScript**, and **Ant Design**.

## Features

- 🔐 Secure Authentication
- 📊 Dashboard with Key Metrics
- 💳 Loyalty Card Management
- 👥 Customer Management
- 🏷️ Stamp Management
- 💰 Wallet Management
- 🔍 Advanced Search & Filtering
- 📈 Sorting & Pagination
- 🎨 Modern UI Components
- 🌓 Light/Dark Theme Support
- 📱 Responsive Design

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Admin Framework**: Refine 4.x
- **Routing**: React Router v6
- **UI Library**: Ant Design 5.x
- **Build Tool**: Vite

## Prerequisites

- Node.js 16+ or npm 8+
- Git

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/kiasamouie/fusion.git
cd fusion
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Running the Project

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Production Build

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Features Overview

### Search & Filtering
- Real-time search across resources
- Column-level filtering
- Advanced sorting capabilities
- Smart pagination

### Resource Management
- Create, read, update, and delete resources
- Batch operations
- Status management
- Activity tracking

### User Interface
- Intuitive navigation
- Responsive design for all devices
- Accessible components
- Dark/Light theme support

## Getting Started

1. Clone and install the project (see Installation section)
2. Configure your environment variables
3. Run `npm run dev` to start development
4. Navigate to `http://localhost:5173/` in your browser
5. Log in with your credentials

## Contributing

For questions or support, please contact the development team.

## License

MIT
