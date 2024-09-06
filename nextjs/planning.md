# Todo App Project Planning

## Current Status

1. Basic Todo App functionality implemented:
   - Displaying todos in a table
   - Adding new todos
   - Toggling todo completion status
   - Deleting todos

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
7. Sorting:
   - Implemented ability to sort todos (e.g., by creation date, alphabetically)

8. Todo Lists UI and Management:
   - Created TodoListHeader component
   - Implemented dropdown for selecting different todo lists
   - Added ability to create new todo lists from the UI
   - Enabled editing of todo list names
   - Implemented backend integration for loading multiple todo lists
   - Added backend functionality to create new todo lists
   - Implemented backend integration for updating todo list names
   - Added automatic creation of a default todo list if none exist

## Unfinished Objectives

1. Error Handling:
   - Implement more robust error handling for API calls
   - Add user-facing error messages

2. Loading States:
   - Add loading indicators for async operations

3. Pagination:
   - Implement pagination for the todo list

4. Filtering:
   - Add ability to filter todos (e.g., by completion status)

5. Edit Functionality:
   - Allow users to edit existing todo titles

6. Authentication:
   - Implement authentication for the app
   - Allow users to sign up, sign in, and sign out

7. Authorization:
   - Implement authorization for the app
   - Allow users to only edit their own todos

8. Todo Lists Management:
   - Allow users to delete existing todo lists
   - Modify TodoList component to load todos for a specific list
   - Update TodoList and CreateTodoInput components to work with selected todo list