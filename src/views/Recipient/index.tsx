import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import '@reach/tabs/styles.css';

import { Button } from '../../components/Button';
import { FormControl } from '../../components/FormControl';

export default function Recipient() {
  // TODO: Add e typings
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <section>
      <h1 className="text-purple-dark text-2xl font-medium">Your Recipient</h1>
      <h2 className="text-purple-light text-sm">Who are you sending money to?</h2>

      <hr className="my-6" />

      <form onSubmit={handleSubmit}>
        <FormControl label="Their email (optional)" id="recipient_email" />
        <FormControl label="Full name of the account holder" id="recipient_name" />

        <h3 className="font-medium text-purple-dark text-lg">Bank details</h3>

        <hr className="my-6" />

        <section>
          <Tabs>
            <TabList className="border-b bg-white">
              <Tab className="px-8 pb-2 focus:outline-none">Inside Europe</Tab>
              <Tab className="px-8 pb-2 focus:outline-none">Outside Europe</Tab>
            </TabList>

            <TabPanels className="mt-4">
              <TabPanel>
                <FormControl label="IBAN" id="iban" placeholder="DE98370440018929829032" />
              </TabPanel>
              <TabPanel>
                <FormControl label="SWIFT / BIC code" id="swift_code" placeholder="BUKBGB22" />

                <FormControl
                  label="IBAN / Account Number"
                  id="iban"
                  placeholder="01234567891"
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
