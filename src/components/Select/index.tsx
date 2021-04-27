import React from "react";
import styled from "styled-components";
import Dropd from "react-dropd";

import { useCountries } from "./countryMap";

export function Select() {
  const countries = useCountries();
  const [country, setCountry] = React.useState(countries[0]);

  return (
    <>
      <StyledDropdown
        placeholder="Currency"
        onItemChange={(currentItem: any) => {
          setCountry(currentItem);
        }}
        list={countries}
        value={country}
      />
    </>
  );
}

const StyledDropdown = styled(Dropd)`
  min-width: unset !important;

  &[dropd-list] {
    min-width: unset !important;
  }
`;
