import cloneDeep from "lodash/cloneDeep"
import type { IGrid } from "../components/Grid/Grid"

export function injectRandomNewCellWhereEmpty(grid: IGrid): IGrid {
	const emptyCellsCoordinates: Array<[number, number]> = []

	const gridSizeRange = [...new Array(grid.length).keys()]

	for (const row of gridSizeRange) {
		for (const col of gridSizeRange) {
			const item = grid[row][col]
			if (item === null) {
				emptyCellsCoordinates.push([row, col])
			}
		}
	}

	const [selectedRow, selectedCol] = emptyCellsCoordinates[Math.floor(Math.random() * emptyCellsCoordinates.length)]

	const newGrid = cloneDeep(grid)
	newGrid[selectedRow][selectedCol] = Math.random() > 0.5 ? 4 : 2
	return newGrid
}
