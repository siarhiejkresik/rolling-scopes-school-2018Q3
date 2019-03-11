# «Падарожжа ў краіну слоў»

A small and primitive clone of the Prodigy game https://www.prodigygame.com/.

The final task of stage #2 (Rolling scope school, [link](https://github.com/rolling-scopes-school/tasks/blob/2018-Q3/tasks/game.md)).

Demo: [link](https://siarheikresik.github.io/game-2018Q3-landing/). 

The game server is hosted on [heroku](https://siarhiej-kresik-game-2018q3.herokuapp.com/).  
The game database is hosted on [mlab](https://mlab.com/databases/game2018q3).

## Getting source files

1. `git clone git@github.com:rolling-scopes-school/siarheikresik-2018Q3.git`
2. `cd siarheikresik-2018Q3`
3. `git checkout game`
4. `cd game`

## Running npm scripts

- installing project dependencies: `npm install`

* running storybook: `npm run storybook`
* building a client in the production mode: `npm run build`
* starting development enviroment:
    - run a local game server: `npm run start-dev` (make sure you have MongoDB installed and running on localhost:27017)
    - start wepack-dev-server: `npm run dev`
    - open http://localhost:8080/ in a browser
