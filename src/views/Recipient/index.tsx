import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import '@reach/tabs/styles.css';

import { Button } from '../../components/Button';

export function Recipient() {
  return (
    <section>
      <h1 className="text-purple-dark text-2xl font-medium">Your Recipient</h1>
      <h2 className="text-purple-light text-sm">Who are you sending money to?</h2>

      <hr className="my-6" />

      <form>
        <div className="mb-4">
          <label className="block text-main-light text-lg mb-2" htmlFor="amount">
            Their email (optional)
          </label>
          <input
            className="block w-full focus:outline-solid px-2 py-3 border rounded"
            id="amount"
          />
        </div>

        <div className="mb-4">
          <label className="block text-main-light text-lg mb-2" htmlFor="amount">
            Full name of the account holder
          </label>
          <input
            className="block w-full focus:outline-solid px-2 py-3 border rounded"
            id="amount"
          />
        </div>

        <h3 className="font-medium text-purple-dark text-lg">Bank details</h3>

        <hr className="my-6" />

        <section>
          <Tabs>
            <TabList className="border-b bg-white">
              <Tab className="px-8 pb-2">Inside Europe</Tab>
              <Tab className="px-8 pb-2">Outside Europe</Tab>
            </TabList>

            <TabPanels className="mt-4">
              <TabPanel>
                <div className="mb-4">
                  <label className="block text-main-light text-lg mb-2" htmlFor="amount">
                    IBAN
                  </label>
                  <input
                    className="block w-full focus:outline-solid px-2 py-3 border rounded"
                    id="amount"
                    placeholder="DE98370440018929829032"
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="mb-4">
                  <label className="block text-main-light text-lg mb-2" htmlFor="amount">
                    SWIFT / BIC code
                  </label>
                  <input
                    className="block w-full focus:outline-solid px-2 py-3 border rounded"
                    id="amount"
                    placeholder="BUKBGB22"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-main-light text-lg mb-2" htmlFor="amount">
                    IBAN / Account Number
                  </label>
                  <input
                    className="block w-full focus:outline-solid px-2 py-3 border rounded"
                    id="amount"
                    placeholder="01234567891"
                  />
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>

        <Button className="bg-purple-normal w-full mt-4 text-white text-base">Continue</Button>
      </form>
    </section>
  );
}
