# Youtube-client

A web app to view information about youtube clips by user request.

Demo: [link](https://siarheikresik.github.io/youtube-client/).

## How to run:

1. clone repository `git clone <repository>`
2. go to directory `cd siarheikresik-2018Q3`
3. change branch to youtube-client `git checkout youtube-client`
4. go to project directory `cd youtube-client`
5. install dependencies `npm i`
6. run development build `npm run dev`
7. run production build `npm run build`
8. run linter `npm run lint`

## Known bugs and caveats:

- double pointer down on swipeable area
- ~~swipe on links triggers link pressing~~
- ~~swipe move should not go out of container bounds~~
- swipe events should not be catched when there are no cards
- multiple quick clicks select text on the page and corrupt swiping
- sometimes page index value equals -1
- clipped text in the card description body
- no visible cards when fast clicking on next page indicators in the paginator
- cards should be centered on the page if the number of cards lesser than the number of cards per page
- (regression) on new search cards must slide from right not left
- portrait mode, fixed cards height are needed
- the second of two consecutive requests may be received before the first causing wrong page order
- handling of undefined keys in a server response is needed
- handling of response error is needed
