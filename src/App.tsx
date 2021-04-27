import { FormWrapper } from './components/FormWrapper';
import { NavBar } from './components/NavBar';
import { Recipient } from './views/Recipient';

function App() {
  return (
    <>
      <NavBar />

      <FormWrapper>
        <Recipient />
      </FormWrapper>
    </>
  );
}

export default App;
