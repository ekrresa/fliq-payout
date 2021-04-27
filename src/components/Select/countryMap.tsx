import React from "react";
import { countryCodes } from "../../helpers/countryCodes";

export function useCountries() {
  return React.useMemo(
    () =>
      Object.keys(countryCodes).map((code) => {
        const imagePath = `${
          process.env.PUBLIC_URL
        }/flags/${code.toLowerCase()}.svg`;

        return {
          label: (
            <div className="flex items-center">
              <img
                className="rounded-full h-5 w-5 mr-2"
                src={imagePath}
                alt=""
              />
              <span>{code}</span>
            </div>
          ),
          value: code,
        };
      }),
    []
  );
}