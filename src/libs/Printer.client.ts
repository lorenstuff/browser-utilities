//
// Utility Functions
//

export async function printDocument(url: string, frameId = "print-document-interactable-frame")
{
	return new Promise<boolean>(
		(resolve) =>
		{
			document.getElementById(frameId)?.remove();

			const frame = document.createElement("iframe");

			frame.id = frameId;
			frame.src = url;
			frame.name = "print-document";
			frame.style.display = "none";

			frame.addEventListener("load",
				() =>
				{
					const contentWindow = frame.contentWindow;

					if (contentWindow == null)
					{
						resolve(false);
					}
					else
					{
						contentWindow.print();

						resolve(true);
					}
				});

			document.body.appendChild(frame);
		});
}