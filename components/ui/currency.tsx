"use client";

import { useEffect, useState } from "react";
import { Fauna_One } from "next/font/google";

const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value = 0 }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <div style={faunaOne.style} className="font-semibold">{formatter.format(Number(value))}</div>;
};

export default Currency;
