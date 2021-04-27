import { FormWrapper } from './components/FormWrapper';
import { NavBar } from './components/NavBar';
import { Payment } from './views/Payment';

function App() {
  return (
    <>
      <NavBar />

      <FormWrapper>
        <Payment />
      </FormWrapper>
    </>
  );
}

export default App;
