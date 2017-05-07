import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header';
import LinkCreate from './components/link_create';
import LinkList from './components/link_list';
import { Links } from '../imports/collections/link';

const App = () => {
  return (
    <div>
      <Header />
      <LinkCreate />
      <LinkList />
    </div>
  );
};

Meteor.startup(function(){
  ReactDOM.render(<App />, document.querySelector('.render-target'));
});
