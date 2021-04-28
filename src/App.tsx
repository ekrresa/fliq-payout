import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Wrapper } from './components/Wrapper';
import { NavBar } from './components/NavBar';
import { Loader } from './components/Loader';

const Amount = lazy(() => import('./views/Amount'));
const Payment = lazy(() => import('./views/Payment'));
const Recipient = lazy(() => import('./views/Recipient'));
const Review = lazy(() => import('./views/Review'));

function App() {
  return (
    <>
      <NavBar />

      <Wrapper>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/" exact>
              <Amount />
            </Route>
            <Route path="/payment">
              <Payment />
            </Route>
            <Route path="/recipient">
              <Recipient />
            </Route>
            <Route path="/review">
              <Review />
            </Route>
          </Switch>
        </Suspense>
      </Wrapper>
    </>
  );
}

export default App;
