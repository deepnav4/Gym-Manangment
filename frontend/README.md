# 🏋️ Gym Management System - Frontend

A basic functional frontend to test all backend API endpoints.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start backend server (in another terminal):**
   ```bash
   cd ../backend
   npm run dev
   ```
   Backend should run at: `http://localhost:3000`

3. **Start frontend:**
   ```bash
   npm run dev
   ```
   Frontend will run at: `http://localhost:5173`

## 🧪 Testing Features

### Member Features
- Signup - Create a new member account
- Login - Login with member credentials
- View Profile, Workout Plans, Diet Plans, Attendance, Progress

### Trainer Features
**Login with:** john.trainer@gym.com / trainer123

- Get All Members
- Update Workout Plan
- Update Diet Plan
- Record Attendance
- Update Progress

## 📝 Quick Test Flow

1. **Create Member:** Signup as a member, copy the member_id from response
2. **Test Member:** Click all member buttons to test features
3. **Login as Trainer:** Use john.trainer@gym.com / trainer123
4. **Manage Member:** Use the copied member_id to update workout, diet, attendance, progress
5. **Verify:** Login back as member to see the changes

## 💡 Features

✅ All 13 API endpoints working  
✅ JWT authentication  
✅ Real-time response display  
✅ Tailwind CSS styling  

---

**API URL:** http://localhost:3000/api  
**Frontend URL:** http://localhost:5173

---

# Original Vite Template Info

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
