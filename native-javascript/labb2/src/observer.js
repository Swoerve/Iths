export default class Observer {
  #value;
  #subscribers = []; // list of functions we observe with

  constructor(value) {
    this.#value = value;
  }

  // Get/Read the value of this observable
  get value() {
    return this.#value;
  }

  // Set a new value in this observable
  set value(newValue) {
    this.#value = newValue;
    this.call();
  }

  /**
   * 
   * @param {*} observer a function to call on value change
   */
  subscribe(observer) {
    console.log("subscribing")
    console.log(observer)
    this.#subscribers.push(observer);
  }

  /**
   * 
   * @param {*} observer a function to remove from this observer
   */
  unsubscribe(observer) {
    this.#subscribers = this.#subscribers.filter(sub => sub !== observer);
  }

  // calls all functions that are in the subscribers list with the new/current value of the observer
  call() {
    this.#subscribers.forEach(subscriber => subscriber(this.#value));
  }
}
