import * as React from "react"
import { Cell, ICell } from "./Cell"

export type IRow = ICell[]

interface IRowProps {
	row: IRow
}

export function Row({ row }: IRowProps) {
	return (
		<div className="flex">
			{row.map((cellValue, index) => {
				return <Cell key={index} value={cellValue} />
			})}
		</div>
	)
}
