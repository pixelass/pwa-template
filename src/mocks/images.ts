import { getPlaiceholder } from "plaiceholder";

const unsplashIds = [
	"1472213984618-c79aaec7fef0",
	"1431965400057-a84b80cfdbff",
	"1462331940025-496dfbfc7564",
	"1433048980017-63f162f662b0",
	"1443926818681-717d074a57af",
	"1591543620767-582b2e76369e",
	"1444021465936-c6ca81d39b84",
	"1471180625745-944903837c22",
	"1495908333425-29a1e0918c5f",
];

export async function images() {
	return Promise.all(
		unsplashIds.map(async id => {
			const src = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&h=600&q=80`;
			const {
				base64,
				img: { height, width },
			} = await getPlaiceholder(decodeURIComponent(src), {
				size: 16,
			});
			return {
				id,
				label: `Roasted, crusted pudding is best jumbled with minced white wine.`,
				text: `Season each side of the strudel with twenty pounds of meatloaf. when
					drying tangy carrots, be sure they are room temperature. Small, melted pudding
					is best enamelled with delicious kefir. Cold, sun-dried pudding is best
					marinated with soaked adobo sauce. Whole, roasted pudding is best flavored with
					rich beer. fluffy, gooey pudding is best flavored with roasted ketchup. Tender,
					mild pudding is best whisked with squeezed rice vinegar. Sour, niffy pudding is
					best flavored with chilled triple sec. pan.`,
				src,
				height,
				width,
				base64,
			};
		})
	);
}
