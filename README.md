Fork of: React Router Mega Demo
===============================

This is an update to the [react mega demo](https://github.com/rackt/react-router-mega-demo).

It utilizes express and some additional structure for the node code.

Next: add and re-hydrate stores.  Attemping to use instead of [fluxible](http://fluxible.io/).

This repo has been modified to include [react hot loader](http://gaearon.github.io/react-hot-loader/).  Unfortunately express cannot be run with `nodemon` while enabling reloading of both the front end and back end.  Investigation is necessary to determine how we can get both sides to refresh automatically without killing your socket connection.

Development:
`npm run dev`
