# Trello Clone

A simple trello clone.

## API endpoints

-   /
    -   GET
-   /boards
    -   GET
    -   POST
-   /boards/:boardID
    -   PUT
    -   DELETE
-   /boards/items
    -   GET
    -   POST
-   /boards/items/:itemID
    -   PUT
    -   DELETE
-   /boards/items/:itemID/title
    -   PUT
-   /boards/items/:itemID/description
    -   PUT

## Rough data structure

```js
// db
{
    boards: [
        {
            title: "board title",
            id: uID,
            items: /* item object */
        }
    ]
}

// Item object:

{
    id: uID,
    title: "item title",
    description: "item description"
}

```
