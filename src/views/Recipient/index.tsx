import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import '@reach/tabs/styles.css';

import { Button } from '../../components/Button';
import { FormControl } from '../../components/FormControl';
import { useCheckout } from '../../shared/CheckoutContext';

export default function Recipient() {
  const history = useHistory();
  const { saveRecipientInfo } = useCheckout();

  const { handleBlur, handleSubmit, handleChange, errors, values, setErrors } = useFormik({
    initialValues: {
      accountNumber: '',
      email: '',
      iban: '',
      name: '',
      swiftCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (!values.iban && !values.accountNumber) {
        setErrors({
          accountNumber: 'Please enter one of iban or account number',
          iban: 'Please enter one of iban or account number',
        });
        return;
      }

      if (values.iban && values.accountNumber) {
        setErrors({
          accountNumber: 'Please enter one of iban or account number',
          iban: 'Please enter one of iban or account number',
        });
        return;
      }

      saveRecipientInfo(values);

      history.push('/?stage=review');
    },
  });

  return (
    <section>
      <h1 className="text-purple-dark text-2xl font-medium">Your Recipient</h1>
      <h2 className="text-purple-light text-sm">Who are you sending money to?</h2>

      <hr className="my-6" />

      <form onSubmit={handleSubmit}>
        <FormControl
          label="Their email (optional)"
          id="email"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          type="email"
          errorMessage={errors.email}
          value={values.email}
        />
        <FormControl
          label="Full name of the account holder"
          id="name"
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          errorMessage={errors.name}
          value={values.name}
        />

        <h3 className="font-medium text-purple-dark text-lg">Bank details</h3>

        <hr className="my-6" />

        <section>
          <Tabs>
            <TabList className="border-b bg-white">
              <Tab className="px-8 pb-2 focus:outline-none">Inside Europe</Tab>
              <Tab className="px-8 pb-2 focus:outline-none">Outside Europe</Tab>
            </TabList>

            <TabPanels className="mt-4 focus:outline-none">
              <TabPanel className="focus:outline-none">
                <FormControl
                  label="IBAN"
                  id="iban"
                  name="iban"
                  placeholder="DE98370440018929829032"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorMessage={errors.iban}
                  value={values.iban}
                />
              </TabPanel>
              <TabPanel>
                <FormControl
                  label="SWIFT / BIC code"
                  id="swiftCode"
                  name="swiftCode"
                  placeholder="BUKBGB22"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorMessage={errors.swiftCode}
                  value={values.swiftCode}
                />

                <FormControl
                  label="IBAN / Account Number"
                  id="accountNumber"
                  name="accountNumber"
                  placeholder="01234567891"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorMessage={errors.accountNumber}
                  value={values.accountNumber}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>

        <Button className="bg-purple-normal w-full mt-4 text-white text-base" type="submit">
          Continue
        </Button>
      </form>
    </section>
  );
}

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().lowercase().email(),
  name: Yup.string().required("Please enter the recipient's name"),
  accountNumber: Yup.string().matches(/^\d+$/),
  iban: Yup.string().trim(),
  swiftCode: Yup.string().when('accountNumber', {
    is: (val: string) => val?.length > 0,
    then: Yup.string().required(),
    otherwise: Yup.string().optional(),
  }),
});
