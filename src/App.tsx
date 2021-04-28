import { Suspense, lazy } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import qs from 'query-string';

import { Wrapper } from './components/Wrapper';
import { NavBar } from './components/NavBar';
import { Loader } from './components/Loader';

const Amount = lazy(() => import('./views/Amount'));
const Payment = lazy(() => import('./views/Payment'));
const Recipient = lazy(() => import('./views/Recipient'));
const Review = lazy(() => import('./views/Review'));

function App() {
  const location = useLocation();
  const parsedString = (qs.parse(location.search) as unknown) as Record<string, string>;

  return (
    <>
      <NavBar />

      <Wrapper>
        <Suspense fallback={<Loader />}>
          <Switch>{resolveView(parsedString.stage)}</Switch>
        </Suspense>
      </Wrapper>
    </>
  );
}

function resolveView(view: string) {
  switch (view) {
    case 'amount':
      return <Amount />;
    case 'payment':
      return <Payment />;
    case 'recipient':
      return <Recipient />;
    case 'review':
      return <Review />;

    default:
      return <Amount />;
  }
}

export default App;
