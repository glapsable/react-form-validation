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
      id: 3,
      email: 'walter.nelson@hussa.rs',
    },
    dateTime: {
      date: '',
      time: '',
      am: true,
    },
    duration: '',
    errors: {
      title: '',
      description: '',
      coordinator: '',
      emailMatch: '',
      eventFee: '',
      date: '',
      time: '',
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
    const { errors } = this.state;
    if (eventType === 'paidEvent') {
      this.setState(() => ({ paidEvent: true }));
    } else if (eventType === 'freeEvent') {
      this.setState(() => ({
        paidEvent: false,
        eventFee: '',
      }));
      if (errors.eventFee) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            eventFee: false,
          },
        }));
      }
    }
  };

  onEventFeeChange = (e) => {
    const eventFee = e.target.value;
    const { errors } = this.state;
    if (!eventFee || eventFee.match(/^[0-9]*$/)) {
      this.setState(() => ({ eventFee }));
    }
    if (errors.eventFee) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          eventFee: false,
        },
      }));
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
    const { errors } = this.state;
    this.setState(() => ({
      coordinator: {
        id,
        email: coordinators[id].email,
      },
    }));
    if (errors.coordinator) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          coordinator: false,
        },
      }));
    }
  };

  onEmailChange = (e) => {
    const email = e.target.value;
    const { errors } = this.state;
    this.setState(prevState => ({
      coordinator: {
        ...prevState.coordinator,
        email,
      },
    }));
    if (errors.emailMatch) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          emailMatch: false,
        },
      }));
    }
  };

  onDateChange = (e) => {
    const date = e.target.value;
    const { errors } = this.state;
    this.setState(prevState => ({
      dateTime: {
        ...prevState.dateTime,
        date,
      },
    }));
    if (errors.date) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          date: false,
        },
      }));
    }
  };

  onTimeChange = (e) => {
    const time = e.target.value;
    const { errors } = this.state;
    this.setState(prevState => ({
      dateTime: {
        ...prevState.dateTime,
        time,
      },
    }));
    if (errors.time) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          time: false,
        },
      }));
    }
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

  formValid = (dataToValidate) => {
    let valid = true;

    Object.values(dataToValidate).forEach((val) => {
      if (!val) {
        valid = false;
      }
    });

    return valid;
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      title,
      description,
      coordinator,
      paidEvent,
      eventFee,
      categoryId,
      reward,
      dateTime,
    } = this.state;

    if (this.formValid({
      title,
      description,
      coordinator: coordinator.id,
      paidEvent,
      eventFee,
    })) {
      const data = {
        title,
        description,
        category_id: categoryId,
        paid_event: paidEvent,
        event_fee: eventFee || 0,
        reward: reward || 0,
        date: `${dateTime.date}T${dateTime.time}`,
        duration: 1000,
        coordinator: {
          email: coordinator.email,
          id: coordinator.id,
        },
      };
      console.log(data);
    } else {
      console.log('NIE POSZLO');
    }

    if (!title.trim()) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          title: 'Fill title field',
        },
      }));
    }
    if (!description.trim()) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          description: 'Fill description field',
        },
      }));
    }
    if (!coordinator.id) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          coordinator: 'Choose coordinator',
        },
      }));
    }
    if (coordinator.email && !coordinator.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          emailMatch: 'Wrong email address',
        },
      }));
    }
    if (paidEvent && !eventFee) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          eventFee: 'Fill Fee field',
        },
      }));
    }
    if (!dateTime.date) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          date: 'Fill date field',
        },
      }));
    }
    if (!dateTime.time) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          time: 'Fill time field',
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
      <form onSubmit={this.onSubmit} noValidate>
        <div>
          <h2>About</h2>
          <hr />
          <div className="input-group">
            <label htmlFor="title">
              Title
              <input
                type="text"
                style={{ border: errors.title.length > 0 ? '1px solid red' : '' }}
                className={errors.title.length > 0 ? 'error' : ''}
                value={title}
                onChange={this.onTitleChange}
                id="title"
              />
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="description">
              Description
              <textarea
                style={{ border: errors.description.length > 0 ? '1px solid red' : '' }}
                className={errors.description.length > 0 ? 'error' : ''}
                value={description}
                onChange={this.onDescriptionChange}
                id="description"
                placeholder="Write about your event, be creative"
              />
            </label>
            <p>{description.length}/140</p>
          </div>
          <div className="input-group">
            <select value={categoryId} defaultValue="" onChange={this.onCategoryChange}>
              <option value="" disabled>Select category (skills, interests, locations)</option>
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
                <input
                  style={{ border: errors.eventFee.length > 0 ? '1px solid red' : '' }}
                  className={errors.eventFee.length > 0 ? 'error' : ''}
                  type="text"
                  value={eventFee}
                  onChange={this.onEventFeeChange}
                  placeholder="Fee"
                />
                $
              </div>
            )}
          </div>
          <div className="input-group">
            Reward
            <input type="text" value={reward} onChange={this.onRewardChange} placeholder="Number" name="reward" />
            reward points for attendance
          </div>
        </div>
        <div>
          <h2>Coordinator</h2>
          <hr />
          <div className="input-group">
            Responsible
            <select
              style={{ border: errors.coordinator.length > 0 ? '1px solid red' : '' }}
              className={errors.coordinator.length > 0 ? 'error' : ''}
              value={coordinator.id}
              onChange={this.onCoordinatorChange}
            >
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
            <input
              style={{ border: errors.emailMatch.length > 0 ? '1px solid red' : '' }}
              className={errors.emailMatch.length > 0 ? 'error' : ''}
              type="text"
              value={coordinator.email}
              onChange={this.onEmailChange}
            />
          </div>
        </div>
        <div>
          <h2>When</h2>
          <hr />
          <div className="input-group">
            Starts on*
            <input
              style={{ border: errors.date.length > 0 ? '1px solid red' : '' }}
              type="date"
              value={dateTime.date}
              onChange={this.onDateChange}
            />
            <div className="input-group__inner-group">
              at
              <input
                style={{ border: errors.time.length > 0 ? '1px solid red' : '' }}
                type="time"
                min="00:00"
                max="12:00"
                value={dateTime.time}
                onChange={this.onTimeChange}
              />
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

AddEventPage.propTypes = {
  // history: PropTypes.func.isRequired,
};

export default AddEventPage;
