import { createSingleLoading } from "@shined/react-use";
import { create } from "@shined/reactive";

export const loading = createSingleLoading({ create });

export const { useLoading, bind, set, get, useAsyncFn } = loading;
