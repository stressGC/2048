import * as React from "react"
import clsx from "clsx"

export type ICell = number | null

interface ICellProps {
	value: ICell
}

// TODO: better CSS for this
export function Cell({ value }: ICellProps) {
	return (
		<div className="w-16 h-16 flex items-center justify-center text-5xl text-gray-900 p-1">
			<div className={clsx("w-full h-full rounded-md flex items-center justify-center", getBgClassNameForValue(value))}>
				{value}
			</div >
		</div>
	)
}

function getBgClassNameForValue(value: ICell) {
	if (typeof value !== "number") {
		return "bg-gray-300"
	}

	return "bg-gray-100"
}
