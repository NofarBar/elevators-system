import { useState, useEffect, useMemo } from "react";
import ElevatorIcon from "./ElevatorIcon";

const ELEVATOR_TIME_IN_SECONDS = 3;
const BUSY_TIMEOUT_MS = 2000;

const Elevator = ({
	totalFloors = 10,
	movementQueue = [],
	onFloorArrive = () => { },
}) => {
	const [floor, setFloor] = useState(1);
	const [isBusy, setIsBusy] = useState(null);

	useEffect(() => {
		if (movementQueue.length === 0) {
			return;
		}

		setFloor(movementQueue[0]);
		setIsBusy(true);

		if (isBusy) {
			return;
		}

		setTimeout(() => {
			onFloorArrive(movementQueue[0]);

			setTimeout(() => {
				setIsBusy(false);
				setTimeout(() => setIsBusy(null), BUSY_TIMEOUT_MS);
			}, BUSY_TIMEOUT_MS);
		}, ELEVATOR_TIME_IN_SECONDS * 1000);
	}, [movementQueue, isBusy]);

	const color = useMemo(() => {
		switch (isBusy) {
			default:
			case null:
				return 'black';

			case true:
				return 'tomato';

			case false:
				return 'olive';
		}
	}, [isBusy])

	return (
		<div
			style={{
				position: "absolute",
				transition: `all ${ELEVATOR_TIME_IN_SECONDS}s ease`,
				bottom: `${((floor - 1) / totalFloors) * 100}%`,
			}}
		>
			<ElevatorIcon size={20} color={color} />
		</div>
	);
};

export default Elevator;
