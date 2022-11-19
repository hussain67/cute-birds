import { rest } from "msw";
import birds from "./birds.json";
export const handlers = [
	rest.get("http://localhost:4000/birds", (req, res, ctx) => {
		return res(ctx.json(birds));
	}),

	rest.post("http://localhost:4000", (req, res, ctx) => {
		return res(ctx.json({ name: "shahid" }));
	})
];
