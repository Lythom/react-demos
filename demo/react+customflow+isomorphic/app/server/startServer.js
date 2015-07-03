require('app-module-path').addPath(__dirname+'/..');
require('node-jsx').install({extension: '.jsx'}); // allow the user of jsx files

var React = require('react'),
    express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    Data = require('model/Data'),
    Actions = require('actions/Actions'),
    app = express(),
    url = require('url'),
    Path = require('path'),
    fs = require('fs');

Actions.isServer = true;

function startServer(port, path, callback) {

    fs.readFile(__dirname+'/indexTemplate.html', function (err, html) {

        if (err) {
            throw err;
        }

        // This is our bundled React components
        MyApp = React.createFactory(require('../Application'));

        // init sessions
        app.use(session({
            secret: 'no way anyone one guess this',
            resave: false,
            saveUninitialized: true
        }));
        app.use(bodyParser.json());       // to support JSON-encoded bodies
        app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        }));

        app.use(express.static(path));
        app.use('/app', express.static(path + '/../app/'));

        // This takes every incoming request
        app.get('/', function (req, res) {
            // init Data flow
            Data.setInitialState(getState(req));

            // save data
            session.appState = Data.getObjectRef();

            // serve
            servePage(session.appState, res);
        });
        app.get('/page-:page', function (req, res) {
            // init Data flow
            Data.setInitialState(getState(req));

            // do action
            var page = req.params.page;
            if (page != null) {
                Actions.gotoPage(req.params.page);
            }

            // save data
            session.appState = Data.getObjectRef();

            // serve
            servePage(session.appState, res);
        })
            .get('/do-:action', function (req, res) {
                // init Data flow
                Data.setInitialState(getState(req));

                // do action
                if (req.params.action === 'increment') {
                    var id = req.query.counterId;
                    Actions.incrementCounter(id);
                }

                // save data
                session.appState = Data.getObjectRef();

                // serve
                servePage(session.appState, res);
            })
            .post('/do-:action', function (req, res) {
                // init Data flow
                Data.setInitialState(getState(req));

                // do action
                if (req.params.action === 'increment') {
                    var id = req.body.counterId;
                    Actions.incrementCounter(id);
                }

                // save data
                session.appState = Data.getObjectRef();

                // serve
                answerAjax({result:"success"}, res);
            })
            .post('/page-:page', function (req, res) {
                // init Data flow
                Data.setInitialState(getState(req));

                // do action
                Actions.gotoPage(req.params.page);

                // save data
                session.appState = Data.getObjectRef();

                // serve
                answerAjax({result:"success"}, res);
            })
            // get unhandled request (aka 404)
            .get('*', function (req, res) {
                res.status(404);
                res.end();
            })
            // The http server listens on port 3000
            .listen((port || 3000), function (err) {
                if (err) throw err;
                console.log('Listening on ' + (port || 3000) + '...');
            });

        // started
        if (callback) {
            callback();
        }

        function getState(req) {
            var session = req.session;
            if (session.appState != null) {
                return session.appState;
            } else {
                return Data.getDefaultInitialState();
            }
        }

        function servePage(state, res) {
            // Our data to be passed in to the React component for rendering
            Data.setInitialState(state);

            // Render the component
            var myAppHtml = React.renderToString(MyApp());

            res.setHeader('Content-Type', 'text/html');
            res.end(
                html.toString().replace('<div id="content"></div>', '<div id="content">' + myAppHtml + '</div>')
                    .replace('/*{{initialState}}*/', JSON.stringify(state))
            );
        }

        function answerAjax(answer, res){
            res.setHeader('Content-Type', 'text/json');
            res.end(JSON.stringify(answer));
        }
    });
}

module.exports = startServer;