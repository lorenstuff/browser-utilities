//
// Imports
//

import { DateTime } from "luxon";
import z from "zod";

import { getBooleanData } from "./Element.client.js";

//
// Utility Functions
//

export function disableInputs(form: HTMLFormElement)
{
	const inputs = form.querySelectorAll<HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("button, input, select, textarea");

	for (const input of inputs)
	{
		input.disabled = true;
	}
}

export function enableInputs(form: HTMLFormElement)
{
	const inputs = form.querySelectorAll<HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("button, input, select, textarea");

	for (const input of inputs)
	{
		input.disabled = false;
	}
}

export function addInputChangeListeners(form: HTMLFormElement)
{
	const elements = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea");

	for (const element of elements)
	{
		element.dataset["changed"] = "false";

		switch (element.type)
		{
			case "checkbox":
				element.dataset["initialValue"] = (element as HTMLInputElement).checked.toString();

				element.addEventListener("input",
					() =>
					{
						element.dataset["changed"] = ((element as HTMLInputElement).checked.toString() != element.dataset["initialValue"]).toString();
					});

				break;

			default:
				element.dataset["initialValue"] = element.value;

				element.addEventListener("input",
					() =>
					{
						element.dataset["changed"] = (element.value != element.dataset["initialValue"]).toString();
					});

				break;
		}
	}
}

export function commitInputValues(form: HTMLFormElement)
{
	const elements = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea");

	for (const element of elements)
	{
		element.dataset["changed"] = "false";

		switch (element.type)
		{
			case "checkbox":
				element.dataset["initialValue"] = (element as HTMLInputElement).checked.toString();

				break;

			default:
				element.dataset["initialValue"] = element.value;

				break;
		}
	}
}

