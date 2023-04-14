# paginix

The paginix Module is a JavaScript class that allows you to paginate an array of items. It splits the array into smaller arrays, based on a given number of items per page, and provides methods to navigate between the pages.

# Constructor

The constructor accepts an object with the following properties:

**pages**: An array of items to paginate. This parameter is required and must be an array.<br>
**perPage**: The number of items to display per page. This parameter is optional. (defaults to _3_)<br>
**zeroBased**: The argument that determines whether will the Paginator object be zero-based or not. (defaults to _true_)<br>

# Methods

The Paginator class provides the following methods:

**next(count)**: Moves to the next page. The count parameter is optional. If process goes wrong the output will be -1. (defaults to _1_)<br>
**previous(count)**: Moves to the previous page. The count parameter is optional. If process goes wrong the output will be -1. (defaults to _1_<br>
**go(index)**: Moves to a specific page, based on the zero-based index. If process goes wrong the output will be -1.<br>
**get(index)**: Retrieves the page at the specified zero-based index. If process goes wrong the output will be -1.<br>
**checkPlace()**: Checks the current page's location and returns either start or end or middle.<br>
**has(el, pageNumber)**: Checks does the pageNumber's page contains the element that you specified. (pageNumber is current page's index as default)<br>

# Properties

The Paginator class provides the following properties:

**pages**: An array, containing the whole pagination array.<br>
**currentPage**: An array of items representing the current page.<br>
**currentPageIndex**: The zero-based index of the current page.<br>
**itemsPerPage**: A number, representing how many items will be in any page.<br>
**pagesCount**: The number that specifies how many pages are there.<br>
**lastPage**: Last page as an array.<br>
**lastPageIndex**: Last page's index.<br>
**firstPage**: First page as an array.<br>
**firstPageIndex**: First page's index.<br>
**isZeroBased**: Returns whether is the Paginator object zero-based or not. (as boolean)<br>

# Example Code

```javascript
import Paginator from "paginix";

const helper = new Paginator({
  perPage: 5,
  pages: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ],
  zeroBased: false,
});

////////////////////////
// Properties

console.log(helper.pagesCount);
// 4

console.log(helper.pages);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

console.log(helper.lastPageIndex);
// 4

console.log(helper.lastPage);
// [16, 17, 18, 19, 20]

console.log(helper.currentPage);
// [1, 2, 3, 4, 5]

console.log(helper.itemsPerPage);
// 5

console.log(helper.isZeroBased);
// false

console.log(helper.firstPage);
// [1, 2, 3, 4, 5]

console.log(helper.firstPageIndex);
// 1

console.log(helper.currentPageIndex);
// 1

////////////////////////
// Methods

const next_2 = helper.next(2);
console.log(next_2);
// [11, 12, 13, 14, 15]

const index_3 = helper.go(3);
console.log(index_3);
// [11, 12, 13, 14, 15]

const firstPage = helper.previous(2);
console.log(firstPage);
// [1, 2, 3, 4, 5]

console.log(helper.checkPlace());
// start

console.log(helper.get(2));
// [6, 7, 8, 9, 10]
```
