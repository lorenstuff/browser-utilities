//
// Imports
//

import { z } from "zod";

//
// Utility Functions
//

/**
 * Gets boolean data from an element.
 * 
 * @param element The element to get the data from.
 * @param key The key of the data.
 * @returns The boolean data, or null if the data is not found or is not a boolean.
 */
export function getBooleanData(element: HTMLElement, key: string)
{
	const data = element.dataset[key];

	if (data === undefined)
	{
		return null;
	}

	if (data === "true")
	{
		return true;
	}

	if (data === "false")
	{
		return false;
	}

	return null;
}

/**
 * Gets boolean data from an element
 * 
 * @param element The element to get the data from.
 * @param key The key of the data.
 * @returns The boolean data.
 */
export function getBooleanDataOrThrow(element: HTMLElement, key: string)
{
	const data = element.dataset[key];

	if (data === undefined)
	{
		throw new Error("Data not found: " + key);
	}

	if (data === "true")
	{
		return true;
	}

	if (data === "false")
	{
		return false;
	}

	throw new Error("Data is not a boolean: " + key);
}

/**
 * Gets integer data from an element.
 * 
 * @param element The element to get the data from.
 * @param key The key of the data.
 * @returns The integer data, or null if the data is not found or is not an integer.
 */
export function getIntegerData(element: HTMLElement, key: string)
{
	const data = element.dataset[key];

	if (data === undefined)
	{
		return null;
	}

	const parseResult = z.coerce.number().int().safeParse(data);

	if (!parseResult.success)
	{
		return null;
	}

	return parseResult.data;
}

/**
 * Gets integer data from an element.
 * 
 * @param element The element to get the data from.
 * @param key The key of the data.
 * @returns The integer data.
 */
export function getIntegerDataOrThrow(element: HTMLElement, key: string)
{
	const data = element.dataset[key];

	if (data === undefined)
	{
		throw new Error("Data not found: " + key);
	}

	const parseResult = z.coerce.number().int().safeParse(data);

	if (!parseResult.success)
	{
		throw new Error("Data is not an integer: " + key);
	}

	return parseResult.data;
}

/**
 * Gets string data from an element.
 * 
 * @param element The element to get the data from.
 * @param key The key of the data.
 * @returns The string data, or null if the data is not found.
 */
export function getStringData(element: HTMLElement, key: string)
{
	return element.dataset[key] ?? null;
}

/**
 * Gets string data from an element.
 * 
 * @param element The element to get the data from.
 * @param key The key of the data.
 * @returns The string data.
 */
export function getStringDataOrThrow(element: HTMLElement, key: string)
{
	const data = getStringData(element, key);

	if (data == null)
	{
		throw new Error("Data not found: " + key);
	}

	return data;
}

/**
 * Gets an element.
 * 
 * @param parent The element to query within.
 * @param selector The selector to query for.
 * @returns The element, or null if not found.
 */
export function getElement<T extends HTMLElement = HTMLElement>(parent: Document | HTMLElement, selector: string)
{
	return parent.querySelector<T>(selector) ?? null;
}

/**
 * Gets an element.
 * 
 * @param parent The element to query within.
 * @param selector The selector to query for.
 * @returns The element.
 */
export function getElementOrThrow<T extends HTMLElement = HTMLElement>(parent: Document | HTMLElement, selector: string)
{
	const element = getElement<T>(parent, selector);

	if (element == null)
	{
		throw new Error("Element not found: " + selector);
	}

	return element;
}