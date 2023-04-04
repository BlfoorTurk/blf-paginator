export default class Paginator {
  #currentPage = 0;
  #pages;
  #perPage;
  #maxVls = [0];

  static #err(name, msg) {
    const err = new Error(msg);
    err.name = name;
    return err;
  }

  constructor({ pages, perPage = 3 }) {
    if (!pages || !Array.isArray(pages) || !pages?.length)
      throw this.constructor.#err(
        'PagesError',
        'Pages must be an array and not empty.'
      );

    if (perPage < 0 || typeof perPage !== 'number')
      throw this.constructor.#err(
        'PerPageError',
        'The number which is per page must be greater or equal than 0 and a number.'
      );

    this.#pages = pages;
    this.#perPage = perPage;
    this.#maxVls.push(pages.length - 1);
  }

  next(count = 1) {
    if (this.get(this.#currentPage + count) === -1) return -1;
    this.#currentPage += count;
    return this.get(this.#currentPage);
  }

  previous(count = 1) {
    if (this.get(this.#currentPage - count) === -1) return -1;
    this.#currentPage -= count;
    return this.get(this.#currentPage);
  }

  go(index) {
    if (this.get(index) === -1) return -1;
    this.#currentPage = index;
    return this.get(this.#currentPage);
  }

  get(index) {
    const start = index * this.#perPage;
    const end = (index + 1) * this.#perPage;
    const page = this.#pages.slice(start, end);
    return page.length ? page : -1;
  }

  get pages() {
    return this.#pages;
  }

  get currentPage() {
    return this.get(this.#currentPage);
  }

  get currentPageIndex() {
    return this.#currentPage;
  }

  get itemsPerPage() {
    return this.#perPage;
  }
}
