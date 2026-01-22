import {createElement, render, RenderPosition} from '../../render.js';
import PointItem from './PointItem.js';

const DEFAULT_POINTS = [{
  title: 'Check-in Chamonix',
  price: 600,
  date: 'MAR 18',
  datetime: '2025-03-18',
  isFavorite: true
},
{
  title: 'Sightseeing Geneva',
  price: 180,
  date: 'MAR 18',
  datetime: '2025-03-18',
  isFavorite: false
},
{
  title: 'Flight Chamonix',
  price: 160,
  date: 'MAR 18',
  datetime: '2025-03-18',
  isFavorite: false
}
];

function createFilterContainerTemplate() {
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
}

export default class PointList {
  constructor(points = DEFAULT_POINTS) {
    this.points = points;
  }

  getTemplate() {
    return createFilterContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.points.reverse().forEach((point) => {
        const pointItem = new PointItem(point.title, point.price, point.date, point.datetime, point.isFavorite);
        render(
          pointItem,
          this.element,
          RenderPosition.AFTERBEGIN
        );
      });
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
