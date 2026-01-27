export default class Model {
  constructor(mockData) {
    this.offers = mockData.offers;
    this.destinations = mockData.destinations;
    this.points = mockData.points;
  }

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
