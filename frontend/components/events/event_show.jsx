import React from 'react';
import { Link } from 'react-router-dom';
import EventItem from './event_item';
import EventEdit from './event_edit';

class EventShow extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isModalOpen: false
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.registrationButton = this.registrationButton.bind(this);
    this.renderButton = this.renderButton.bind(this);
    
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.id);
  }

  handleEdit(e) {
    e.preventDefault();
    this.props.history.push(`/events/${e.currentTarget.value}/edit`)
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteEvent(this.props.match.params.id)
    .then(() => this.props.history.push('/')).then(() => window.location.reload());
  }

  openModal() {
    e.preventDefault()
    this.setState({isModalOpen: true})
  }

  closeModal() {
    e.preventDefault()
    this.setState({isModalOpen: false})
  }

  registrationButton(e) {
    debugger
    // e.preventDefault();

    if(this.props.event.registrations && this.props.event.registrations[this.props.user.id]) {
      debugger
      return <button  value={this.props.event.id} onClick={this.openModal}>Register</button>
    } else {
      return <button value={this.props.event.id} onClick={this.closeModal}>Unregister</button>
    }
  }

  handleRegistration(e) {
    e.preventDefault();

    this.props.createRegistration(this.props.registration)
  }

  renderButton(){

    const { user } = this.props;
    const { id } = this.props.user;
    const { author_id } = this.props.event;
    if(user && id === author_id){
      return (
        <div className="edit-delete-event">
          <button className="edit-event" value={this.props.event.id} onClick={this.handleEdit}>Edit Event</button>
          <button className="delete-event" value={this.props.event.id} onClick={this.handleDelete}>Delete Event</button>
          {this.registrationButton()}
        </div>
      )
    };
  }

  render() {

    if (!this.props.event) {
      return null;
    }
  
    const { authorFName, authorLName, author_id, title, start_time, end_time, category, description }  = this.props.event;
    const { user } = this.props.user;


    const startDate = new Date(start_time.slice(0,-1));
    const endDate = new Date(end_time.slice(0,-1));
    const startDateString = startDate.toDateString();
    const dayMonthArr = startDateString.split(' ');
    const dayMonthString = dayMonthArr[0].concat(', ').concat(`${dayMonthArr[1]} `).concat(`${dayMonthArr[2]}, `).concat(dayMonthArr[3])
    
    const startDateArr = startDateString.split(' ').slice(1,-1);
    const monthDayString = startDateArr.join(' ');


    const formatStartTime = new Date(startDate.getTime())
            .toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
    const formatEndTime = new Date(endDate.getTime())
          .toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
      
    return (
      <div className="event-show-container">
        
        <div className="event-show-background">
          <div className="background-image">
            
          </div>
        </div>

        <div className="event-show">
          <div className="event-show-details">
            <div className="event-show-image">
              <div></div>
            </div>
            <div className="event-show-basic-info">
              <div className="date">
                <h3 className="month">{monthDayString.split(" ")[0].toUpperCase()}</h3>
                <h3 className="day">{monthDayString.split(" ")[1]}</h3>
              </div>
              
              <div>
                <h1 className="event-show-title">{title}</h1>
                <h3 className="event-show-host">{`by ${authorFName} ${authorLName}`}</h3>
              </div>
              
              <h3 className="event-show-category">{category}</h3>
            </div>

            <div className="event-show-date-time">
              <p className="event-show-date">Date and time</p>
              <br />
              <p className="event-show-time">{dayMonthString}
              <br />
              {`${formatStartTime} - ${formatEndTime}`}</p>
            </div>
            
            <div className="event-show-other-details">
              <h2>About this event</h2>
              

              <div className="event-show-description">{description}</div>
              <div>{this.renderButton()}</div>
            </div>
            
          </div>
        </div>

        {this.state.isModalOpen ? <div className="modal-container">
          <div className="modal">
            <i onClick={this.closeModal} className="fas fa-times"></i>
            <p>Are you registering or unregistering for this event?</p>
            <button onClick={() => this.handleRegistration()}>Register</button>
            <button onClick={this.closeModal}>Unregister</button>
          </div>
        </div> : null
        }

      </div>
    );
  }
}

export default EventShow;