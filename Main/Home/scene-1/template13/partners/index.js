import React from "react";
import styled from "styled-components";

const Section = styled.div`
  color: #ffffff;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 20px;
  align-content: flex-start;
  margin: 10px 0;
`;

const Chip = styled.div`
  width: max-content;

  font-size: 24px;

  border: 1px solid #ffffff;
  border-radius: 25px;
  text-align: center;
  padding: 12px 20px;
`;

const Partners = ({ provider }) => {
  return (
    <Section>
      <ChipContainer>
        {provider
          .filter(
            (a) =>
              a.abbreviation.toLowerCase() !== "wgfm" &&
              a.abbreviation.toLowerCase() !== "wgvia"
          )
          .filter((gp) => {
            if (gp.abbreviation.includes("TCG")) {
              return gp.abbreviation === "TCG_SEA";
            } else {
              return gp;
            }
          })
          .map((item, index) => (
            <Chip key={index}>{item.name}</Chip>
          ))}
      </ChipContainer>{" "}
    </Section>
  );
};

export default Partners;
