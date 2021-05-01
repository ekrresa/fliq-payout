import React from 'react';
import countryCodes from './countryCodes.json';

export function processCountryCodes() {
  // Optimized parsing the countryCodes object by storing it in JSON
  // https://v8.dev/blog/cost-of-javascript-2019#json
  const countryCodesJSON = JSON.stringify(countryCodes);

  return Object.keys(JSON.parse(countryCodesJSON)).map((code: string) => {
    const imagePath = `${process.env.PUBLIC_URL}/flags/${code.toLowerCase()}.svg`;

    return {
      label: (
        <div className="flex items-center">
          <img className="rounded-full h-5 w-5 mr-2" src={imagePath} alt="" />
          <span className="font-medium text-purple-gloom">{code}</span>
        </div>
      ),
      value: code,
    };
  });
}
