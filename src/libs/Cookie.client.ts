//
// Imports
//

import { DateTime } from "luxon";

//
// Utility Functions
//

export function setCookie(domain: string, name: string, value: string, expires: DateTime)
{
	document.cookie = 
		encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";" +
		"domain=" + domain + ";" +
		"expires=" + expires.toHTTP() + ";" +
		"path=/;" +
		"SameSite=Lax";
}