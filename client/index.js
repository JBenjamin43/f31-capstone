const baseURL = "http://localhost:4020"

const addEve = document.querySelector('#createNewEvent')

const displayEve = document.querySelector('#eventDisplay')

const createToDoList = (events) => {
    const newToDoEvent = document.createElement('section')
    newToDoEvent.classList.add('toDoList')

    newToDoEvent.innerHTML = 
    `
    <p>${events.eventName}</p>
    <p>${events.eventDate}</p>
    <p>${events.description}</p>
    <p>${events.timeSpent}</p>
    <p>${events.startTime}</p>
    <p>${events.eventStatus}</p>
    <button onclick="deleteEvents(${events.id})">delete</button>
    <button onclick="updateEvents(${events.id})">update</button>
    `
    displayEve.appendChild(newToDoEvent)
}

const displayEvent = (arr) => {
    for (let i = 0; i < arr.length; i++){
        console.log(arr[i])
        createToDoList(arr[i])
    }
}

const getEvents = () => {
    axios.get(`${baseURL}/events`)
    .then((res)=> {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}
const addEvents = () => {

    displayEve.innerHTML = ''

    let bodyObj = {
        eventName: eventName.value,
        eventDate: eventDate.value,
        description: description.value,
        timeSpent: timeSpent.value,
        startTime: startTime.value,
        eventStatus: "In-progress"
    }
    console.log(bodyObj)

    axios.post(`${baseURL}/addEvents`, bodyObj)
    .then((res)=> {

        eventName.value = ''
        eventDate.value = ''
        description.value = ''
        timeSpent.value = ''
        startTime.value = ''

        console.log(res.data)
        displayEvent(res.data)
    })
    .catch((err) => {
        console.log(err)
    })

}

const deleteEvents = (id) => {
    axios.delete(`${baseURL}/deleteEvents/${id}`)
    .then((res) => {
        displayEve.innerHTML = ''
        
        displayEvent(res.data)
    })
    .catch((err)=> {
        console.log(err)
    })

}
///// needs to be added to the updated event table
const updateEvents = (id) => {
    axios.put(`${baseURL}/updateEvents/${id}`)
    .then((res) => {
        displayEve.innerHTML = ''
        displayEvent(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}



addEve.addEventListener('click', addEvents)

getEvents()



class Timer {
    constructor(root) {
      root.innerHTML = Timer.getHTML();
  
      this.el = {
        minutes: root.querySelector(".timer__part--minutes"),
        seconds: root.querySelector(".timer__part--seconds"),
        control: root.querySelector(".timer__btn--control"),
        reset: root.querySelector(".timer__btn--reset")
      };
  
      this.interval = null;
      this.remainingSeconds = 0;
  
      this.el.control.addEventListener("click", () => {
        if (this.interval === null) {
          this.start();
        } else {
          this.stop();
        }
      });
  
      this.el.reset.addEventListener("click", () => {
        const inputMinutes = prompt("Enter number of minutes:");
  
        if (inputMinutes < 60) {
          this.stop();
          this.remainingSeconds = inputMinutes * 60;
          this.updateInterfaceTime();
        }
      });
    }
  
    updateInterfaceTime() {
      const minutes = Math.floor(this.remainingSeconds / 60);
      const seconds = this.remainingSeconds % 60;
  
      this.el.minutes.textContent = minutes.toString().padStart(2, "0");
      this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }
  
    updateInterfaceControls() {
      if (this.interval === null) {
        this.el.control.innerHTML = `<span class="material-icons">start</span>`;
        this.el.control.classList.add("timer__btn--start");
        this.el.control.classList.remove("timer__btn--stop");
      } else {
        this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
        this.el.control.classList.add("timer__btn--stop");
        this.el.control.classList.remove("timer__btn--start");
      }
    }
  
    start() {
      if (this.remainingSeconds === 0) return;
  
      this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.updateInterfaceTime();
  
        if (this.remainingSeconds === 0) {
          this.stop();
        }
      }, 1000);
  
      this.updateInterfaceControls();
    }
  
    stop() {
      clearInterval(this.interval);
  
      this.interval = null;
  
      this.updateInterfaceControls();
    }
  
    static getHTML() {
      return `
              <span class="timer__part timer__part--minutes">00</span>
              <span class="timer__part">:</span>
              <span class="timer__part timer__part--seconds">00</span>
              <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                  <span class="material-icons">start</span>
              </button>
              <button type="button" class="timer__btn timer__btn--reset">
                  <span class="material-icons">timer</span>
              </button>
          `;
    }
  }
  
  new Timer(
      document.querySelector(".timer")
  );


  const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */
function formatTime(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

/**
 * @param {Date} date
 */
function formatDate(date) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
  dateElement.textContent = formatDate(now);
}, 200);

