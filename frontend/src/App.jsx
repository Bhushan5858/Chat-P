import React, { useState } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [user, setUser] = useState(localStorage.getItem("username") || null);

  return (
    <div>
      {user ? (
        <Chat username={user} onLogout={() => setUser(null)} />
      ) : (
        <Login onLogin={(username) => setUser(username)} />
      )}
    </div>
  );
}

export default App;
