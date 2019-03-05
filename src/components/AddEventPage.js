import React from 'react';
import PropTypes from 'prop-types';
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
      email: '',
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
        if (!value || value.split(':')[0].match(/^(1[0-2]|0?[1-9])$/)) {
          this.setState(prevState => ({
            dateTime: {
              ...prevState.dateTime,
              time: value,
            },
          }));
        }
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
      duration,
      errors,
    } = this.state;

    // Errors messages
    const formErrors = errors;
    formErrors.title = !title ? 'Title cannot be empty' : '';
    formErrors.description = !description ? 'Description cannot be empty' : '';
    formErrors.coordinator = !coordinator.id ? 'Coordinator cannot be empty' : '';
    formErrors.email = !coordinator.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) ? 'Wrong email address' : '';
    formErrors.eventFee = paidEvent && !eventFee ? 'Fee cannot be empty' : '';
    formErrors.date = !dateTime.date ? 'Date cannot be empty' : '';
    formErrors.time = !dateTime.time ? 'Time cannot be empty' : '';
    this.setState(() => ({
      errors: formErrors,
    }));

    const prepareDataToSend = () => {
      let dateTimeHours = dateTime.time;
      if (dateTime.am === false) {
        const dateTimeArr = dateTime.time.split(':');
        let hours = +dateTimeArr[0] + 12;
        hours = hours === 24 ? '00' : hours.toString();
        const minutes = dateTimeArr[1];
        dateTimeHours = `${hours}:${minutes}`;
      }
      return {
        title,
        description,
        category_id: category,
        paid_event: paidEvent,
        event_fee: eventFee || 0,
        reward: reward || 0,
        date: `${dateTime.date}T${dateTimeHours}`,
        duration: duration * 3600,
        coordinator: {
          email: coordinator.email,
          id: coordinator.id.toString(),
        },
      };
    };

    switch (paidEvent) {
      case false:
        if (this.formValid({
          title,
          description,
          coordinator: coordinator.id,
          date: dateTime.date,
          time: dateTime.time,
        })) {
          const { history } = this.props;
          history.push('/success');
          console.log(prepareDataToSend());
        }
        break;
      case true:
        if (this.formValid({
          title,
          description,
          coordinator: coordinator.id,
          eventFee,
          date: dateTime.date,
          time: dateTime.time,
        })) {
          const { history } = this.props;
          history.push('/success');
          console.log(prepareDataToSend());
        }
        break;
      default:
        break;
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
      <form className="content-container" onSubmit={this.onSubmit} noValidate>
        <section className="form-section">
          <h2 className="form-section__title">About</h2>
          <div className={`form-section__input-group ${errors.title ? 'error' : ''}`}>
            <div className="form-section__label">Title<span className="form-section__label-require">*</span></div>
            <input
              className="form-section__input"
              type="text"
              value={title}
              onChange={this.onInputChange}
              name="title"
              id="title"
              placeholder="Make it short and clear"
            />
            {errors.title && <p className="form-section__error">{errors.title}</p>}
          </div>
          <div className={`form-section__input-group ${errors.description ? 'error' : ''}`}>
            <div className="form-section__label">Description<span className="form-section__label-require">*</span></div>
            <div>
              <textarea
                className="form-section__input form-section__input--textarea"
                value={description}
                onChange={this.onInputChange}
                name="description"
                id="description"
                placeholder="Write about your event, be creative"
              />
              <div className="form-section__information-wrapper">
                <p className="form-section__information">Max length 140 characters</p>
                <p className="form-section__information">{description.length}/140</p>
              </div>
            </div>
            {errors.description && <p className="form-section__error">{errors.description}</p>}
          </div>
          <div className="form-section__input-group">
            <div className="form-section__label">Category</div>
            <div>
              <select
                required
                className="form-section__input"
                value={category}
                defaultValue=""
                onChange={this.onInputChange}
                name="category"
              >
                <option value="" hidden disabled>
                  Select category (skills, interests, locations)
                </option>
                {
                  categories && categories.map(({ id, name }) => (
                    <option value={id} key={id}>{name}</option>
                  ))
                }
              </select>
              <p className="form-section__information">Describes topic and people who should be interested in this event</p>
            </div>
          </div>
          <div className={`form-section__input-group ${errors.eventFee ? 'error' : ''}`}>
            <div className="form-section__label">Payment<span className="form-section__label-require">*</span></div>
            <div className="form-section__inner-group">
              <label className="form-section__radio-input" htmlFor="free-event">
                <input
                  type="radio"
                  checked={!paidEvent}
                  onChange={this.onInputChange}
                  value={!!0}
                  name="paidEvent"
                  id="free-event"
                />
                <span className="new-radio" />
                Free event
              </label>
              <label className="form-section__radio-input" htmlFor="paid-event">
                <input
                  type="radio"
                  checked={paidEvent}
                  onChange={this.onInputChange}
                  value={!!1}
                  name="paidEvent"
                  id="paid-event"
                />
                <span className="new-radio" />
                Paid event
              </label>
              {paidEvent && (
                <div className="form-section__inner-group">
                  <input
                    className="form-section__input form-section__input--small"
                    type="text"
                    value={eventFee}
                    onChange={this.onInputChange}
                    name="eventFee"
                    placeholder="Fee"
                  />
                  <span className="form-section__inline-info">$</span>
                  {errors.eventFee && <p className="form-section__error">{errors.eventFee}</p>}
                </div>
              )}
            </div>
          </div>
          <div className="form-section__input-group">
            <div className="form-section__label">Reward</div>
            <div className="input-group__inner-group">
              <input
                className="form-section__input form-section__input--small"
                type="text"
                value={reward}
                onChange={this.onInputChange}
                placeholder="Number"
                name="reward"
              />
              <span className="form-section__inline-info">reward points for attendance</span>
            </div>
          </div>
        </section>
        <section className="form-section">
          <h2 className="form-section__title">Coordinator</h2>
          <div className="form-section__input-group">
            <div className="form-section__label">Responsible<span className="form-section__label-require">*</span></div>
            <select
              className="form-section__input"
              style={{ border: errors.coordinator ? '1px solid red' : '' }}
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
          <div className={`form-section__input-group ${errors.email ? 'error' : ''}`}>
            <div className="form-section__label">Email</div>
            <input
              className="form-section__input"
              type="text"
              value={coordinator.email}
              onChange={this.onInputChange}
              name="email"
            />
            {errors.email && <p className="form-section__error">{errors.email}</p>}
          </div>
        </section>
        <section className="form-section">
          <h2 className="form-section__title">When</h2>
          <div className={`form-section__input-group ${errors.date || errors.time ? 'error' : ''}`}>
            <div className="form-section__label">Starts on<span className="form-section__label-require">*</span></div>
            <div className="form-section__inner-group">
              <input
                className={`form-section__input form-section__input--medium ${!dateTime.date ? 'placeholder' : ''}`}
                type="date"
                value={dateTime.date}
                onChange={this.onInputChange}
                name="date"
              />
              <span className="form-section__inline-info">at</span>
              <input
                className={`form-section__input form-section__input--small ${!dateTime.time ? 'placeholder' : ''}`}
                type="time"
                min="00:00"
                max="12:00"
                value={dateTime.time}
                onChange={this.onInputChange}
                name="time"
              />
              <label
                className="form-section__radio-input form-section__radio-input--reverse form-section__radio-input--marg-l"
                htmlFor="am"
              >
                AM
                <input
                  type="radio"
                  checked={dateTime.am}
                  onChange={this.onInputChange}
                  value={!!1}
                  id="am"
                  name="am"
                />
                <div className="new-radio" />
              </label>
              <label
                className="form-section__radio-input form-section__radio-input--reverse"
                htmlFor="pm"
              >
                PM
                <input
                  type="radio"
                  checked={!dateTime.am}
                  onChange={this.onInputChange}
                  value={!!0}
                  id="pm"
                  name="am"
                />
                <div className="new-radio" />
              </label>
            </div>
            {errors.date && <p className="form-section__error">{errors.date}</p>}
            {!errors.date && errors.time && <p className="form-section__error">{errors.time}</p>}
          </div>
          <div className="form-section__input-group">
            <div className="form-section__label">Duration</div>
            <div className="input-group__inner-group">
              <input
                className="form-section__input form-section__input--small"
                type="text"
                value={duration}
                onChange={this.onInputChange}
                name="duration"
                placeholder="Number"
              />
              <span className="form-section__inline-info">hour</span>
            </div>
          </div>
        </section>
        <button type="submit">Publish event</button>
      </form>
    );
  }
}

AddEventPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AddEventPage;
