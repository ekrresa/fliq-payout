# Fliqpay Test

App is hosted at https://competent-agnesi-c71939.netlify.app/

INSTRUCTIONS

1. Clone the repo
2. Install dependencies: `npm install`
3. Create a `.env` file and declare the environment variables as it is in `.env.example` file.
4. Please note you should have a paid subscription (Basic plan), to the [Fixer](https://fixer.io/) service for the API calls to work.
5. Run the app with `npm start`
6. Run tests with `npm test`


ASSUMPTIONS

1. Since this a checkout app, routing is minimal. Instead of routing with pathnames,I used query params. All views are lazy-loaded though.

2. I assumed the transfer fee is a flat fee of 3.56 USD. So for whatever currency the user is choosing, I convert the transfer fee to that currency, which I then subtract from the amount being sent. The remainder is what I convert to the chosen currency, the result which is sent to the recipient.

3. From the design, I saw exchange rates are guaranteed for an hour. So I cache the result of each API call for an hour.

4. I assumed persistence is not important. Storage is done using React context.

5. I built a modal triggered by a click of the `Compare rates` button on the Amount view. It displays a form where a user can compare exchange rates between currencies.

## Requirements not covered

1. I completed all features but I wish I was able to write more tests. I ran out of time.


ISSUES

1. Building the nav stepper was a bit difficult but I got it done. I later saw Ant Design has a stepper component... Well I learnt something though.

2. Validating the form on the Amount view. I had to handle a lot of edge cases.

3. Testing the components was tedious. I dealt with a lot of errors.


SUGGESTIONS

1. I think displaying the country name instead of the currency code of a country makes more sense to a user. A user can't easily tell what currency a country uses, based on the currency code, nor from the flag.

2. I would add an help icon on the Amount view, which hosts a tooltip that displays instructions on how the form works.

3. I would choose a different colour for the select input. The colour of choice makes the select input look disabled.
