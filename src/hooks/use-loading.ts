import { create } from "@shined/reactive";
import { createSingleLoading } from "@shined/react-use";

export const loading = createSingleLoading({ create });

export const { useLoading, bind, set, get, useAsyncFn } = loading;
