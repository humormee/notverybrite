import React from "react";
import { Link } from "react-router-dom";
import EventItem from "./event_item";
// import index_header from "../../../app/assets/images/index_header.jpg"

class EventsIndex extends React.Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   id: '',
    //   author_id: '',
    //   category: '',
    //   title: '',
    //   description: '',
    //   start_time: '',
    //   end_time: '',
    // }
    // this.handleClick = this.handleClick.bind(this);
    // this.renderCreateButton = this.renderCreateButton.bind(this);
  }

  renderCreateButton(){
    // if
  }
  componentDidMount(){
    this.props.fetchEvents();
  }

  // handleClick() {
  //   // this.props.history.push(`/events/${this.props.event.id}`)
  // }

  render() {

    

    const { events, fetchEvent } = this.props

    // debugger
    

    let eventItems = events.map(event => (
      <div className="event-index-item-container" id={`${event.id}`} key={`${event.id}`}>
        {/* <h1>Events</h1> */}
        <div className="event-index-item-image">
            <div></div>
          </div>
        <div className="event-index-item">
          
          <Link onClick={this.handleClick} to={`./events/${event.id}`}>{event.title}</Link>
          {/* <div className="index-item-dates">
            <p>{event.start_date}</p>
            <p>{event.end_date}</p>
          </div> */}
          <EventItem fetchEvent={fetchEvent} event={event} ></EventItem>
        </div>
        
      </div>
    ))
    // debugger

    return (
      <div>
       <div className="index-header-container">
            <div className="index-header">
            <p></p>
          </div>
        </div>
      <div className="event-index-container">
        
        {/* <img src={index_header} alt="now is your time" /> */}
        {/* <h1>Events</h1> */}
       

        <ul className="event-index">
          {eventItems}
        </ul>

        {this.renderCreateButton()}
      </div>
      </div>
    );
  }
}

export default EventsIndex;