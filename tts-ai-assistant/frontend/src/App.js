// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext.js';
// import Login from './components/Auth/Login.js';
// import Register from './components/Auth/Register.js';
// import Dashboard from './components/Dashboard/Dashboard.js';
// import ChatInterface from './components/Chat/ChatInterface.js';
// import Documents from './components/Documents/Documents.js';
// import './styles/Global.css';

// function ProtectedRoute({ children }) {
//   const { user } = useAuth();
//   return user ? children : React.createElement(Navigate, { to: "/login" });
// }

// function App() {
//   return React.createElement(AuthProvider, null,
//     React.createElement(Router, null,
//       React.createElement('div', { className: 'App' },
//         React.createElement(Routes, null,
//           React.createElement(Route, { 
//             path: "/login", 
//             element: React.createElement(Login) 
//           }),
//           React.createElement(Route, { 
//             path: "/register", 
//             element: React.createElement(Register) 
//           }),
//           React.createElement(Route, { 
//             path: "/", 
//             element: React.createElement(ProtectedRoute, null,
//               React.createElement(Dashboard)
//             ),
//             children: [
//               React.createElement(Route, { 
//                 index: true, 
//                 element: React.createElement(ChatInterface) 
//               }),
//               React.createElement(Route, { 
//                 path: "documents", 
//                 element: React.createElement(Documents) 
//               })
//             ]
//           })
//         )
//       )
//     )
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.js';
import Login from './components/Auth/Login.js';
import Register from './components/Auth/Register.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import ChatInterface from './components/Chat/ChatInterface.js';
import Documents from './components/Documents/Documents.js';
import Users from './components/Users/Users.js';
import Profile from './components/Profile/Profile.js';
import './styles/Global.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : React.createElement(Navigate, { to: "/login" });
}

function App() {
  return React.createElement(AuthProvider, null,
    React.createElement(Router, null,
      React.createElement('div', { className: 'App' },
        React.createElement(Routes, null,
          React.createElement(Route, { 
            path: "/login", 
            element: React.createElement(Login) 
          }),
          React.createElement(Route, { 
            path: "/register", 
            element: React.createElement(Register) 
          }),
          React.createElement(Route, { 
            path: "/", 
            element: React.createElement(ProtectedRoute, null,
              React.createElement(Dashboard)
            ),
            children: [
              React.createElement(Route, { 
                index: true, 
                element: React.createElement('div', { className: 'home-page' },
                  React.createElement('h1', { className: 'welcome-title' }, 'Добро пожаловать в ТТС AI Ассистент'),
                  React.createElement('p', { className: 'welcome-subtitle' }, 'Выберите раздел в меню слева для начала работы')
                )
              }),
              React.createElement(Route, { 
                path: "chat", 
                element: React.createElement(ChatInterface) 
              }),
              React.createElement(Route, { 
                path: "documents", 
                element: React.createElement(Documents) 
              }),
              React.createElement(Route, { 
                path: "users", 
                element: React.createElement(Users) 
              }),
              React.createElement(Route, { 
                path: "profile", 
                element: React.createElement(Profile) 
              }),
              React.createElement(Route, { 
  path: "users", 
  element: React.createElement(Users) 
}),
React.createElement(Route, { 
  path: "profile", 
  element: React.createElement(Profile) 
})
            ]
          }),
          React.createElement(Route, { 
            path: "*", 
            element: React.createElement(Navigate, { to: "/" }) 
          })
        )
      )
    )
  );
}

export default App;