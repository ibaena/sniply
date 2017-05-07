import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/link';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup

  Meteor.publish("links", function() {
    return Links.find({});
  });

});

function onRoute(req, res, next) {

  //take token out of URL find matching link in links collection
  const link = Links.findOne({token:req.params.token});
  // if link obj found redirect user
  if (link) {
    Links.update(link,{ $inc: {clicks:1} });

    res.writeHead(307,{'Location': link.url});
    res.end();
  }else {
    //no link found redirect user to home page

    next();
  }
}


const middleware = ConnectRoute(function(router) {
  router.get('/:token', (req, res, next) => onRoute(req, res, next) )
});

WebApp.connectHandlers.use(middleware);
