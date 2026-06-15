import { useState, useEffect } from "react";
import { useGetPostsQuery, useAddPostMutation, useDeletePostMutation, useUpdatePostMutation } from "../redux/api/usersApi";

function PostsRTK() {
  const { data: postsData, isLoading, error, refetch } = useGetPostsQuery();

  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [addPost, { isLoading: isAdding, data: addedPost }] =
      useAddPostMutation();

  const [deletePost] = useDeletePostMutation();
    const [updatePost] = useUpdatePostMutation();

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
    }
  }, [postsData]);

  const handleRefresh = () => {
    setSearchText("");
    refetch();
  };

  const handleAddPost = async () => {
    const result = await addPost({
      title: "Add Title",
      body: "fgdjhdjfhsdjhdgsddjdsjsdhdgdjdgdsdgjsdgdkdkjlu",
    }).unwrap();

    setPosts((prev) => [result, ...prev]);
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id).unwrap();
  
      setPosts((prev) =>
        prev.filter((post) => post.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id) => {
    const updatedPost = await updatePost({
      id,
      title: "Updated Post",
      body: "dfsdfdfdgdggrtryrieoioweoqiudnmzxbcnmxbcxcbajshduyeuwe",
    }).unwrap();
  
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      )
    );
  };
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchText.toLowerCase()) ||
    post.body.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h1>RTK Query Posts</h1>

      <input
        type="text"
        placeholder="Search Post"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
     <button type="button" onClick={handleAddPost}>
        {isAdding ? "Adding..." : "Add Post"}
      </button>
      <button type="button" onClick={handleRefresh}>
        Refresh Posts
      </button>

      {isLoading && <p>Loading Posts...</p>}

      {error && <p>Something went wrong</p>}

      <p>Total Posts: {posts.length}</p>
      <p>Showing Posts: {filteredPosts.length}</p>

      {filteredPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button type="button" onClick={() => handleUpdate(post.id)}>
            Update Post
          </button>
          <button type="button" onClick={() => handleDelete(post.id)}>
            Delete
          </button>
        </div>
      ))}

      {addedPost && (
        <div>
          <h3>Added Post Response:</h3>
          <p>{addedPost.title}</p>
          <p>{addedPost.body}</p>
        </div>
      )}
    </div>
  );
}

export default PostsRTK;