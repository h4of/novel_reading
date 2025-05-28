import { useState, useEffect } from "react";

export default function useRole() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user.role);
  }, []);

  return role;
}