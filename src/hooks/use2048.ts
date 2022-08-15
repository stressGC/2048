import * as React from "react"
import isEqual from "lodash/isEqual"
import { injectRandomNewCellWhereEmpty } from "../lib/injectRandomNewCellWhereEmpty"
import { recomputeGridForMove } from "../lib/recomputeGridForMove"
import { computeScore } from "../lib/computeScore"
import { checkForDefeat } from "../lib/checkForDefeat"
import type { IGrid } from "../components/Grid/Grid"

const empty4x4Grid: IGrid = [
	[null, null, null, null],
	[null, null, null, null],
	[null, null, null, null],
	[null, null, null, null],
]

export type MoveDirection = "top" | "bottom" | "left" | "right"

const eventKeyToMoveDirectionMapping: Record<string, MoveDirection> = {
	ArrowUp: "top",
	ArrowDown: "bottom",
	ArrowLeft: "left",
	ArrowRight: "right",
}

function useGrid() {
	// gridHistory might be useful later on :)
	const [gridHistory, setGridHistory] = React.useState<IGrid[]>(
		() => [injectRandomNewCellWhereEmpty(injectRandomNewCellWhereEmpty(empty4x4Grid))], // add two random cells
	)

	React.useEffect(() => {
		function onKeyPress(event: KeyboardEvent) {
			const moveDirection = eventKeyToMoveDirectionMapping[event.key]
			if (moveDirection === undefined) return

			const currentGrid = gridHistory[gridHistory.length - 1]
			const recomputedGrid = recomputeGridForMove(currentGrid, moveDirection)
			if (isEqual(currentGrid, recomputedGrid)) return

			const recomputedGridWithRandomNewCell = injectRandomNewCellWhereEmpty(recomputedGrid)
			setGridHistory((prevGridHistory) => [...prevGridHistory, recomputedGridWithRandomNewCell])
		}
		document.addEventListener("keydown", onKeyPress)
		return () => {
			document.removeEventListener("keydown", onKeyPress)
		}
	}, [gridHistory])

	return {
		grid: gridHistory[gridHistory.length - 1],
	}
}

export function use2048() {
	const { grid } = useGrid()

	const score = computeScore(grid)
	const isDefeated = checkForDefeat(grid)

	return { grid, score, isDefeated }
}
