//
// Imports
//

import { z } from "zod";

//
// Utility Functions
//

export function cloneTemplate<T extends HTMLElement = HTMLElement>(template: HTMLTemplateElement)
{
	const clone = template.content.cloneNode(true);

	const firstNode = clone.childNodes[0];

	if (firstNode == null)
	{
		return null;
	}

	return firstNode as T;
}

export function cloneTemplateOrThrow<T extends HTMLElement = HTMLElement>(template: HTMLTemplateElement)
{
	const clone = template.content.cloneNode(true);

	const firstNode = clone.childNodes[0];

	if (firstNode == null)
	{
		throw new Error("No child node in template.");
	}

	return firstNode as T;
}

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

export function getStringData(element: HTMLElement, key: string)
{
	return element.dataset[key] ?? null;
}

export function getStringDataOrThrow(element: HTMLElement, key: string)
{
	const data = getStringData(element, key);

	if (data == null)
	{
		throw new Error("Data not found: " + key);
	}

	return data;
}

export function getElement<T extends HTMLElement = HTMLElement>(parent: Document | HTMLElement, selector: string)
{
	return parent.querySelector<T>(selector) ?? null;
}

export function getElementOrThrow<T extends HTMLElement = HTMLElement>(parent: Document | HTMLElement, selector: string)
{
	const element = getElement<T>(parent, selector);

	if (element == null)
	{
		throw new Error("Element not found: " + selector);
	}

	return element;
}