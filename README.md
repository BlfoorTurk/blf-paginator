# paginix

The paginix Module is a JavaScript class that allows you to paginate an array of items. It splits the array into smaller arrays, based on a given number of items per page, and provides methods to navigate between the pages.

# Constructor

The constructor accepts an object with the following properties:

**pages**: An array of items to paginate. This parameter is required and must be an array.<br>
**perPage**: The number of items to display per page. This parameter is optional. (defaults to _3_)<br>

# Methods

The Paginator class provides the following methods:
<br>
**next(count)**: Moves to the next page. The count parameter is optional. If process goes wrong the output will be -1. (defaults to _1_)
<br>
**previous(count)**: Moves to the previous page. The count parameter is optional. If process goes wrong the output will be -1. (defaults to _1_)<br>
**go(index)**: Moves to a specific page, based on the zero-based index. If process goes wrong the output will be -1.
<br>
**get(index)**: Retrieves the page at the specified zero-based index. If process goes wrong the output will be -1.

# Properties

The Paginator class provides the following properties:<br>
<br>
**pages**: An array, containing the whole pagination array.
<br>
**currentPage**: An array of items representing the current page.
<br>
**currentPageIndex**: The zero-based index of the current page.
<br>
**itemsPerPage**: A number, representing how many items will be in any page.
<br>

```javascript
import Paginator from 'paginix';

const helper = new Paginator({
  perPage: 5,
  pages: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ],
});

// Properties
console.log(helper.pages);
// output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
console.log(helper.itemsPerPage);
// output: 5
console.log(helper.currentPage);
// output: [1, 2, 3, 4, 5]
console.log(helper.currentPageIndex);
// output: 0

// Methods
const nextPage = helper.next();
console.log(nextPage);
console.log(helper.currentPage);
// output: [6, 7, 8, 9, 10]
console.log(helper.currentPageIndex);
// output: 1
console.log(helper.previous());
// output: [1, 2, 3, 4, 5]
console.log(helper.go(3));
// output: [16, 17, 18, 19, 20]
console.log(helper.get(0)); // NOT mutable
// output: [1, 2, 3, 4, 5]
```
