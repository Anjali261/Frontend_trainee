


import { ADD_WIDGET, REMOVE_WIDGET, RESET_WIDGETS } from './action';
import { loadState, saveState } from './localStorage'; 

const initialState = loadState() || {
  categories: [
    {
      id: '1',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: '1', name: 'Cloud Accounts', text: 'This is Widget 1' },
        { id: '2', name: 'Cloud Account Risk Assessment', text: 'This is Widget 2' }
      ]
    },
    {
      id: '2',
      name: 'CWPP Dashboard',
      widgets: [
        { id: '3', name: 'Top 5 Namespace specific Alerts', text: 'This is Widget 3' },
        { id: '4', name: 'WorkLoad Alerts', text: 'This is Widget 4' }
      ]
    },
    {
      id: '3',
      name: 'Registry Scan',
      widgets: [
        { id: '5', name: 'Image Risk Assessment', text: 'This is Widget 5' },
        { id: '6', name: 'Image Security Issues', text: 'This is Widget 6' }
      ]
    }
  ]
};

const widgetReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_WIDGET: {
      const { categoryId, widget } = action.payload;
      newState = {
        ...state,
        categories: state.categories.map((category) =>
          category.id === categoryId
            ? { ...category, widgets: [...category.widgets, widget] }
            : category
        ),
      };
      console.log('Adding widget:', widget);
      console.log('New State after ADD_WIDGET:', newState);
      saveState(newState);
      return newState;
    }
    case REMOVE_WIDGET: {
      const { categoryId, widgetId } = action.payload;
      newState = {
        ...state,
        categories: state.categories.map((category) =>
          category.id === categoryId
            ? { ...category, widgets: category.widgets.filter((widget) => widget.id !== widgetId) }
            : category
        ),
      };
      console.log('Removing widget with ID:', widgetId);
      console.log('New State after REMOVE_WIDGET:', newState);
      saveState(newState);
      return newState;
    }
    case RESET_WIDGETS:
      newState = initialState;
      console.log('Resetting widgets to initial state');
      console.log('New State after RESET_WIDGETS:', newState);
      saveState(newState);
      return newState;
    default:
      return state;
  }
};

export default widgetReducer;