export function hasInputValueBeenChanged(inputSelectOrTextarea: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
{
	return getBooleanData(inputSelectOrTextarea, "changed") ?? false;
}

export function getInputBooleanValue(input: HTMLInputElement)
{
	if (input.type == "checkbox")
	{
		return input.checked;
	}

	return input.value === "true" || input.value === "1";
}

export function getChangedInputBooleanValue(input: HTMLInputElement)
{
	if (!hasInputValueBeenChanged(input))
	{
		return undefined;
	}

	return getInputBooleanValue(input);
}

export function getInputDateValue(input: HTMLInputElement)
{
	if (input.type != "date")
	{
		throw new Error("Input passed to getInputDateValue is not the correct type: " + input.type);
	}

	if (input.value.trim() == "")
	{
		throw new Error("Input passed to getInputDateValue has no value, make it required or use getInputDateValueNullable.");
	}

	return DateTime.fromISO(input.value);
}

export function getChangedInputDateValue(input: HTMLInputElement)
{
	if (!hasInputValueBeenChanged(input))
	{
		return undefined;
	}

	return getInputDateValue(input);
}

export function getInputDateValueNullable(input: HTMLInputElement)
{
	if (input.type != "date")
	{
		throw new Error("Input passed to getInputDateValueNullable is not the correct type: " + input.type);
	}

	if (input.value.trim() == "")
	{
		return null;
	}

	return DateTime.fromISO(input.value);
}

export function getChangedInputDateValueNullable(input: HTMLInputElement)
{
	if (!hasInputValueBeenChanged(input))
	{
		return undefined;
	}

	return getInputDateValueNullable(input);
}

export function getInputDateTimeValue(input: HTMLInputElement)
{
	if (input.type != "datetime-local")
	{
		throw new Error("Input passed to getInputDateTimeValue is not the correct type: " + input.type);
	}

	if (input.value.trim() == "")
	{
		throw new Error("Input passed to getInputDateTimeValue has no value, make it required or use getInputDateTimeValueNullable.");
	}

	return input.value.trim();
}

export function getChangedInputDateTimeValue(input: HTMLInputElement)
{
	if (!hasInputValueBeenChanged(input))
	{
		return undefined;
	}

	return getInputDateTimeValue(input);
}

export function getInputDateTimeValueNullable(input: HTMLInputElement)
{
	if (input.type != "datetime-local")
	{
		throw new Error("Input passed to getInputDateTimeValueNullable is not the correct type: " + input.type);
	}

	if (input.value.trim() == "")
	{
		return null;
	}

	return DateTime.fromISO(input.value);
}

export function getChangedInputDateTimeValueNullable(input: HTMLInputElement)
{
	if (!hasInputValueBeenChanged(input))
	{
		return undefined;
	}

	return getInputDateTimeValueNullable(input);
}

export function getInputNumberValue(inputOrSelect: HTMLInputElement | HTMLSelectElement)
{
	if (inputOrSelect.tagName == "INPUT" && inputOrSelect.type != "number")
	{
		throw new Error("Input or select passed to getInputNumberValue is not the correct type: " + inputOrSelect.type);
	}

	if (inputOrSelect.value.trim() == "")
	{
		throw new Error("Input passed to getInputNumberValue has no value, make it required or use getInputNumberValueNullable.");
	}

	return z.coerce.number().parse(inputOrSelect.value);
}

export function getChangedInputNumberValue(inputOrSelect: HTMLInputElement | HTMLSelectElement)
{
	if (!hasInputValueBeenChanged(inputOrSelect))
	{
		return undefined;
	}

	return getInputNumberValue(inputOrSelect);
}

export function getInputNumberValueNullable(inputOrSelect: HTMLInputElement | HTMLSelectElement)
{
	if (inputOrSelect.tagName == "INPUT" && inputOrSelect.type != "number")
	{
		throw new Error("Input or select passed to getInputNumberValueNullable is not the correct type: " + inputOrSelect.type);
	}

	if (inputOrSelect.value.trim() == "")
	{
		return null;
	}

	return z.coerce.number().parse(inputOrSelect.value);
}

export function getChangedInputNumberValueNullable(inputOrSelect: HTMLInputElement | HTMLSelectElement)
{
	if (!hasInputValueBeenChanged(inputOrSelect))
	{
		return undefined;
	}

	return getInputNumberValueNullable(inputOrSelect);
}

export function getInputEnumValue<T extends [ string, ...string[] ]>(select: HTMLSelectElement, zodEnum: z.ZodEnum<T>)
{
	if (select.value.trim() == "")
	{
		throw new Error("Select passed to getInputEnumValue has no value, consider making it required.");
	}

	return zodEnum.parse(select.value);
}

export function getChangedInputEnumValue<T extends [ string, ...string[] ]>(select: HTMLSelectElement, zodEnum: z.ZodEnum<T>)
{
	if (!hasInputValueBeenChanged(select))
	{
		return undefined;
	}

	return getInputEnumValue(select, zodEnum);
}

export function getInputEnumValueNullable<T extends [ string, ...string[] ]>(select: HTMLSelectElement, zodEnum: z.ZodEnum<T>)
{
	if (select.value.trim() == "")
	{
		return null;
	}

	return zodEnum.parse(select.value);
}

export function getChangedInputEnumValueNullable<T extends [ string, ...string[] ]>(select: HTMLSelectElement, zodEnum: z.ZodEnum<T>)
{
	if (!hasInputValueBeenChanged(select))
	{
		return undefined;
	}

	return getInputEnumValueNullable(select, zodEnum);
}

export function getInputStringValue(inputSelectOrTextArea: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, allowBlank = false)
{
	if (!allowBlank && inputSelectOrTextArea.value.trim() == "")
	{
		throw new Error("Input, select or textareapassed to getInputStringValue has no value, make it required, pass true for allowBlank or use getInputStringValueNullable.");
	}

	return inputSelectOrTextArea.value.trim();
}

export function getChangedInputStringValue(inputSelectOrTextArea: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
{
	if (!hasInputValueBeenChanged(inputSelectOrTextArea))
	{
		return undefined;
	}

	return getInputStringValue(inputSelectOrTextArea);
}

export function getInputStringValueNullable(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
{
	return input.value.trim() != "" 
		? input.value.trim()
		: null;
}

export function getChangedInputStringValueNullable(inputSelectOrTextArea: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
{
	if (!hasInputValueBeenChanged(inputSelectOrTextArea))
	{
		return undefined;
	}

	return getInputStringValueNullable(inputSelectOrTextArea);
}