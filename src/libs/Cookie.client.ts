//
// Imports
//

import { DateTime } from "luxon";

//
// Utility Functions
//

/**
 * Sets a cookie.
 * 
 * @param domain The domain for the cookie.
 * @param name The name of the cookie.
 * @param value The value of the cookie.
 * @param expires A Luxon DateTime representing the expiration date of the cookie.
 */
export function setCookie(domain: string, name: string, value: string, expires: DateTime)
{
	document.cookie = 
		encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";" +
		"domain=" + domain + ";" +
		"expires=" + expires.toHTTP() + ";" +
		"path=/;" +
		"SameSite=Lax";
}