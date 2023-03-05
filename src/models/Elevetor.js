export class Elevetor {
    constructor(totalFloors) {
        this.totalFloors = totalFloors;
        this.floor = 0;
        this.isBusy = flase;
    }

    setFloor(floorNum) {
        this.floor = floorNum;
    }

    setIseBusy(isBusy) {
        this.isBusy = isBusy;
    }
}

export default Elevetor;