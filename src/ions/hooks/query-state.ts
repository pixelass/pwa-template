import { omit, pick } from "lodash";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useCallback, useMemo } from "react";

export type Parser<T> = (value: string) => T;

export type Serializer<T> = (value: T) => string;

export type HistoryMethod = "push" | "replace";

export interface QueryStateConfig<T> {
	parse?: Parser<T>;
	serialize?: Serializer<T>;
	history?: HistoryMethod;
	fallback?: T;
}

export type QueryStateDispatcher<T> = (newState: T, history?: HistoryMethod) => Promise<boolean>;

export const useQueryState = <T>(
	key: string,
	config: QueryStateConfig<T>
): [T, QueryStateDispatcher<T>] => {
	// Fill config with defaults
	const {
		history = "replace",
		parse = input => input,
		serialize = (input: T) => `${input as unknown as string | number}`,
		fallback,
	} = config;
	// Destrucure router to get memoized members
	const { asPath, push, replace, query, pathname } = useRouter();
	// Extract the search query from the path
	const [, search] = asPath.split("?");
	// Get the value from the search
	const value = useMemo(() => new URLSearchParams(search).get(key), [search, key]);

	// State (memoized)
	const state = useMemo(
		() => (value ? (parse(value) as unknown as T) : fallback),
		[value, fallback, parse]
	);
	// State dispatcher (memoized)
	const setState: QueryStateDispatcher<T> = useCallback(
		async (newState, history_) => {
			const options = {
				shallow: true,
			};
			const update = {
				pathname,
				query: {
					...omit(query, key),
				},
			};
			if (newState) {
				update.query[key] = serialize(newState);
			}

			switch (history_ ?? history) {
				case "push":
					return push(update, undefined, options);
				case "replace":
				default:
					return replace(update, undefined, options);
			}
		},
		[history, pathname, query, key, serialize, push, replace]
	);

	// Return (not memoized)
	// Only the state and dispatcher are memoized
	// The return should be destructured
	// @example
	// const [state, setState] = useQueryState("foobar");
	return [state, setState];
};

export interface QueryStatesConfig<T> {
	parse?: { [K in keyof T]?: Parser<T[K]> };
	serialize?: { [K in keyof T]?: Serializer<T[K]> };
	history?: HistoryMethod;
}

export const useQueryStates = <T>(
	defaultValues: T,
	{ serialize, parse, history }: QueryStatesConfig<T> = {}
): [T, QueryStateDispatcher<Partial<T>>] => {
	// Destrucure router to get memoized members
	const { asPath, push, replace, query, pathname } = useRouter();
	// Extract the search query from the path
	const [, search] = asPath.split("?");
	// Get the values from the search
	const values = useMemo(() => queryString.parse(search), [search]);

	// State  (memoized)
	const state = useMemo(
		() =>
			Object.fromEntries(
				Object.entries(pick(values, Object.keys(defaultValues))).map(([key, value]) => [
					key,
					parse && parse[key as keyof T] ? parse[key as keyof T](value as string) : value,
				])
			) as unknown as T,
		[defaultValues, values, parse]
	);

	// State dispatcher (memoized)
	const setState: QueryStateDispatcher<Partial<T>> = useCallback(
		async (newState, history_) => {
			const options = {
				shallow: true,
			};
			const encoded = Object.fromEntries(
				Object.entries(newState).map(([key, value]) => [
					key,
					serialize && serialize[key as keyof T]
						? serialize[key as keyof T](value as T[keyof T])
						: value,
				])
			) as { [K in keyof T]: string };

			const update = {
				pathname,
				query: {
					...omit(query, Object.keys(newState)),
					...encoded,
				},
			};
			switch (history_ ?? history) {
				case "push":
					return push(update, undefined, options);
				case "replace":
				default:
					return replace(update, undefined, options);
			}
		},
		[push, replace, query, pathname, history, serialize]
	);

	// Return (not memoized)
	// Only the state and dispatcher are memoized
	// The return should be destructured
	// @example
	// const [state, setState] = useQueryStates({foobar: "Hello"});
	return [state, setState];
};
