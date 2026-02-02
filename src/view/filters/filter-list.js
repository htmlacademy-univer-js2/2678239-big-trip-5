import {createElement, render} from '../../framework/render.js';
import FilterItem from './filter-item.js';
import AbstractView from '../../framework/view/abstract-view.js';
import {DEFAULT_FILTERS} from '../../const';

function createFilterContainerTemplate() {
  return (
    `<form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterList extends AbstractView {
  #element = null;
  constructor(filters = DEFAULT_FILTERS) {
    super();
    this.filters = filters;
  }

  get template() {
    return createFilterContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      this.filters.forEach((filterTitle) => {
        render(
          new FilterItem(filterTitle),
          this.#element);
      });
    }
    return this.#element;
  }
}
