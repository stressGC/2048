import { injectRandomNewCellWhereEmpty } from "./injectRandomNewCellWhereEmpty"
import type { IGrid } from "../components/Grid/Grid"

describe("Inject random cell to the grid", () => {
	const originalMathRandom = Math.random
	afterAll(() => {
		Math.random = originalMathRandom
	})

	function expectRandomCellInjection() {
		return {
			onGrid: function (initialGrid: IGrid) {
				return {
					toEqual: function (expectedGrid: IGrid) {
						expect(injectRandomNewCellWhereEmpty(initialGrid)).toEqual(expectedGrid)
					},
				}
			},
		}
	}

	it("should be able to inject random cell in the grid", async () => {
		Math.random = () => 0 // stub the real Math.random implementation to have a predictable behavior for testing purpose
		expectRandomCellInjection()
			.onGrid([
				[null, null, null, null],
				[null, null, null, null],
				[null, null, null, null],
				[null, null, null, null],
			])
			.toEqual([
				[2 /* first available cell */, null, null, null],
				[null, null, null, null],
				[null, null, null, null],
				[null, null, null, null],
			])

		expectRandomCellInjection()
			.onGrid([
				[4, null, 4, null],
				[null, null, null, null],
				[4, null, 4, 4],
				[null, null, 4, 16],
			])
			.toEqual([
				[4, 2 /* first available cell */, 4, null],
				[null, null, null, null],
				[4, null, 4, 4],
				[null, null, 4, 16],
			])

		Math.random = () => 0.99 // stub the real Math.random implementation to have a predictable behavior for testing purpose
		expectRandomCellInjection()
			.onGrid([
				[null, null, null, null],
				[null, null, null, null],
				[null, null, null, null],
				[null, null, null, null],
			])
			.toEqual([
				[null, null, null, null],
				[null, null, null, null],
				[null, null, null, null],
				[null, null, null, 4 /* last available cell */],
			])

		expectRandomCellInjection()
			.onGrid([
				[4, null, 4, null],
				[null, null, null, null],
				[4, null, 4, 4],
				[null, null, 4, 16],
			])
			.toEqual([
				[4, null, 4, null],
				[null, null, null, null],
				[4, null, 4, 4],
				[null, 4 /* last available cell */, 4, 16],
			])
	})
})
