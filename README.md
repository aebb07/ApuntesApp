# ApuntesApp

## Templates

![Template 1- Header and Footer](ApuntesApp/templates/TEMPLATE1.png)
![Template 2- Notes](ApuntesApp/templates/TEMPLATE1.png)
![Template 3- Modal for each note](ApuntesApp/templates/TEMPLATE1.png)

## Documents and collections

Collection 'notes'

   `{
         id:
         title:
         content:
   }`

## Dependencies

1. Notes
2. Search bar
3. Sign in

## User input

1. Input search
2. SignIn button
3. SignOut button
4. Create button **+**
5. Dark/Light mode button
6. Delete button
7. Modal window in each note
8. Inputs in modal window
9. Close modal window button

## API endpoints

METHOD  | URL
--------| --------
  GET   | /search/?title=XXXX
  GET   | /list/
  GET   | /new/?title=XXXX&content=XXXX
  GET   | /delete/?id=XXXX
