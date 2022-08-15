import { recomputeGridForMove } from "./recomputeGridForMove"
import type { MoveDirection } from "../hooks/use2048"
import type { IGrid } from "../components/Grid/Grid"

describe("Grid update", () => {
	function expectMoveTo(direction: MoveDirection) {
		return {
			onGrid: function (grid: IGrid) {
				return {
					toResultInGrid(expectedGrid: IGrid) {
						expect(recomputeGridForMove(grid, direction)).toStrictEqual(expectedGrid)
					},
				}
			},
		}
	}
	it("should recompute the grid following a right move", async () => {
		expectMoveTo("right")
			.onGrid([
				[null, null, 2, null, null],
				[16, 4, null, 2, null],
				[2, 2, 4, 4, null],
				[null, 2, 2, 2, null],
				[2, 2, 2, 2, null],
			])
			.toResultInGrid([
				[null, null, null, null, 2], // no combination but number shifted to right
				[null, null, 16, 4, 2], // no combination, numbers shifted to right
				[null, null, null, 4, 8], // double combination, shifted to right
				[null, null, null, 2, 4], // combination, shifted to right, correct order
				[null, null, null, 4, 4], // make sure both 4s aren't combined
			])
	})

	it("should recompute the grid following a left move", async () => {
		expectMoveTo("left")
			.onGrid([
				[null, null, 2, null, null],
				[null, 2, null, 4, 16],
				[null, 4, 4, 2, 2],
				[null, 2, 2, 2, null],
				[null, 2, 2, 2, 2],
			])
			.toResultInGrid([
				[2, null, null, null, null], // no combination but number shifted to left
				[2, 4, 16, null, null], // no combination, numbers shifted to left
				[8, 4, null, null, null], // double combination, shifted to left
				[4, 2, null, null, null], // combination, shifted to left, correct order
				[4, 4, null, null, null], // make sure both 4s aren't combined
			])
	})

	it("should recompute the grid following a top move", async () => {
		expectMoveTo("top")
			.onGrid([
				[null, null, null, null, null],
				[null, 2, 4, 2, 2],
				[2, null, 4, 2, 2],
				[null, 4, 2, 2, 2],
				[null, 16, 2, null, 2],
			])
			.toResultInGrid([
				// 1  -  2  -  3  -  4  -  5
				[2, 2, 8, 4, 4], // 1. no combination but number shifted to top
				[null, 4, 4, 2, 4], // 2. no combination, numbers shifted to top
				[null, 16, null, null, null], // 3. double combination, shifted to top
				[null, null, null, null, null], // 4. combination, shifted to top, correct order
				[null, null, null, null, null], // 5. make sure both 4s aren't combined
			])
	})

	it("should recompute the grid following a bottom move", async () => {
		expectMoveTo("bottom")
			.onGrid([
				[null, 16, 2, null, 2],
				[null, 4, 2, 2, 2],
				[2, null, 4, 2, 2],
				[null, 2, 4, 2, 2],
				[null, null, null, null, null],
			])
			.toResultInGrid([
				// 1  -  2  -  3  -  4  -  5
				[null, null, null, null, null], // 1. combination, shifted to bottom, correct order
				[null, null, null, null, null], // 2. make sure both 4s aren't combined
				[null, 16, null, null, null], // 3. double combination, shifted to bottom
				[null, 4, 4, 2, 4], // 4. no combination, numbers shifted to bottom
				[2, 2, 8, 4, 4], // 5. no combination but number shifted to bottom
			])
	})
})
