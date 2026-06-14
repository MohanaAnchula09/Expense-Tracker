import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./redux/postsSlice";

const Posts = () => {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const {posts, loading, error} = useSelector(
        (state) => state.posts
    );

    const handleRefresh = () => {
        setSearchText("");
        dispatch(fetchPosts());
      };
    useEffect(()=>{
        dispatch(fetchPosts());
    },[dispatch]);
    const filteredPosts = posts.filter((post) =>
        post.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        post.body?.toLowerCase().includes(searchText.toLowerCase())
      );
    return(
        <div>
            <h1>Redux Posts</h1>
            <input
            type="text"
            placeholder="Search Post"
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
            />
            <button type="button" onClick={handleRefresh}>
            Refresh
            </button>

            <p>Total Posts: {posts.length}</p>
            <p>Showing Posts: {filteredPosts.length}</p>
            {loading && <p>Loading Posts...</p>}
            {error && <p>{error}</p>}
            {filteredPosts.map((post) => (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
            ))}
        </div>
    )
}
export default Posts;