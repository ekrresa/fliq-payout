import { FormWrapper } from "./components/FormWrapper";
import { NavBar } from "./components/NavBar";
import { Amount } from "./views/Amount";

function App() {
  return (
    <>
      <NavBar />

      <FormWrapper>
        <Amount />
      </FormWrapper>
    </>
  );
}

export default App;
