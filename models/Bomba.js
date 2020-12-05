class Bomba {
  constructor(caudal) {
    this.caudal = caudal;
  }

  get getCaudal() {
    return this.caudal;
  }
}

module.exports.Bomba = Bomba;
