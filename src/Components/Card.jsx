import React from "react";
import Legend from "./Legend";
import StarRating from "./StarRating";
import dayjs from "dayjs";
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
function Card({ img, description, ratings, date, legends }) {
	return (
		<div className="active-card max-w-[80%] sm:max-w-[35%] rounded overflow-hidden shadow-lg bg-white max-h-[80vh] md:max-h-[84vh] mb-3">
			<div className="h-96 overflow-hidden object-cover">
				<img src={img} alt="Sunset in the mountains" />
			</div>

			<div className="px-6 py-4 flex justify-between">
				<Legend legends={legends ? legends : []} />
				<StarRating rating={ratings} />
			</div>
			<div className="pl-2 pb-2 flex flex-col justify-start">
				<div>
					<p className="text-left">{dayjs(date).get("date") + " " + months[dayjs(date).get("month")]}</p>
				</div>
				<div>
					<p className="text-gray-600 text-left">{description}</p>
				</div>
			</div>
			<div className="border-t-2 p-3 h-9 mb-2 cursor-pointer">View Full Post</div>
		</div>
	);
}

export default Card;
