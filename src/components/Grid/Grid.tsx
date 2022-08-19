import * as React from "react"
import useKeyPressEvent from "react-use/lib/useKeyPressEvent"
import { useSwipeable } from "react-swipeable"
import { IRow, Row } from "../Row"
import type { MoveDirection } from "../../hooks/use2048"

export type IGrid = IRow[]

export interface IGridProps {
	grid: IGrid
	handleGridMove: (moveDirection: MoveDirection) => void
}

export function Grid({ grid, handleGridMove }: IGridProps) {
	useKeyPressEvent("ArrowUp", () => handleGridMove("top"))
	useKeyPressEvent("ArrowDown", () => handleGridMove("bottom"))
	useKeyPressEvent("ArrowLeft", () => handleGridMove("left"))
	useKeyPressEvent("ArrowRight", () => handleGridMove("right"))

	const swipeHandlers = useSwipeable({
		onSwipedUp: () => handleGridMove("top"),
		onSwipedDown: () => handleGridMove("bottom"),
		onSwipedLeft: () => handleGridMove("left"),
		onSwipedRight: () => handleGridMove("right"),
		preventScrollOnSwipe: true,
	})

	return (
		<div className="w-42 h-42 md:w-66 md:h-66 bg-gray-500 rounded-lg p-1" {...swipeHandlers}>
			{grid.map((row, index) => {
				return <Row key={index} row={row} />
			})}
		</div>
	)
}
