import "./App.css";
import dayjs from "dayjs";
import {
	createDaysForCurrentMonth,
	createDaysForNextMonth,
	createDaysForPreviousMonth,
	getOneMonthGridDays,
} from "./helpers/dateTimeHelper";

import Card from "./Components/Card";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getPosts } from "./Services/postService";
import DayBox from "./Components/DayBox";
import { useInView } from "react-intersection-observer";
import CalenderHeader from "./Components/CalenderHeader";

function App() {
	const { ref, inView, entry } = useInView({ threshold: 0.3 });
	const { ref: endTileRef, inView: endTileInView, entry: endTileEntry } = useInView();

	const [{ year, month }, setyearMonth] = useState({
		year: dayjs().get("year"),
		month: dayjs().get("month") + 1,
	});
	const [calendarGridDayObjects, setcalendarGridDayObjects] = useState(getOneMonthGridDays(year, month));

	const [currentActiveModalData, setCurrentActiveModalData] = useState();
	const [currentSctiveModalDataIndex, setcurrentSctiveModalDataIndex] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	const [posts, setposts] = useState([]);

	const getPostsData = async () => {
		try {
			const { data } = await getPosts();
			setposts(data.responseobjects[0].posts);
		} catch (error) {
			console.log("error", error);
		}
	};

	const checkIfDateHasAnyPost = (date) => {
		const foundIndex = posts.findIndex((post) => dayjs(post.calendardatetime).isSame(dayjs(date), "day"));
		if (foundIndex !== -1) {
			return posts[foundIndex];
		}
		return null;
	};

	const handelDateTileClick = (tileData) => {
		if (tileData) {
			const foundIndex = posts.findIndex((post) =>
				dayjs(post.calendardatetime).isSame(dayjs(tileData.calendardatetime), "day")
			);
			setcurrentSctiveModalDataIndex(foundIndex);
			setCurrentActiveModalData(tileData);
			setModalVisible(true);
		} else {
			setModalVisible(false);
		}
	};
	const settings = {
		infinite: false,
		lazyLoad: true,
		speed: 300,
		slidesToShow: 1,
		centerMode: true,
		centerPadding: 0,
		showArrow: false,
		arrows: false,
	};

	useEffect(() => {
		getPostsData();
	}, []);

	return (
		<div className="App">
			<CalenderHeader />
			<div className="grid grid-cols-7 mb-4 pt-[27px]">
				{calendarGridDayObjects.map((day, index) => {
					if (index === 0) {
						return (
							<DayBox
								ref={ref}
								key={day.dateString}
								day={day}
								checkIfDateHasAnyPost={checkIfDateHasAnyPost}
								setModalVisible={setModalVisible}
								onClick={handelDateTileClick}
							/>
						);
					}
					if (calendarGridDayObjects.length - 1 === index) {
						return (
							<DayBox
								ref={endTileRef}
								key={day.dateString}
								day={day}
								checkIfDateHasAnyPost={checkIfDateHasAnyPost}
								setModalVisible={setModalVisible}
								onClick={handelDateTileClick}
							/>
						);
					}
					return (
						<DayBox
							key={day.dateString}
							day={day}
							checkIfDateHasAnyPost={checkIfDateHasAnyPost}
							setModalVisible={setModalVisible}
							onClick={handelDateTileClick}
						/>
					);
				})}
			</div>
			{modalVisible ? (
				<>
					<div
						onClick={() => {
							setModalVisible(false);
							setCurrentActiveModalData(null);
						}}
						className="fixed z-[50] top-2 cursor-pointer right-4 text-2xl text-gray-100 font-bold">
						X
					</div>
					<div
						onClick={(e) => e.stopPropagation()}
						className="justify-center mt-[7%]  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<Slider {...settings} initialSlide={currentSctiveModalDataIndex}>
							{posts.map((post) => (
								<Card
									key={post.id}
									img={post.media[0].mediaurl}
									description={post.text}
									ratings={post.rating}
									legends={post.typeofday}
									date={post.calendardatetime}
								/>
							))}
						</Slider>
					</div>
					<div
						className="opacity-25 fixed inset-0 z-40 bg-black"
						onClick={() => {
							setModalVisible(false);
							setCurrentActiveModalData(null);
						}}></div>
				</>
			) : null}
		</div>
	);
}

export default App;
