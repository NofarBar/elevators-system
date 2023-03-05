import { useMemo, useState } from "react";
import Elevator from "./Elevator";
import ElevatorCallButton from "./ElevatorCallButton";

const Elevators = ({ floorCount = 10, elevatorCount = 5 }) => {
	const floors = useMemo(() => {
		return new Array(floorCount)
			.fill(null)
			.map((_, index) => index)
			.reverse();
	}, [floorCount]);
	const elevators = useMemo(() => {
		return new Array(elevatorCount).fill(null).map((_, index) => index);
	}, [elevatorCount]);

	const [availableElevatorsIds, setAvailableElevatorsIds] = useState([
		...elevators,
	]);
	const [movementQueue, setMovementQueue] = useState({});

	return (
		<div className="container">
			<div className="elevators">
				{elevators.map((elevatorId, shaftIndex) => {
					return (
						<div className="floor" key={`floor-${shaftIndex}`}>
							<Elevator
								elevatorId={elevatorId}
								totalFloors={floorCount}
								movementQueue={movementQueue[elevatorId]}

								onFloorArrive={(floor) => {
									setMovementQueue((prev) => {
										const newQueue = prev[elevatorId].filter((queuedFloor) => {
											return queuedFloor !== floor;
										});

										return {
											...prev,
											[elevatorId]: newQueue,
										};
									});

									// TODO: only
									setAvailableElevatorsIds(
										availableElevatorsIds.concat(elevatorId)
									);
								}}
							/>
							{floors.map((floor, index) => {
								return (
									<div
										key={`shaft-${floor}-${shaftIndex}`}
										className="elevator-shaft"
									>
									</div>
								);
							})}
						</div>
					);
				})}

			</div>
			<div className="buttons">
				{floors.map((floor) => {
					return (
						<ElevatorCallButton
							floor={floor}
							hasQueue={
								Object.values(movementQueue).filter((elevator) => {
									return elevator.includes(floor + 1);
								}).length > 0
							}
							onCall={(floorIndex) => {
								let nextElevatorId;

								if (availableElevatorsIds.length > 0) {
									nextElevatorId = availableElevatorsIds[0];
								} else {
									nextElevatorId = Object.entries(movementQueue).reduce(
										(
											leastBusyElevatorId,
											[elevatorId, movementQueue]
										) => {
											if (
												movementQueue.length <
												movementQueue[leastBusyElevatorId]?.length
											) {
												return elevatorId;
											}

											return leastBusyElevatorId;
										},
										0
									);
								}

								setAvailableElevatorsIds(
									availableElevatorsIds.filter((id) => {
										return id !== nextElevatorId;
									})
								);
								setMovementQueue((prev) => {
									const newMovementQueue = (
										prev[nextElevatorId] || []
									).concat(floorIndex + 1);

									return {
										...prev,
										[nextElevatorId]: newMovementQueue,
									};
								});
							}}
						/>
					)
				})}
			</div>
		</div>
	);
};

export default Elevators;
