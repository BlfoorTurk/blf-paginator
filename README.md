# blf-paginator

The blf-paginator Module is a JavaScript class that allows you to paginate an array of items. It splits the array into smaller arrays, based on a given number of items per page, and provides methods to navigate between the pages.

# Constructor

The constructor accepts an object with the following properties:

**pages**: An array of items to paginate. This parameter is required and must be an array.
perPage: The number of items to display per page. This parameter is optional and defaults to _3_.<br>
**addRestToLastPage**: A boolean value indicating whether to add any remaining items to the last page. This parameter is optional and defaults to true.

# Methods

The Paginator class provides the following methods:
<br>
**next(count)**: Moves to the next page. The count parameter is optional and defaults to _1_.
<br>
**previous(count)**: Moves to the previous page. The count parameter is optional and defaults to _1_.<br>
**go(index)**: Moves to a specific page, based on the zero-based index.
<br>
**get(index)**: Retrieves the page at the specified zero-based index.

# Properties

The Paginator class provides the following properties:<br>
<br>
**pages**: An array of arrays, containing the paginated items.
<br>
**currentPage**: An array of items representing the current page.
<br>
**currentPageIndex**: The zero-based index of the current page.
<br>

```javascript
import Paginator from "blf-paginator";

const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const paginator = new Paginator({ pages: items, perPage: 5 });

console.log(paginator.currentPage);
// [1, 2, 3, 4, 5]

const next = paginator.next();
console.log(next);
console.log(paginator.currentPage);
// [6, 7, 8, 9, 10]

console.log(paginator.previous());
// [1, 2, 3, 4, 5]

const forth = paginator.go(3);
console.log(forth);
// [16, 17, 18, 19, 20]

const first = paginator.get(0);
console.log(first);
// [1, 2, 3, 4, 5]
```
