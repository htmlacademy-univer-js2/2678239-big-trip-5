import {createElement, render} from '../../framework/render.js';
import SortingItem from './sorting-item.js';
import AbstractView from '../../framework/view/abstract-view.js';

const DEFAULT_SORTING_OPTIONS = [
  { title: 'day', disabled: false, checked: false },
  { title: 'event', disabled: true, checked: false },
  { title: 'time', disabled: false, checked: false },
  { title: 'price', disabled: false, checked: true },
  { title: 'offer', disabled: true, checked: false }
];

function createSortContainerTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    </form>`
  );
}


export default class SortingList extends AbstractView {
  #element = null;
  constructor(sortingOptions = DEFAULT_SORTING_OPTIONS) {
    super();
    this.sortingOptions = sortingOptions;
  }

  getTemplate() {
    return createSortContainerTemplate();
  }

  createSortingItems() {
    return this.sortingOptions.map((option) =>
      new SortingItem(option.title, option.disabled, option.checked)
    );
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
      this.createSortingItems().forEach((sortingItem) => {
        render(sortingItem, this.element);
      });
    }

    return this.#element;
  }
}
