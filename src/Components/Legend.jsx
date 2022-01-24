import React from "react";

function Legend({ legends = [] }) {
	const whichLegend = (legend) => {
		if (legend.toLowerCase().trim() === "hair cut") return "Cu";
		if (legend.toLowerCase().trim() === "protein treatment") return "Pr";
		if (legend.toLowerCase().trim() === "hair color") return "HC";
		if (legend.toLowerCase().trim() === "deep conditioning") return "DC";
		if (legend.toLowerCase().trim() === "hair oiling") return "HO";
		if (legend.toLowerCase().trim() === "clarifying") return "C";
		return "";
	};
	const shortLegends = legends.map((legend) => {
		return whichLegend(legend) ? whichLegend(legend) : [];
	});
	const colors = [
		"bg-pink-300 text-pink-600",
		"text-violet-500 bg-violet-300",
		"bg-blue-300 text-blue-600",
		"bg-green-300 text-green-600",
		"bg-yellow-300 text-yellow-600",
	];
	return (
		<div className="flex justify-center p-2">
			{shortLegends.map((sl, index) => (
				<div key={sl} className={`p-1 rounded-full ${colors[index]} mr-2 text-[7px] lg:text-xs `}>
					{sl}
				</div>
			))}
		</div>
	);
}

export default Legend;
