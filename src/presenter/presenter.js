import {render, replace} from '../framework/render.js';
import SortingList from '../view/sort/sorting-list.js';
import EditPointForm from '../view/points/edit-point-form.js';
import FilterList from '../view/filters/filter-list.js';
import EventListContainer from '../view/event-list-container.js';
import PointItem from '../view/points/point-item.js';

export default class Presenter {
  #eventListContainer = null;
  constructor(model) {
    this.model = model;
    this.eventsContainer = document.querySelector('.trip-events');
    this.filtersContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    const points = this.model.getPoints();
    this.#eventListContainer = new EventListContainer();
    render(new FilterList(), this.filtersContainer);
    render(new SortingList(), this.eventsContainer);
    render(this.#eventListContainer, this.eventsContainer);

    // const editingPoint = getRandomArrayElement(points);
    // const editingPointDestination = this.model.getDestinationById(editingPoint.destinationId);
    // const pointTypeOffers = this.model.getOffersByType(editingPoint.type);
    // render(new EditPointForm({...editingPoint, destination: editingPointDestination}, pointTypeOffers), eventListContainer.element);

    points.forEach((point) => {
      this.#renderPoint(point);
    });
    // render(new CreatePointForm(), eventListContainer.element);
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const destination = this.model.getDestinationById(point.destinationId);
    const pointTypeOffers = this.model.getOffersByType(point.type);
    const pointOffers = this.model.getOffersByType(point.type, point.offers);
    const combinedPoint = {...point, offers: pointOffers, destination: destination};

    const pointItem = new PointItem(combinedPoint, () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });
    const editPointForm = new EditPointForm(combinedPoint, pointTypeOffers, replaceFormToCard, replaceFormToCard);

    function replaceFormToCard() {
      replace(pointItem, editPointForm);
    }

    function replaceCardToForm() {
      replace(editPointForm, pointItem);
    }
    render(pointItem, this.#eventListContainer.element);
  }
}
