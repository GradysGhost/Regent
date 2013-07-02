Regent
======

Regent is an open source game management tool for Tenra Bansho Zero that is in early development. Regent will act as a hub for TBZ game for players and game masters alike, hosting info such as PC and NPC character sheets, game reference materials, media, and notes. It should also be possible to added custom apps such as encounter managers or dice rollers.

Design
======

Regent uses a simple and elegant 'card' analogy to layout and present information. In Regent, a card is any atomic item of game information which can be displayed, whether static or dynamic. Some examples: a character sheet, a reference table, or an image of a map.

On the left side of the screen is the Menu. This acts as a library of cards organized by type. Click on the card item in the menu to add that card to the layout space. Regent ~~supports~~ will support either user based local storage or database storage to store the state of the layout space so it does not need to be recreated each time a user logs in.


Currently Implemented Features
==============================
* Basic new user account registration (players only)
* Player and GM user levels
    * GMs can see all characters
    * Players can only see their characters
* Dynamic menu system
* Dynamic card loading
* Character sheet Cards
* Very basic JSON text Character editor card
* Hardly functional card drop and drag
 
Technical Implementation Details
================================
* Pure HTML 5 with JavaScript web app
* Angular JS framework v1.1.5
* Hosted in mongodb at MongoLab.com using their Mongo REST API
* CSS pre-compiling via SASS
    * Font Awesome for CSS icon rendering
    * Bootstrap for styles, collapsing

Planned Features For v1.0 Release
=================================
* Micro and minimized card states with toggle
    * Many cards should feature a 'micro' state which is an abridged, compact version of just their most important info.
    * All cards should feature a 'minimized' state which works similarly to windows tasks minimization. This state will only featuring the card name and an 'expand' button.
    * The layout board will feature a tray at the top or bottom. When cards are 'minimized', they disappear from the main layout and appear in their minimized state in the tray.
* Custom player (or GM) notes editing with strapdownjs.com support (Github Flavored Markdown)
* Reference editor with strapdownjs.com support (Github Flavored Markdown)
* Simple server side image handler for saving images to web server
* Image manager and cards

Features Considered For Future Major Versions
======================================================
* Remove unneeded dependencies
* First-time-use database setup wizard
* Handouts, which are basically shared notes.
* Encounter Manager
* Dice Roller
* Dynamic battle map card
* Dynamic shared layout view option
* Port to self served Mongo DB
* Player Chat Card


