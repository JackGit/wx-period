import AV from '../libs/AV.js'

class Temperature extends AV.Object {
  get temperature () {
    return this.get('temperature')
  }

  set temperature(value) {
    this.set('temperature', value)
  }

  get inPeriod () {
    return this.get('inPeriod')
  }

  set inPeriod (value) {
    this.set('inPeriod', value)
  }

  get year () {
    return this.get('year')
  }

  set year (value) {
    this.set('year', value)
  }

  get month () {
    return this.get('month')
  }

  set month (value) {
    this.set('month', value)
  }

  get date () {
    return this.get('date')
  }

  set date (value) {
    this.set('date', value)
  }

  get userId () {
    return this.get('userId')
  }

  set userId (value) {
    this.set('userId', value)
  }

  get note () {
    return this.get('note')
  }

  set note (value) {
    this.set('note', value)
  }
}

AV.Object.register(Temperature, 'Temperature')
module.exports = Temperature
