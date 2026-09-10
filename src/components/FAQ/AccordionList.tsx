"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const FAQ_ITEMS = Array.from({ length: 6 }, (_, index) => index);

export default function AccordionList() {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<string[]>(["faq-0"]);

  return (
    <Accordion
      value={openItems}
      onValueChange={(value) => setOpenItems(value as string[])}
      className="max-w-xl"
    >
      {FAQ_ITEMS.map((index) => {
        const itemValue = `faq-${index}`;

        return (
          <AccordionItem
            key={index}
            value={itemValue}
            onMouseEnter={() => setOpenItems([itemValue])}
          >
            <AccordionTrigger>
              {t(`faq.items.${index}.question`)}
            </AccordionTrigger>

            <AccordionContent>{t(`faq.items.${index}.answer`)}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
