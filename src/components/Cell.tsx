import * as React from "react"
import clsx from "clsx"

export type ICell = number | null

interface ICellProps {
	value: ICell
}

export function Cell({ value }: ICellProps) {
	return (
		<div className="w-10 md:w-16 h-10 md:h-16 flex items-center justify-center text-4xl text-gray-900 p-px md:p-1">
			<div
				className={clsx(
					"w-full h-full rounded-md flex items-center justify-center",
					getClassForValue(value)
				)}
			>
				{value}
			</div>
		</div>
	)
}

function getClassForValue(value: ICell) {
	const defaultClass = "bg-gray-300"
	if (typeof value !== "number") return defaultClass

	const valueStyleMapping: Record<number, string> = {
		2: "bg-emerald-50",
		4: "bg-emerald-100",
		8: "bg-emerald-200",
		16: "bg-emerald-300 text-gray-50",
		32: "bg-emerald-400 text-gray-100",
		64: "bg-emerald-500 text-gray-100",
		128: "bg-emerald-600 text-gray-100",
		256: "bg-emerald-700 text-gray-100",
		512: "bg-emerald-800 text-gray-100",
		1028: "bg-emerald-900 text-gray-100",
		2048: "bg-amber-300",
		4096: "bg-amber-500 text-gray-50",
	}

	return valueStyleMapping[value] ?? defaultClass
}
