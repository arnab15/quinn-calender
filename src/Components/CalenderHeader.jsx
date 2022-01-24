import React from "react";

function CalenderHeader(props) {
	return (
		<div className="grid grid-cols-7  border-b-2 fixed  w-full bg-slate-100">
			<div className="border-r-2">SUN</div>
			<div className="border-r-2">MON</div>
			<div className="border-r-2">TUE</div>
			<div className="border-r-2">WED</div>
			<div className="border-r-2">THU</div>
			<div className="border-r-2">FRI</div>
			<div>SAT</div>
		</div>
	);
}

export default CalenderHeader;
