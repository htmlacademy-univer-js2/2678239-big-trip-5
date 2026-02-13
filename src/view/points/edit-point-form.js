import {humanizeFullDate} from '../../utils/time.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {createDestinationSectionTemplate} from './sections/destination-section.js';
import {createOffersSectionTemplate} from './sections/offers-section.js';


function createFormContainerTemplate(point) {
  const {type, basePrice, date, destination, offers, pointTypeOffers} = point;
  const offersSection = createOffersSectionTemplate(offers, pointTypeOffers);
  const destinationSection = createDestinationSectionTemplate(destination.description, destination.photos);
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeFullDate(date.start)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeFullDate(date.end)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">

          ${offersSection}
          ${destinationSection}

        </section>
      </form>
    </li>`
  );
}

export default class EditPointForm extends AbstractStatefulView {
  #handleSubmit = null;
  #handleCloseBtnClick = null;
  #handleTypeChange = null;
  #handleDestinationChange = null;
  #handleOfferChange = null;


  constructor({point, onSubmit, onCloseBtnClick, onTypeChange, onDestinationChange, onOfferChange}) {
    super();
    this._setState(EditPointForm.parsePointToState(point, onTypeChange));
    this.#handleTypeChange = onTypeChange;
    this.#handleSubmit = onSubmit;
    this.#handleCloseBtnClick = onCloseBtnClick;
    this.#handleDestinationChange = onDestinationChange;
    this.#handleOfferChange = onOfferChange;
    this._restoreHandlers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(EditPointForm.parseStateToPoint(this._state));
  };

  get template() {
    return createFormContainerTemplate(this._state);
  }

  static parsePointToState(point, handleTypeChange) {
    return {...point,
      pointTypeOffers: handleTypeChange(point.type),
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point.pointTypeOffers;
    return point;
  }

  #changeDestinationHandler = (evt) => {
    let newDestination = this.#handleDestinationChange(evt.target.value);
    if (!newDestination) {
      newDestination = {
        city: evt.target.value,
        description: null,
        photos: null,
      };
    }
    this.updateElement({
      destination: newDestination,
    });
  };

  #changeTypeHandler = (evt) => {
    const type = evt.target.value;
    this.updateElement({
      type,
      offers: [],
      pointTypeOffers: this.#handleTypeChange(type),
    });
  };

  #changeOfferHandler = (evt) => {
    const id = Number(evt.target.dataset.offerId);
    const updOffers = this.#handleOfferChange(this._state.offers, id, this._state.type);
    this._setState({
      offers: updOffers,
    });
  };

  _restoreHandlers() {
    if (!this._state.pointTypeOffers || this._state.pointTypeOffers.length !== 0) {
      this.element.querySelectorAll('.event__offer-checkbox')
        .forEach((elem) => elem.addEventListener('change', this.#changeOfferHandler));
    }
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleCloseBtnClick);
  }
}
