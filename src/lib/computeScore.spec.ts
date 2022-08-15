import { computeScore } from "./computeScore"

describe("Score computation", () => {
	it("should be able to compute the score", async () => {
		expect(
			computeScore([
				[null, null, null, null],
				[null, null, null, null],
				[null, null, null, null],
				[null, null, null, null],
			]),
		).toStrictEqual(0)

		expect(
			computeScore([
				[2, 4, null, null],
				[2, 4, 8, null],
				[2, 32, 16, null],
				[2, 64, 128, 256],
			]),
		).toStrictEqual(520)
	})
})
