 import {createSlice} from "@reduxjs/toolkit";

 const initialState= {
    mode: "dark",
    user: null,
    token: null,
    posts: [],
 };


 export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state, action) => {
            console.log('hello');
            state.mode = state.mode === "dark" ? "light" : "dark";
        },

        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;

        },

        setLogout: (state, action) => {
            console.log("hehngnbf")
            state.user = null;
            state.token = null;
        },

        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.error("user friends non- existant :(")
            }
        },

        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },

        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post.id === action.payload.post._id) return action.payload.post;
                return post;
            })
            state.posts = updatedPosts;
        }
    }
 })

 export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
 export default authSlice.reducer;