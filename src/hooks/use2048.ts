import isEqual from "lodash/isEqual"
import { useStateWithHistory } from "react-use"
import { injectRandomNewCellWhereEmpty } from "../lib/injectRandomNewCellWhereEmpty"
import { recomputeGridForMove } from "../lib/recomputeGridForMove"
import { computeScore } from "../lib/computeScore"
import { checkForDefeat } from "../lib/checkForDefeat"
import type { IGrid } from "../components/Grid/Grid"

function makeRandomStartingGrid() {
	const empty4x4Grid: IGrid = [
		[null, null, null, null],
		[null, null, null, null],
		[null, null, null, null],
		[null, null, null, null],
	]
	return injectRandomNewCellWhereEmpty(injectRandomNewCellWhereEmpty(empty4x4Grid))
}

export type MoveDirection = "top" | "bottom" | "left" | "right"

function useGrid() {
	const [grid, setGrid] = useStateWithHistory(makeRandomStartingGrid(), 20)

	function handleGridMove(moveDirection: MoveDirection) {
		const recomputedGrid = recomputeGridForMove(grid, moveDirection)
		if (isEqual(grid, recomputedGrid)) return

		const recomputedGridWithRandomNewCell = injectRandomNewCellWhereEmpty(recomputedGrid)
		setGrid(recomputedGridWithRandomNewCell)
	}

	return { grid, handleGridMove }
}

export function use2048() {
	const { grid, handleGridMove } = useGrid()

	const score = computeScore(grid)
	const isDefeated = checkForDefeat(grid)

	return { grid, score, isDefeated, handleGridMove }
}
