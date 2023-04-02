export default class Paginator {
  #currentPage = 0;
  #pages = [];

  constructor({ pages, perPage = 3, addRestToLastPage = true }) {
    if (!pages || !Array.isArray(pages) || pages.length === 0)
      throw new Error("Pages must be an array and not empty.");

    if (perPage < 1 || typeof perPage !== "number")
      throw new Error(
        "The number which is per page must be greater than 0 and a number."
      );

    if (typeof addRestToLastPage !== "boolean")
      throw new Error("The addRestToLastPage must a boolean value.");

    const pagePiece = addRestToLastPage
      ? Math.trunc(pages.length / perPage)
      : pages.length % perPage
      ? pages.length / perPage + 1
      : pages.length / perPage;

    for (let i = 1; i <= pagePiece; i++) this.#pages.push([]);

    pages.forEach((el, i) => {
      const page = Math.trunc(i / perPage);
      this.#pages[page]?.push(el) ?? this.#pages.at(-1).push(el);
    });
  }

  next(count = 1) {
    const el = this.#pages[this.#currentPage + count];
    if (count === 1 && !el) {
      this.#currentPage = 0;
      return this.#pages.at(this.#currentPage);
    }
    if (typeof count !== "number" || !el)
      throw new Error("It must be a valid number.");
    this.#currentPage += count;
    return this.go(this.#currentPage);
  }

  previous(count = 1) {
    const el = this.#pages[this.#currentPage - count];
    if (count === 1 && !el) {
      this.#currentPage = this.#pages.length - 1;
      return this.#pages[this.#currentPage];
    }
    if (typeof count !== "number" || !el)
      throw new Error("It must be a valid number.");
    this.#currentPage -= count;
    return this.go(this.#currentPage);
  }

  go(index) {
    if (
      (index !== 0 && !index) ||
      typeof index !== "number" ||
      !this.#pages?.[index] ||
      index < 0
    )
      throw new Error(`The argument must be a valid index. (zero based)`);
    this.#currentPage = index;
    return this.currentPage;
  }

  get(index) {
    if (
      (index !== 0 && !index) ||
      typeof index !== "number" ||
      !this.#pages?.[index] ||
      index < 0
    )
      throw new Error(`The argument must be a valid index. (zero based)`);
    return this.#pages[index];
  }

  get pages() {
    return this.#pages;
  }

  get currentPage() {
    return this.#pages[this.#currentPage];
  }

  get currentPageIndex() {
    return this.#currentPage;
  }
}
