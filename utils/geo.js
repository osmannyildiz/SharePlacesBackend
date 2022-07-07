export async function getCoordinatesForAddress(address) {
	// https://stackoverflow.com/a/39914235
	await new Promise((resolve) => setTimeout(resolve, 2000));

	return {
		lat: (Math.random() * 240 - 80).toFixed(7),
		lng: (Math.random() * 240 - 80).toFixed(7),
	};
}
