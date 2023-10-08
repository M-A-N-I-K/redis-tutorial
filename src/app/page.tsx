"use client";

import Link from "next/link";
import axios from "axios";

const Home = () => {
	const comment = async () => {
		const { data } = await axios.post("/api/comment", {
			text: "Hello",
			tags: ["Typescript"],
		});
	};

	return (
		<div className="flex flex-col gap-8 items-start">
			<Link href="/comments" prefetch={false}>
				See Comments
			</Link>
			<button onClick={comment}>Make Comment</button>
		</div>
	);
};

export default Home;
