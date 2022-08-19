import isEqual from "lodash/isEqual"
import { useKeyPressEvent, useStateWithHistory } from "react-use"
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

type BindedKeyboardKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
function isBindedKeyboardKey(key: string): key is BindedKeyboardKey {
	const bindedKeyboardKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
	return bindedKeyboardKeys.includes(key)
}

export type MoveDirection = "top" | "bottom" | "left" | "right"

const eventKeyToMoveDirectionMapping: Record<BindedKeyboardKey, MoveDirection> = {
	ArrowUp: "top",
	ArrowDown: "bottom",
	ArrowLeft: "left",
	ArrowRight: "right",
}

function useGrid() {
	const [grid, setGrid] = useStateWithHistory(makeRandomStartingGrid(), 20)

	function onKeyPress(event: KeyboardEvent) {
		if (!isBindedKeyboardKey(event.key)) {
			return
		}
		const moveDirection = eventKeyToMoveDirectionMapping[event.key]

		const recomputedGrid = recomputeGridForMove(grid, moveDirection)
		if (isEqual(grid, recomputedGrid)) return

		const recomputedGridWithRandomNewCell = injectRandomNewCellWhereEmpty(recomputedGrid)
		setGrid(recomputedGridWithRandomNewCell)
	}

	useKeyPressEvent("ArrowUp", onKeyPress)
	useKeyPressEvent("ArrowDown", onKeyPress)
	useKeyPressEvent("ArrowLeft", onKeyPress)
	useKeyPressEvent("ArrowRight", onKeyPress)

	return grid
}

export function use2048() {
	const grid = useGrid()

	const score = computeScore(grid)
	const isDefeated = checkForDefeat(grid)

	return { grid, score, isDefeated }
}
