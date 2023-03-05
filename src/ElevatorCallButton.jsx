import { useState, useEffect, useMemo } from "react";

const ElevatorState = {
	Call: "Call",
	Waiting: "Waiting",
	Arrived: "Arrived",
};

const Colors = {
	Green: '#69cc89',
	Red: '#e45051',
	White: '#ffffff'
};

const ElevatorCallButton = ({
	floor = 0,
	onCall = () => { },
	hasQueue = false
}) => {
	const [elevatorState, setElevatorState] = useState(ElevatorState.Call);

	useEffect(() => {
		if (!hasQueue && elevatorState === ElevatorState.Waiting) {
			setElevatorState(ElevatorState.Arrived);

			setTimeout(() => {
				setElevatorState(ElevatorState.Call);
			}, 2000);
		}
	}, [hasQueue]);

	const colorObject = useMemo(() => {
		switch (elevatorState) {
			default:
			case ElevatorState.Call:
				return {
					background: Colors.Green,
					text: Colors.White,
					border: Colors.Green
				};

			case ElevatorState.Arrived:
				return {
					background: Colors.White,
					text: Colors.Green,
					border: Colors.Green
				};

			case ElevatorState.Waiting:
				return {
					background: Colors.Red,
					text: Colors.White,
					border: Colors.Red
				}
		}
	}, [elevatorState]);

	return (
		<button
			style={{
				width: '70px',
				borderRadius: '2px',
				backgroundColor: colorObject.background,
				color: colorObject.text,
				border: `1px solid ${colorObject.border}`
			}}
			onClick={() => {
				if (ElevatorState.Call) {
					setElevatorState(ElevatorState.Waiting);
					onCall(floor);
				}
			}}
		>
			{elevatorState}
		</button>
	);
};

export default ElevatorCallButton;
