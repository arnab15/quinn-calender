import httpService from "./httpService";
const body = {
	requestobjects: [
		{
			posts: {
				operationtype: "read",
				id: {
					return: true,
				},
				userid: {
					searchvalues: ["adbef521-7cf6-4344-af48-a9480df46549"],
					return: true,
				},
				iscalendarentry: {
					searchvalues: ["true"],
					return: true,
				},
				media: {
					return: true,
				},
				rating: {
					return: true,
				},
				text: {
					return: true,
				},
				privacy: {
					searchvalues: [18],
					return: true,
				},
				typeofday: {
					return: true,
				},
				calendardatetime: {
					return: true,
					sort: "descending",
				},
				maxitemcount: "20",
				continuationtoken: null,
			},
		},
	],
};
export const getPosts = () => httpService.post("/graph", body);
