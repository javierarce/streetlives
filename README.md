![](https://travis-ci.org/javierarce/streetlives.svg?branch=master)

### How to run Streetlives locally:

1. Clone the repo:

`git clone git@github.com:javierarce/streetlives.git`

3. Install the dependencies:

`cd streetlives`
`npm install`

4. Install grunt:

`npm install -g grunt-cli`

5. Create a configuration file:

`mv lib/config.sample.js lib/config.js`

6. Open `lib/config.js` and add your [CartoDB](http://cartodb.com) credentials.
7. Run the app:

`node app.js`

8. Open `http://localhost:7000` in your browser.
