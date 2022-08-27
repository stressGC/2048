import * as React from "react"
import { use2048 } from "./hooks/use2048"
import { Grid } from "./components/Grid/Grid"

export function App() {
	const { score, grid, isDefeated, handleGridMove } = use2048()

	return (
		<div className="w-screen h-screen flex items-center justify-center flex-col">
			<div className="bg-gray-500 p-2 rounded-lg h-10 w-10 flex flex-col items-center justify-center mb-4">
				<p className="text-gray-200">Score</p>
				<h1 className="text-4xl text-gray-100">{score}</h1>
			</div>
			{isDefeated ? (
				<h2 className="text-4xl">Defeat!</h2>
			) : (
				<Grid handleGridMove={handleGridMove} grid={grid} />
			)}
		</div>
	)
}
