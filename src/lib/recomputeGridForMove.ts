import { MoveDirection } from "../hooks/use2048"
import type { IGrid } from "../components/Grid/Grid"
import type { IRow } from "../components/Row"

const moveDirectionToHandlerMap: Record<MoveDirection, (currGrid: IGrid) => IGrid> = {
	right: handleRightMovement,
	left: handleLeftMovement,
	top: handleTopMovement,
	bottom: handleBottomMovement,
}

export function recomputeGridForMove(currGrid: IGrid, moveDirection: MoveDirection): IGrid {
	return moveDirectionToHandlerMap[moveDirection](currGrid)
}

function handleRightMovement(currGrid: IGrid): IGrid {
	return currGrid.map((currRow) => {
		return shiftAndCombineColumnsOrRow(currRow, { reverse: true })
	})
}

function handleLeftMovement(currGrid: IGrid): IGrid {
	return currGrid.map((currRow) => {
		return shiftAndCombineColumnsOrRow(currRow)
	})
}

function handleTopMovement(currGrid: IGrid): IGrid {
	const currGridAsColumns = inverseRowsAndColumns(currGrid)
	const newGridAsColumns = currGridAsColumns.map((currColumn) => shiftAndCombineColumnsOrRow(currColumn))
	const newGridAsRows = inverseRowsAndColumns(newGridAsColumns)
	return newGridAsRows
}

function handleBottomMovement(currGrid: IGrid): IGrid {
	const currGridAsColumns = inverseRowsAndColumns(currGrid)
	const newGridAsColumns = currGridAsColumns.map((currColumn) =>
		shiftAndCombineColumnsOrRow(currColumn, { reverse: true }),
	)
	const newGridAsRows = inverseRowsAndColumns(newGridAsColumns)
	return newGridAsRows
}

function inverseRowsAndColumns(grid: IGrid) {
	const gridSizeRange = [...new Array(grid.length).keys()]
	const inversedRowsAndColumns = gridSizeRange.reduce<IGrid>((acc, colIndex) => {
		const column = gridSizeRange.map((rowIndex) => {
			return grid[rowIndex][colIndex]
		})
		return [...acc, column]
	}, [])
	return inversedRowsAndColumns
}

function shiftAndCombineColumnsOrRow(currColumnOrRow: IRow, options?: { reverse: boolean }): IRow {
	const { reverse } = options ?? {}
	const sortedColumnOrRow = reverse ? [...currColumnOrRow.reverse()] : [...currColumnOrRow]

	const numbers = sortedColumnOrRow.filter((maybeNumber): maybeNumber is number => typeof maybeNumber === "number")

	if (!numbers.length) return sortedColumnOrRow

	const combinedNumbers = combineNumbers(numbers)

	const nullItemsPadding = makeNullArray(sortedColumnOrRow.length - combinedNumbers.length)

	const suiteWithNullItemsPadding = reverse
		? [...nullItemsPadding, ...combinedNumbers.reverse()]
		: [...combinedNumbers, ...nullItemsPadding]

	return suiteWithNullItemsPadding
}

function combineNumbers(numbers: number[]): number[] {
	if (numbers.length < 2) {
		return numbers
	}

	const [firstItem, secondItem] = numbers
	return firstItem === secondItem
		? [firstItem + secondItem, ...combineNumbers(numbers.slice(2))]
		: [firstItem, ...combineNumbers(numbers.slice(1))]
}

function makeNullArray(length: number) {
	return new Array<null>(length).fill(null)
}
