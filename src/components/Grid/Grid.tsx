import * as React from "react"
import { IRow, Row } from "../Row"

export type IGrid = IRow[]

export interface IGridProps {
	grid: IGrid
}

export function Grid({ grid }: IGridProps) {
	return (
		<div className="w-42 h-42 md:w-66 md:h-66 bg-gray-500 rounded-lg p-1">
			{grid.map((row, index) => {
				return <Row key={index} row={row} />
			})}
		</div>
	)
}
