import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router, Switch, Route } from 'react-router-dom';

import history from './history';

import reducers from './reducers';
import App from './App';
import Login from 'scenes/Login';
import Todo from 'scenes/Todo';
import Register from 'scenes/Register';

let store = createStore(
	reducers,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : x => x
	)
);

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={history}>
				<Switch>
					<App>
						<Route exact path="/" component={Login} />
						<Route exact path="/todos" component={Todo} />
						<Route exact path="/register" component={Register} />
					</App>
				</Switch>
			</Router>
		</Provider>,
		document.getElementById('root')
	);
};

render();

if (process.env.NODE_ENV !== 'production') {
	if (module.hot) {
		module.hot.accept('/', () => {
			render();
		});
	}
}
