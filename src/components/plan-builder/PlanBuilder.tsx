"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { scrollToElement } from "@/components/providers/SmoothScroll";
import { planBuilderMarkup } from "./markup";
import { initPlanBuilder } from "./engine";
import "./plan-builder.css";

/**
 * Interactive pricing calculator. The markup is static; the engine builds
 * the service tiles/panels and keeps the summary in sync with the state.
 */
export function PlanBuilder() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initPlanBuilder(root.current, {
      endpoint: "/api/quote",
      email: site.contact.email,
      scrollTo: (el: HTMLElement) => scrollToElement(el, 88),
    });
  }, []);

  return (
    <div
      ref={root}
      className="bx"
      id="bx-calc"
      dangerouslySetInnerHTML={{ __html: planBuilderMarkup }}
    />
  );
}
