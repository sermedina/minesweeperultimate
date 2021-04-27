# minesweeperultimate
Minesweeper persistent game with Java Spring framework and AngularJS.

First steps

Backend features:\
-Spring security authentication provider.
-Spring data source.\
-User and Game beans with relationships, DAOs, repositories and basic controllers.\
-Spring boot configuration.\

Frontend features:\
-AngularJS basic routing and SPA.\
-AngularJS Services and Controllers for API access.\
-Login and Home templates.\


Logical Decisions:

-For the model, User one to many relationship with Games. This allows to fetch games from the user when login.\
-Login with spring security, no roles needed.\
-PostgreSQL database.\
-The rows and columns can be a max of 30 each as 30x30 is the standard expert board.\
-Number of mines validation: you can select as much as about the half of mines of a defined board (this is easily changeable in the code).\
-Jsonb for storing the boards (as a matrix).\
-AngularJS SPA for all the user interface.\
-Construction of board with buttons in the DOM.\
-Reactive interaction when playing the game.\
-Spring boot integration.\
-Heroku for the deployment (this could change).


