import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Box, Card, Input, Heading, Text } from "@chakra-ui/react";

export default function FilterBlah() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let full = [];
        for (let x = 0; x < 100; x++) {
          result.forEach((i) => full.push(i));
        }
        setAPIData(full);
      });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  if (APIData.length <= 0) return <></>;

  return (
    <Box>
      <div style={{ padding: 20 }}>
        <Input onChange={(e) => searchItems(e.target.value)} />
        <Box>
          {searchInput.length > 1
            ? filteredResults.map((item, i) => {
                return (
                  <Card key={item.name + i}>
                    <Heading>{item.name}</Heading>
                    <Text>{item.email}</Text>
                  </Card>
                );
              })
            : APIData.map((item, i) => {
                return (
                  <Card key={item.name + i}>
                    <Heading>{item.name}</Heading>
                    <Text>{item.email}</Text>
                  </Card>
                );
              })}
        </Box>
      </div>
    </Box>
  );
}
