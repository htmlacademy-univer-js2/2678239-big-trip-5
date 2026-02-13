import PointItem from '../view/points/point-item.js';
import EditPointForm from '../view/points/edit-point-form.js';
import {remove, render, replace} from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #model = null;
  #point = null;

  #eventListContainerHTML = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor(model, eventListContainerHTML, onDataChange, onModeChange) {
    this.#model = model;
    this.#eventListContainerHTML = eventListContainerHTML;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;
    this.#pointComponent = new PointItem(point, this.#onEditClick, this.#onFavouriteClick);
    this.#pointEditComponent = new EditPointForm({
      point,
      onSubmit: this.#onSubmitCLick,
      onCloseBtnClick: this.#onFormCloseClick,
      onTypeChange: this.#onTypeChange,
      onDestinationChange: this.#onDestinationChange,
      onOfferChange: this.#onOfferChange,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventListContainerHTML);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #onTypeChange = (type) => this.#model.getOffersByType(type);

  #onDestinationChange = (cityName) => this.#model.getDestinationByCityName(cityName);

  #onOfferChange = (offers, selectedId, type) => {
    const updatedOffer = this.#model.getOffersByIds([selectedId], type)[0];
    return offers.map((o) => o.id).includes(selectedId)
      ? offers.filter((o) => o.id !== selectedId)
      : [...offers, updatedOffer];
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #onFavouriteClick = () => {
    this.#handleDataChange({...this.#point, isFavourite: !this.#point.isFavourite});
  };

  #onSubmitCLick = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToCard();
  };

  #onFormCloseClick = () => {
    this.#replaceFormToCard();
  };

  #onEditClick = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#onEscKeydown);
  };

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.DEFAULT;
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };
}
