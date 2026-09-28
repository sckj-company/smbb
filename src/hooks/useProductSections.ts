"use client";

import { useEffect, useRef, useState } from "react";

import type { ProductGroup } from "@/data/productGroups";

interface UseProductSectionsProps {
  groupTypes: ProductGroup[];
  selectedGroup: ProductGroup | null;
}

export default function useProductSections({
  groupTypes,
  selectedGroup
}: UseProductSectionsProps) {
  const [activeGroup, setActiveGroup] = useState<ProductGroup | null>(null);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];

        if (visibleEntry) {
          setActiveGroup(visibleEntry.target.id as ProductGroup);
        }
      },
      {
        root: containerRef.current,
        rootMargin: "-18% 0px -65% 0px",
        threshold: 0
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [groupTypes, selectedGroup]);

  const registerSection = (
    groupType: ProductGroup,
    element: HTMLElement | null
  ) => {
    sectionRefs.current[groupType] = element;
  };

  return {
    activeGroup,
    setActiveGroup,
    containerRef,
    registerSection
  };
}
