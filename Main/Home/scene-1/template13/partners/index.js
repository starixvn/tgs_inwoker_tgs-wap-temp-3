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
  const providers = [
    { name: "BetConstruct" },
    { name: "Avia" },
    { name: "TF Sports" },
    { name: "Joker" },
    { name: "AE Slot" },
    { name: "FACAI" },
    { name: "Fast Spin" },
    { name: "Kingmaker" },
    { name: "PGSoft" },
    { name: "Spadegaming" },
    { name: "Venus" },
    { name: "YL" },
    { name: "WM" },
    { name: "Netent" },
    { name: "Red Tiger" },
    { name: "JILI" },
    { name: "Evolution" },
    { name: "JDB" },
    { name: "PHSB" },
    { name: "Habanero" },
  ];
  return (
    <Section>
      <ChipContainer>
        {providers.map((item, index) => (
          <Chip key={index}>{item.name}</Chip>
        ))}
      </ChipContainer>{" "}
    </Section>
  );
};

export default Partners;
