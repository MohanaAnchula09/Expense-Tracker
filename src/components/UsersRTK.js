import { useState, useEffect } from "react";
import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation
} from "../redux/api/usersApi";

function UsersRTK() {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [addUser, { isLoading: isAdding, data: addedUser }] =
    useAddUserMutation();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [localUsers, setLocalUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (users) {
      setLocalUsers(users);
    }
  }, [users]);

  const handleRefresh = () => {
    setSearchText("");
    refetch();
  };

  const handleAddUser = async () => {
    const result = await addUser({
      name: "Mohana",
      email: "mohana@example.com",
    }).unwrap();

    setLocalUsers((prev) => [result, ...prev]);
  };

  const handleDelete = async (id) => {
    await deleteUser(id).unwrap();

    setLocalUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );
  };

  const handleUpdate = async (id) => {
    const updatedUser = await updateUser({
      id,
      name: "Updated User",
      email: "updated@example.com",
    }).unwrap();
  
    setLocalUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const filteredUsers = localUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h1>RTK Query Users</h1>

      <input
        type="text"
        placeholder="Search User"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <button type="button" onClick={handleAddUser}>
        {isAdding ? "Adding..." : "Add User"}
      </button>

      <button type="button" onClick={handleRefresh}>
        Refresh Users
      </button>

      {isLoading && <p>Loading users...</p>}

      {error && <p>Something went wrong</p>}

      <p>Total Users: {localUsers.length}</p>
      <p>Showing Users: {filteredUsers.length}</p>

      {filteredUsers.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button type="button" onClick={() => handleUpdate(user.id)}>
            Update User
          </button>
          <button type="button" onClick={() => handleDelete(user.id)}>
            Delete
          </button>
        </div>
      ))}

      {addedUser && (
        <div>
          <h3>Added User Response:</h3>
          <p>{addedUser.name}</p>
          <p>{addedUser.email}</p>
        </div>
      )}
    </div>
  );
}

export default UsersRTK;