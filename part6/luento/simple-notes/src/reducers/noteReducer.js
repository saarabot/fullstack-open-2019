const initialState = [
        {
            content: 'the app state is in redux store',
            important: true,
            id: 1
        },
        {
            content: 'state changes are made with actions',
            important: false,
            id: 2
        }
];

const noteReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_NOTE':
            return [...state, action.data];
        case 'TOGGLE_IMPORTANCE':
            const id = action.data.id;
            const noteToChange = state.find(n => n.id === id);
            const changeNote = {
                ...noteToChange,
                important: !noteToChange.important
            };
            return state.map(note => 
                note.id !== id ? note : changeNote
            )
        default:
            return state;
    }
};
const generateId = () => {
    Number((Math.random() * 100000).toFixed(0));
  };

export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        data: {
        content,
        important: false,
        id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        data: { id }
    }
}

export default noteReducer;