import React from 'react';
// import PropTypes from 'prop-types';
import categories from '../mocks/categories';
import coordinators from '../mocks/employes';

class AddEventPage extends React.Component {
  state = {
    title: '',
    description: '',
    category: undefined,
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

  onInputChange = (e) => {
    const { errors } = this.state;
    const { name, value } = e.target;

    switch (name) {
      case 'title':
        this.setState(() => ({ [name]: value }));
        break;
      case 'description':
        if (value.length <= 140) {
          this.setState(() => ({ [name]: value }));
        }
        break;
      case 'eventFee':
        if (!value || value.match(/^[0-9]*$/)) {
          this.setState(() => ({ [name]: value }));
        }
        break;
      case 'reward':
        if (!value || value.match(/^[0-9]*$/)) {
          this.setState(() => ({ [name]: value }));
        }
        break;
      case 'duration':
        if (!value || value.match(/^[0-9]*$/)) {
          this.setState(() => ({ [name]: value }));
        }
        break;
      case 'category':
        this.setState(() => ({ [name]: value }));
        break;
      case 'paidEvent':
        this.setState(() => ({
          [name]: JSON.parse(value),
          eventFee: '',
        }));
        break;
      case 'coordinator':
        this.setState(() => ({
          coordinator: {
            id: value,
            email: coordinators[value].email,
          },
        }));
        break;
      case 'email':
        this.setState(prevState => ({
          coordinator: {
            ...prevState.coordinator,
            email: value,
          },
        }));
        break;
      case 'date':
        this.setState(prevState => ({
          dateTime: {
            ...prevState.dateTime,
            date: value,
          },
        }));
        break;
      case 'time':
        this.setState(prevState => ({
          dateTime: {
            ...prevState.dateTime,
            time: value,
          },
        }));
        break;
      case 'am':
        this.setState(prevState => ({
          dateTime: {
            ...prevState.dateTime,
            am: JSON.parse(value),
          },
        }));
        break;
      default:
        break;
    }

    if (errors[name] && errors[name].length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: '',
        },
      }));
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
      category,
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
        category_id: category,
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
      category,
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
                onChange={this.onInputChange}
                name="title"
                id="title"
                placeholder="Make it short and clear"
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
                onChange={this.onInputChange}
                name="description"
                id="description"
                placeholder="Write about your event, be creative"
              />
            </label>
            <p>{description.length}/140</p>
          </div>
          <div className="input-group">
            <select
              value={category}
              defaultValue=""
              onChange={this.onInputChange}
              name="category"
            >
              <option value="" disabled>
                Select category (skills, interests, locations)
              </option>
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
                <input
                  type="radio"
                  checked={!paidEvent}
                  onChange={this.onInputChange}
                  value={!!0}
                  name="paidEvent"
                  id="free-event"
                />
                Free event
              </label>
            </div>
            <div className="input-group__inner-group">
              <label htmlFor="paid-event">
                <input
                  type="radio"
                  checked={paidEvent}
                  onChange={this.onInputChange}
                  value={!!1}
                  name="paidEvent"
                  id="paid-event"
                />
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
                  onChange={this.onInputChange}
                  name="eventFee"
                  placeholder="Fee"
                />
                $
              </div>
            )}
          </div>
          <div className="input-group">
            Reward
            <input
              type="text"
              value={reward}
              onChange={this.onInputChange}
              placeholder="Number"
              name="reward"
            />
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
              onChange={this.onInputChange}
              name="coordinator"
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
              onChange={this.onInputChange}
              name="email"
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
              onChange={this.onInputChange}
              name="date"
            />
            <div className="input-group__inner-group">
              at
              <input
                style={{ border: errors.time.length > 0 ? '1px solid red' : '' }}
                type="time"
                min="00:00"
                max="12:00"
                value={dateTime.time}
                onChange={this.onInputChange}
                name="time"
              />
              <label htmlFor="am">
                AM
                <input type="radio" checked={dateTime.am} onChange={this.onInputChange} value={!!1} id="am" name="am" />
              </label>
              <label htmlFor="pm">
                PM
                <input type="radio" checked={!dateTime.am} onChange={this.onInputChange} value={!!0} id="pm" name="am" />
              </label>
            </div>
          </div>
          <div className="input-group">
            Duration
            <div className="input-group__inner-group">
              <input
                type="text"
                value={duration}
                onChange={this.onInputChange}
                name="duration"
                placeholder="Number"
              /> hour
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
