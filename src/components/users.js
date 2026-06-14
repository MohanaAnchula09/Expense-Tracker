import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/usersSlice";

const Users = () => {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const {users, loading, error} = useSelector(
        (state) => state.users
    );

    const handleRefresh = () => {
        dispatch(fetchUsers());
    }
    useEffect(()=>{
        dispatch(fetchUsers());
    },[dispatch]);
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(
          searchText.toLowerCase()
        )
      );
    return(
        <div>
            <h1>Redux Users</h1>
            <input
            type="text"
            placeholder="Search user"
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
            />
            <button type="button" onClick={handleRefresh}>Refresh</button>
            {loading && <p>Loading Users...</p>}
            <p>Total Users:{filteredUsers.length}</p>
            {error && <p>{error}</p>}
            {filteredUsers.map((user) => {
            return (
                <div key={user.id}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                </div>
            );
            })}
        </div>
    )
}
export default Users;