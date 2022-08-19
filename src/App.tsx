import * as React from "react"
import { use2048 } from "./hooks/use2048"
import { Grid } from "./components/Grid/Grid"

export function App() {
	const { score, grid, isDefeated, handleGridMove } = use2048()

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div>
				<h1 className="text-4xl">{score}</h1>
				{isDefeated ? (
					<h2 className="text-4xl">Defeat!</h2>
				) : (
					<Grid handleGridMove={handleGridMove} grid={grid} />
				)}
			</div>
		</div>
	)
}
