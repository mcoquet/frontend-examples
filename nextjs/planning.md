# Todo App Project Planning

## Current Status

1. Basic Todo App functionality implemented:
   - Displaying todos in a table
   - Adding new todos
   - Toggling todo completion status

2. Components created:
   - TodoList (main component managing state)
   - CreateTodoInput (for adding new todos)
   - TodoTable (for displaying todos)
   - TodoItem (individual todo row in the table)

3. Using Next.js 13+ with App Router
4. Implemented client-side rendering for dynamic updates
5. Using Manifest SDK for backend interactions
6. Improved architecture:
   - Moved API calls into a centralized module
   - Refined data types and their usage across the app

## Unfinished Objectives

1. Error Handling:
   - Implement more robust error handling for API calls
   - Add user-facing error messages

2. Loading States:
   - Add loading indicators for async operations

3. Pagination:
   - Implement pagination for the todo list

4. Filtering and Sorting:
   - Add ability to filter todos (e.g., by completion status)
   - Add ability to sort todos (e.g., by creation date, alphabetically)

5. Edit Functionality:
   - Allow users to edit existing todo titles

6. Delete Functionality:
   - Allow users to delete todos

7. Authentication:
   - Implement authentication for the app
   - Allow users to sign up, sign in, and sign out

8. Authorization:
   - Implement authorization for the app
   - Allow users to only edit their own todos