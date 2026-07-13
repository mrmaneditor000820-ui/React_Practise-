// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, onAuthStateChanged } from "../firebasecode/Firebase";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecked(true);
    });
    return () => unsubscribe();
  }, []);

 if (!checked) return <p>Loading...</p>;

if (!user) {
  return <Navigate to="/login" replace />;
}

return children;

}

export default ProtectedRoute;