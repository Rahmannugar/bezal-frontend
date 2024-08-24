import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the post interface based on the Mongoose schema
interface Post {
  _id: string;
  userId: string;
  userName: string;
  postMessage: string;
  picturePath: string[];
  userPicturePath?: string;
  views: string;
  isPublic: boolean;
  likes: Record<string, boolean>;
  dislikes: Record<string, boolean>;
  comments: string[];
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

// Define the initial state
export interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // Add a new post
    createPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
    },

    // Update an existing post
    updatePost(state, action: PayloadAction<Post>) {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      if (index !== -1) {
        state.posts[index] = {
          ...action.payload,
          isEdited: true,
        };
      }
    },
    // Delete a post
    deletePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    // Like a post
    likePost(state, action: PayloadAction<{ postId: string; userId: string }>) {
      const { postId, userId } = action.payload;
      const post = state.posts.find((p) => p._id === postId);
      if (post) {
        if (post.likes[userId]) {
          delete post.likes[userId];
        } else {
          post.likes[userId] = true;
        }
      }
    },
    // Dislike a post
    dislikePost(
      state,
      action: PayloadAction<{ postId: string; userId: string }>
    ) {
      const { postId, userId } = action.payload;
      const post = state.posts.find((p) => p._id === postId);
      if (post) {
        if (post.dislikes[userId]) {
          delete post.dislikes[userId];
        } else {
          post.dislikes[userId] = true;
        }
      }
    },
    // Add a comment to a post
    addComment(
      state,
      action: PayloadAction<{ postId: string; comment: string }>
    ) {
      const { postId, comment } = action.payload;
      const post = state.posts.find((p) => p._id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
  },
});

export const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  addComment,
} = postSlice.actions;

export default postSlice.reducer;
