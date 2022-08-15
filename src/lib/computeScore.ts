import type { IGrid } from "../components/Grid/Grid"

export function computeScore(grid: IGrid): number {
	const flattenNumberCells = grid.flat().filter((cell): cell is number => typeof cell === "number")
	const score = flattenNumberCells.reduce((currentScore, value) => currentScore + value, 0)
	return score
}
