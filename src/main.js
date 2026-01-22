import Presenter from './presenter.js';
import {render} from './render.js';
import FilterList from './view/filters/FilterList.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

render(new FilterList(), filtersContainer);
const board = new Presenter(eventsContainer);
board.init();
