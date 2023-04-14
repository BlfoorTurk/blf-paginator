export default class Paginator {
  #currentPage;
  #pages;
  #perPage;
  #zeroBased;

  constructor({ pages, perPage = 3, zeroBased = true }) {
    if (!pages || !Array.isArray(pages) || !pages?.length)
      throw this._err("PagesError", "Pages must be an array and not empty.");

    if (perPage < 0 || typeof perPage !== "number")
      throw this._err(
        "PerPageError",
        "The number which is per page must be greater or equal than 0 and a number."
      );

    if (typeof zeroBased !== "boolean")
      throw this._err("ZeroBasedError", "Zero based must be a boolean.");

    this.#pages = pages;
    this.#perPage = perPage;
    this.#zeroBased = zeroBased;
    this.#currentPage = this.firstPageIndex;
  }

  next(count = 1) {
    if (count === 1 && this.checkPlace() === "end") {
      this.#currentPage = this.firstPageIndex;
      return this.get(this.#currentPage);
    }
    if (this.get(this.#currentPage + count) === -1) return -1;
    this.#currentPage += count;
    return this.get(this.#currentPage);
  }

  previous(count = 1) {
    if (count === 1 && this.checkPlace() === "start") {
      this.#currentPage = this.lastPageIndex;
      return this.get(this.#currentPage);
    }
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
    const based = this._checkBased(index);
    const start = based * this.#perPage;
    const end = (based + 1) * this.#perPage;
    const page = this.#pages.slice(start, end);
    return page.length ? page : -1;
  }

  checkPlace() {
    if (
      !this.currentPageIndex ||
      (!this.isZeroBased && this.currentPageIndex === 1)
    )
      return "start";
    if (
      (this.isZeroBased ? this.currentPageIndex + 1 : this.currentPageIndex) ===
      this.pagesCount
    )
      return "end";
    return "middle";
  }

  has(el, pageNumber = this.currentPageIndex) {
    if ((el ?? false) === false) return -1;
    return this.get(pageNumber).includes(el);
  }

  _err(name, msg) {
    const err = new Error(msg);
    err.name = name;
    return err;
  }

  _checkBased(number) {
    return this.isZeroBased ? number : number - 1;
  }

  get lastPage() {
    return this.get(this.lastPageIndex);
  }

  get lastPageIndex() {
    return this.isZeroBased ? this.pagesCount - 1 : this.pagesCount;
  }

  get firstPage() {
    return this.get(this.firstPageIndex);
  }

  get firstPageIndex() {
    return this.isZeroBased ? 0 : 1;
  }

  get pages() {
    return this.#pages;
  }

  get pagesCount() {
    return this.pages.length % this.#perPage
      ? Math.trunc(this.pages.length / this.#perPage) + 1
      : this.pages.length / this.#perPage;
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

  get isZeroBased() {
    return this.#zeroBased;
  }
}
