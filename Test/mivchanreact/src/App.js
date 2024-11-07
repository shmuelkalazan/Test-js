import React, { useEffect, useState } from "react";
import UserList from "./components/users/users";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      {users.length>0&&<UserList users={users} setUsers={setUsers}/>}
    </div>
  );
}

export default App;
