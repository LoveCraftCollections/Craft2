"use client";

import { useEffect, useState } from "react";
import { calculateCountdown, type CountdownValue } from "@/lib/countdown";

export type { CountdownValue } from "@/lib/countdown";

export function useCountdown(targetDate: string, initialValue: CountdownValue): CountdownValue {
  const [countdown, setCountdown] = useState<CountdownValue>(initialValue);

  useEffect(() => {
    const update = () => setCountdown(calculateCountdown(targetDate));
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return countdown;
}
