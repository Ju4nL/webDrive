# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


tu-proyecto-react/
│
├── src/
│   ├── components/       # Componentes reutilizables (Avatar, ButtonPagination, etc.)
│   ├── pages/            # Componentes de página específicos (Home, Dashboard, etc.)
│   ├── layouts/          # Plantillas comunes (Layout principal, Header, Footer, etc.)
│   ├── hooks/            # Hooks personalizados (useAuth, useDataFetcher, etc.)
│   ├── utilities/        # Funciones de utilidad y helpers
│   ├── services/         # Servicios para manejar la lógica de interacción con el backend
│   └── store/            # Estado global (Redux store, acciones, reducers, etc.)
│
├── public/
│   ├── index.html
│   └── ...
│
├── package.json
└── ...
