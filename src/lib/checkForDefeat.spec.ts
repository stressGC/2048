import { checkForDefeat } from "./checkForDefeat"
import type { IGrid } from "../components/Grid/Grid"

describe("Check for defeat", () => {
	function expectGrid(grid: IGrid) {
		return {
			toBeDefeated: function () {
				expect(checkForDefeat(grid)).toBe(true)
			},
			notToBeDefeated: function () {
				expect(checkForDefeat(grid)).toBe(false)
			},
		}
	}
	it("should not consider the user defeated if empty cells remain", async () => {
		expectGrid([
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null],
		]).notToBeDefeated()
		expectGrid([
			[2, 4, 2, null],
			[2, 4, 8, 8],
			[2, 32, 16, 16],
			[2, 64, 128, 256],
		]).notToBeDefeated()
	})
	it("should consider the user defeated if no move is possible", async () => {
		expectGrid([
			[2, 4, 2, 4],
			[4, 2, 4, 2],
			[2, 4, 2, 4],
			[4, 2, 4, 2],
		]).toBeDefeated()
	})
})
