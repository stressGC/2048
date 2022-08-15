import isEqual from "lodash/isEqual"
import { recomputeGridForMove } from "./recomputeGridForMove"
import type { IGrid } from "../components/Grid/Grid"
import type { MoveDirection } from "../hooks/use2048"

export function checkForDefeat(grid: IGrid): boolean {
	const gridContainsEmptyCells = grid.flat().some((cell) => cell === null)
	if (gridContainsEmptyCells) {
		return false
	}

	const possibleMoves: MoveDirection[] = ["top", "bottom", "left", "right"]
	return possibleMoves.some((moveDirection) => {
		const moveResultingGrid = recomputeGridForMove(grid, moveDirection)
		return !isEqual(grid, moveResultingGrid)
	})
}
