const API_KEY = process.env.GEO_API_KEY;

export async function getCoordinatesForAddress(address) {
	// https://stackoverflow.com/a/39914235
	await new Promise((resolve) => setTimeout(resolve, 2000));

	return {
		lat: (Math.random() * 60).toFixed(7),
		lng: (Math.random() * 60).toFixed(7),
	};
}
