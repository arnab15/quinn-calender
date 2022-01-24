import dayjs from "dayjs";
import React from "react";
import Legend from "./Legend";
import StarRating from "./StarRating";

const DayBox = React.forwardRef(({ day, checkIfDateHasAnyPost, onClick }, ref) => {
	const postData = checkIfDateHasAnyPost(day.dateString);
	return (
		<div
			ref={ref}
			className="w-full bg-slate-100  p-1 border-2 cursor-pointer min-h-[160px]"
			onClick={() => {
				onClick(postData);
			}}>
			<p className="text-center ">
				{day.dayOfMonth === 1
					? `${day.dayOfMonth} ${new Date(day.dateString).toLocaleString("en-us", {
							month: "short",
					  })} ${dayjs(day.dateString).get("year")}`
					: day.dayOfMonth}
			</p>
			{postData && (
				<>
					<StarRating rating={postData.rating} />
					<div className="flex flex-col items-center">
						<img height="80px" width="60px" src={postData.media[0].mediaurl} />
						<Legend legends={postData.typeofday ? postData.typeofday : []} />
					</div>
				</>
			)}
		</div>
	);
});

export default DayBox;
