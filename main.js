/**
 * @description Paginator package.
 */
export default class Paginator {
  #currentPage;
  #pages;
  #perPage;
  #zeroBased;

  /**
   * @description This is the constructor of the Paginator class.
   * @param {Object} param The options object.
   * @returns {Paginator} It will return a new instance of the Paginator class.
   * @example
   * import Paginator from "paginix";
   * const helper = new Paginator({
   *  perPage: 5,
   *  pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
   *  zeroBased: false,
   * });
   */
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

  /**
   * @description It will go forward to as far as the count that you specified.
   * @param {Number} count The count that how many pages you want to go forward. (as default it is 1)
   * @returns {Array|Number} It will return the current page or -1 if it is not found.
   */
  next(count = 1) {
    if (count === 1 && this.checkPlace() === "end") {
      this.#currentPage = this.firstPageIndex;
      return this.get(this.#currentPage);
    }
    if (this.get(this.#currentPage + count) === -1) return -1;
    this.#currentPage += count;
    return this.get(this.#currentPage);
  }

  /**
   * @description It will go back as far as the count that you specified.
   * @param {Number} count The count that how many pages you want to go back. (as default it is 1)
   * @returns {Array|Number} It will return the current page or -1 if it is not found.
   */
  previous(count = 1) {
    if (count === 1 && this.checkPlace() === "start") {
      this.#currentPage = this.lastPageIndex;
      return this.get(this.#currentPage);
    }
    if (this.get(this.#currentPage - count) === -1) return -1;
    this.#currentPage -= count;
    return this.get(this.#currentPage);
  }

  /**
   * @description It will go to the page that you specified.
   * @param {Number} index The index of the page that you want to go.
   * @returns {Array|Number} It will return the current page or -1 if it is not found.
   */
  go(index) {
    if (this.get(index) === -1) return -1;
    this.#currentPage = index;
    return this.get(this.#currentPage);
  }

  /**
   * @description It will return the page that you specified but It will not set the current page as this index parameter.
   * @param {Number} index The index of the page that you want to get.
   * @returns {Array|Number} It will return the page that you specified or -1 if it is not found.
   */
  get(index) {
    const based = this._checkBased(index);
    const start = based * this.#perPage;
    const end = (based + 1) * this.#perPage;
    const page = this.#pages.slice(start, end);
    return page.length ? page : -1;
  }

  /**
   * @description This method will return the place of the current page.
   * @returns {String} It will return the place of the current page (either start, middle or end).
   */
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

  /**
   * @description This method will return true or false based on the element that you specified is in the current page or not.
   * @param {*} el The element that you want to check if it is in the page or not.
   * @param {Number} pageNumber The page number that you want to check if the element is in it or not.
   * @returns
   */
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

  /**
   * @returns {Array} It will return the last page.
   */
  get lastPage() {
    return this.get(this.lastPageIndex);
  }

  /**
   * @returns {Number} It will return the last page's index.
   */
  get lastPageIndex() {
    return this.isZeroBased ? this.pagesCount - 1 : this.pagesCount;
  }

  /**
   * @returns {Array} It will return the first page.
   */
  get firstPage() {
    return this.get(this.firstPageIndex);
  }

  /**
   * @returns {Number} It will return the first page's index.
   */
  get firstPageIndex() {
    return this.isZeroBased ? 0 : 1;
  }

  /**
   * @returns {Array} It will return all pages.
   */
  get pages() {
    return this.#pages;
  }

  /**
   * @returns {Number} It will return the count of all pages.
   */
  get pagesCount() {
    return this.pages.length % this.#perPage
      ? Math.trunc(this.pages.length / this.#perPage) + 1
      : this.pages.length / this.#perPage;
  }

  /**
   * @returns {Array} It will return the current page.
   */
  get currentPage() {
    return this.get(this.#currentPage);
  }

  /**
   * @returns {Number} It will return the current page's index.
   */
  get currentPageIndex() {
    return this.#currentPage;
  }

  /**
   * @returns {Number} It will return the number of items per page.
   */
  get itemsPerPage() {
    return this.#perPage;
  }

  /**
   * @returns {Boolean} It will return a boolean which depends on the zero based option.
   */
  get isZeroBased() {
    return this.#zeroBased;
  }
}
