import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { serviceCardsData } from "@/data/inedx";
import React from "react";

export default function ServiceCards() {
  return (
    <div className="flex items-center justify-center gap-5">
      {serviceCardsData?.length > 0 &&
        serviceCardsData?.map((card) => {
          return (
            <Card key={card.id}>
              <CardContent>
                <img src={card.image} alt={card.heading} />
                <CardTitle>{card.heading}</CardTitle>
                <CardDescription>{card.desc}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}
