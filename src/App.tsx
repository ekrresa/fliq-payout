import { FormWrapper } from './components/FormWrapper';
import { NavBar } from './components/NavBar';
import { Review } from './views/Review';

function App() {
  return (
    <>
      <NavBar />

      <FormWrapper>
        <Review />
      </FormWrapper>
    </>
  );
}

export default App;
