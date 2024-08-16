export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('widgetState');
        if (serializedState === null) return undefined;
        const state = JSON.parse(serializedState);
        console.log('Loaded state from localStorage:', state);
        return state;
    } catch (err) {
        console.error('Could not load state', err);
        return undefined;
    }
};
  
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('widgetState', serializedState);
        console.log('Saved state to localStorage:', state);
    } catch (err) {
        console.error('Could not save state', err);
    }
};
