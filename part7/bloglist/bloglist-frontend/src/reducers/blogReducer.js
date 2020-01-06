import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
        return action.data
    case 'CREATE_BLOG':
        return [...state]
    case 'LIKE_BLOG':
        return [...state]
    case 'DELETE_BLOG':
        return [...state]
    default:
      return state;
  }
}

export const initBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    }
  };
export const addBlog = (data) => {
    return async dispatch => {
        dispatch({
            type: 'ADD_BLOG',
            message: data,
        })
    }
};

export const likeBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.addLike(blog)
        console.log(response)
        dispatch({
            type: 'LIKE_BLOG',
        })
  }
};

export const deleteBlog = (id) => {
    return async dispatch => {
        const response = await blogService.remove(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: response
        })
  }
};

export const createBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.create(blog)
        console.log(response)
        dispatch({
            type: 'CREATE_BLOG',
            data: response
        })
  }
};

export default reducer