import {render} from '../render.js';
import SortingList from '../view/sort/sorting-list.js';
import EditPointForm from '../view/points/edit-point-form.js';
import CreatePointForm from '../view/points/point-creator/create-point-form.js';
import FilterList from '../view/filters/filter-list.js';
import EventListContainer from '../view/event-list-container.js';
import PointItem from '../view/points/point-item.js';
import {getRandomArrayElement} from '../utils.js';

export default class Presenter {
  constructor(model) {
    this.model = model;
    this.eventsContainer = document.querySelector('.trip-events');
    this.filtersContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    const offers = this.model.getOffers();
    const destinations = this.model.getDestinations();
    const points = this.model.getPoints();
    const eventListContainer = new EventListContainer();
    render(new FilterList(), this.filtersContainer);
    render(new SortingList(), this.eventsContainer);
    render(eventListContainer, this.eventsContainer);

    const editingPoint = getRandomArrayElement(points);
    const editingPointDestination = destinations.find((d) => d.id === editingPoint.destination);
    const pointTypeOffers = offers.find((offer) => offer.type === editingPoint.type);
    render(new EditPointForm({...editingPoint, destination: editingPointDestination}, pointTypeOffers.offers), eventListContainer.getElement());

    points.forEach((point) => {
      const pointTypeOffer = offers.find((offer) => offer.type === point.type);
      const destination = destinations.find((d) => d.id === point.destination);
      const pointOffers = pointTypeOffer.offers.filter((offer) => point.offers.includes(offer.id));
      const pointItem = new PointItem({...point, offers: pointOffers, destination: destination});
      render(
        pointItem,
        eventListContainer.getElement());
    });
    render(new CreatePointForm(), eventListContainer.getElement());
  }
}
