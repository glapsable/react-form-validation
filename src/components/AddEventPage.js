import React from 'react';
// import PropTypes from 'prop-types';
import categories from '../mocks/categories';
import coordinators from '../mocks/employes';

class AddEventPage extends React.Component {
  state = {
    title: '',
    description: '',
    categoryId: undefined,
    paidEvent: false,
    eventFee: '',
    reward: '',
    coordinator: {
      id: '',
      email: '',
    },
    dateTime: {
      date: '',
      time: '',
      am: true,
    },
    duration: '',
    errors: {
      title: false,
      description: false,
      coordinator: false,
    },
  };

  onTitleChange = (e) => {
    const title = e.target.value.trim();
    const { errors } = this.state;
    this.setState(() => ({ title }));
    if (errors.title === true) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          title: false,
        },
      }));
    }
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    const { errors } = this.state;
    if (description.length <= 140) {
      this.setState(() => ({ description }));
    }
    if (errors.description === true) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          description: false,
        },
      }));
    }
  };

  onCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value, 10);
    this.setState(() => ({ categoryId }));
  };

  onEventPaidChange = (e) => {
    const eventType = e.target.name;
    if (eventType === 'paidEvent') {
      this.setState(() => ({ paidEvent: true }));
    } else if (eventType === 'freeEvent') {
      this.setState(() => ({ paidEvent: false }));
    }
  };

  onEventFeeChange = (e) => {
    const eventFee = e.target.value;
    if (!eventFee || eventFee.match(/^[0-9]*$/)) {
      this.setState(() => ({ eventFee }));
    }
  };

  onRewardChange = (e) => {
    const reward = e.target.value;
    if (!reward || reward.match(/^[0-9]*$/)) {
      this.setState(() => ({ reward }));
    }
  };

  onCoordinatorChange = (e) => {
    const id = e.target.value;
    this.setState(() => ({
      coordinator: {
        id,
        email: coordinators[id].email,
      },
    }));
  };

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(prevState => ({
      coordinator: {
        ...prevState.coordinator,
        email,
      },
    }));
  };

  onDateChange = (e) => {
    const date = e.target.value;
    this.setState(prevState => ({
      dateTime: {
        ...prevState.dateTime,
        date,
      },
    }));
  };

  onTimeChange = (e) => {
    const time = e.target.value;
    this.setState(prevState => ({
      dateTime: {
        ...prevState.dateTime,
        time,
      },
    }));
  };

  onAmPmChange = (e) => {
    const amPm = e.target.name;
    if (amPm === 'am') {
      this.setState(prevState => ({
        dateTime: {
          ...prevState.dateTime,
          am: true,
        },
      }));
    } else if (amPm === 'pm') {
      this.setState(prevState => ({
        dateTime: {
          ...prevState.dateTime,
          am: false,
        },
      }));
    }
  };

  onDurationChange = (e) => {
    const duration = e.target.value;
    if (duration.match(/^[0-9]*$/)) {
      this.setState({
        duration,
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, coordinator } = this.state;
    if (!title.trim()) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          title: true,
        },
      }));
    }
    if (!description.trim()) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          description: true,
        },
      }));
    }
    if (!coordinator.id) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          coordinator: true,
        },
      }));
    }
  };

  render() {
    const {
      title,
      description,
      categoryId,
      paidEvent,
      eventFee,
      reward,
      coordinator,
      dateTime,
      duration,
      errors,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <h2>About</h2>
          <hr />
          <div className="input-group">
            <label htmlFor="title">
              Title
              <input type="text" className={errors.title === true ? 'error' : ''} value={title} onChange={this.onTitleChange} id="title" />
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="description">
              Description
              <textarea className={errors.description === true ? 'error' : ''} value={description} onChange={this.onDescriptionChange} id="description" />
            </label>
            <p>{description.length}/140</p>
          </div>
          <div className="input-group">
            <select value={categoryId} onChange={this.onCategoryChange}>
              {
                categories && categories.map(({ id, name }) => (
                  <option value={id} key={id}>{name}</option>
                ))
              }
            </select>
          </div>
          <div className="input-group">
            Payment
            <div className="input-group__inner-group">
              <label htmlFor="free-event">
                <input type="radio" checked={!paidEvent} onChange={this.onEventPaidChange} name="freeEvent" id="free-event" />
                Free event
              </label>
            </div>
            <div className="input-group__inner-group">
              <label htmlFor="paid-event">
                <input type="radio" checked={paidEvent} onChange={this.onEventPaidChange} name="paidEvent" id="paid-event" />
                Paid event
              </label>
            </div>
            {paidEvent && (
              <div className="input-group__inner-group">
                <input type="text" value={eventFee} onChange={this.onEventFeeChange} placeholder="Fee" />
                $
              </div>
            )}
          </div>
          <div className="input-group">
            Reward
            <input type="text" value={reward} onChange={this.onRewardChange} placeholder="Number" />
            reward points for attendance
          </div>
        </div>
        <div>
          <h2>Coordinator</h2>
          <hr />
          <div className="input-group">
            Responsible
            <select value={coordinator.id} onChange={this.onCoordinatorChange}>
              <optgroup label="Me">
                <option value={coordinators[3].id}>{`${coordinators[3].name} ${coordinators[3].lastname}`}</option>
              </optgroup>
              <optgroup label="Others">
                {
                  coordinators && coordinators.map(({ id, name, lastname }) => (
                    <option value={id} key={id}>{`${name} ${lastname}`}</option>
                  ))
                }
              </optgroup>
            </select>
          </div>
          <div className="input-group">
            Email
            <input type="text" value={coordinator.email} onChange={this.onEmailChange} />
          </div>
        </div>
        <div>
          <h2>When</h2>
          <hr />
          <div className="input-group">
            Starts on*
            <input type="date" value={dateTime.date} onChange={this.onDateChange} />
            <div className="input-group__inner-group">
              at <input type="time" min="00:00" max="12:00" value={dateTime.time} onChange={this.onTimeChange} />
              <label htmlFor="am">
                AM
                <input type="radio" checked={dateTime.am} onChange={this.onAmPmChange} id="am" name="am" />
              </label>
              <label htmlFor="pm">
                PM
                <input type="radio" checked={!dateTime.am} onChange={this.onAmPmChange} id="pm" name="pm" />
              </label>
            </div>
          </div>
          <div className="input-group">
            Duration
            <div className="input-group__inner-group">
              <input type="text" value={duration} onChange={this.onDurationChange} placeholder="Number" /> hour
            </div>
          </div>
        </div>
        <button type="submit">Publish event</button>
      </form>
    );
  }
}

// AddEventPage.propTypes = {
//   history: PropTypes.func.isRequired,
// };

export default AddEventPage;
