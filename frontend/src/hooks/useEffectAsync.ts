import { useEffect, useRef } from "react";

/**
 * Async version of `useEffect` with built-in un-mount safety support.
 * It is a short wrapper of the classic workaround.
 *
 * Use this for when you need to resolve a promise and mutate state with a `useEffect`.
 *
 * Example usage: <br/>
 * ```typescript
 * useEffectAsync<Children[]>(
 *   async () => {
 *     const client = await genClient();
 *     return await client.exampleChild_GetAllChildren();
 *   },
 *   data => setChildren(data),
 *   []
 * );
 * ```
 *
 * @function void
 * @template T can be interpreted based on the "fetcher" parameter.
 * @param {() => Promise<T>}  fetcher Promise function that can resolve and get data. Important: this function must not mutate state.
 * @param {(data: T) => void} mutator Callback that mutates state of the component.
 * @param {unknown[]} deps the same dependencies that you would pass to `useEffect`. Effect will only re-activate if the values in the list change.
 */
export const useEffectAsync = <T>(
  fetcher: () => Promise<T>,
  mutator?: (data: T) => void,
  deps: unknown[] = []
): void => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    fetcher().then(result => {
      if (mountedRef.current && mutator) {
        mutator(result);
      } else {
        console.debug("useEffectAsync demounted before mutating state.");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
};
