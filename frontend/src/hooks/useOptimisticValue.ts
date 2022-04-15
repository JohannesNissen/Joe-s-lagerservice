import { useEffect, useRef, useState } from "react";

interface OptimisticState<T> {
  readonly status: "pending" | "loading" | "failed" | "succeed";
  readonly value?: T;
  readonly error?: Error;
}

export const useOptimisticValue = <T>(
  func: () => T | Promise<T>,
  predictedValue: T
): OptimisticState<T> => {
  const [optimisticValue, setOptimisticValue] = useState<OptimisticState<T>>({
    status: "pending",
    value: predictedValue
  });

  useEffect(() => {
    setOptimisticValue({
      status: "pending",
      value: predictedValue
    });
  }, [predictedValue]);

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setOptimisticValue({
      ...optimisticValue,
      status: "loading"
    });

    Promise.resolve()
      .then(func)
      .then(value => {
        if (mountedRef.current) {
          setOptimisticValue({
            status: "succeed",
            value
          });
        } else {
          console.debug("useEffectAsync demounted before mutating state.");
        }
      })
      .catch(error => {
        if (mountedRef.current) {
          setOptimisticValue({
            ...optimisticValue,
            status: "failed",
            error
          });
        } else {
          console.debug("useEffectAsync demounted before mutating state.");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [func, predictedValue]);

  return optimisticValue;
};
