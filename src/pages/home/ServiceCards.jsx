import Searchbar from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { serviceCardsData } from "@/data/inedx";
import React, { useEffect, useMemo, useState } from "react";

export default function ServiceCards() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredCards, setFilteredCards] = useState(serviceCardsData);

  const cards = useMemo(
    () =>
      serviceCardsData.filter((card) => {
        return (
          card.btnText.toLocaleLowerCase().includes(searchValue) ||
          card.heading.toLocaleLowerCase().includes(searchValue) ||
          card.desc.toLocaleLowerCase().includes(searchValue)
        );
      }),
    [searchValue],
  );
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchValue);
    if (!searchValue || searchValue == "") {
      setFilteredCards(serviceCardsData);
    } else {
      setFilteredCards(cards);
    }

    setSearchValue("");
  };

  console.log(filteredCards);
  return (
    <div>
      <div className="flex items-center justify-center md:mx-auto mx-2 my-3 mb-10 ">
        <Searchbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
        />
      </div>
      <div className="flex gap-5 overflow-x-auto  w-full md:mx-auto mx-2 px-4 scroll-bar">
        {filteredCards?.length > 0 &&
          filteredCards?.map((card, index) => {
            return (
              <Card
                key={card.id}
                className={`
  max-w-[350px]
  sm:max-w-[400px]
  md:max-w-[420px]
  md:max-w-[450px]
  rounded-xl border
  flex-shrink-0
  ${
    index % 2 === 0
      ? "bg-[#eefafb] border-[#cef1f5]"
      : "bg-[#f3f0e7] border-[#f3e8c9]"
  }
`}
              >
                <CardContent>
                  <div className="relative">
                    <img
                      src={card.image}
                      alt={card.heading}
                      className="h-[200px] w-full rounded-lg"
                    />

                    <Button
                      className={`absolute bottom-3 left-5 py-1  ${index % 2 == 0 ? "bg-[#047c89]" : "bg-[#ba8604] "} text-md rounded-2xl`}
                    >
                      {card.btnText}
                    </Button>
                  </div>
                  <CardTitle
                    className={"my-3 text-2xl font-bold text-gray-800 "}
                  >
                    {card.heading}
                  </CardTitle>
                  <CardDescription
                    className={`text-md ${index % 2 == 0 ? "text-[#047c89]" : "text-[#ba8604] "}`}
                  >
                    {card.desc.slice(0, 100)}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
