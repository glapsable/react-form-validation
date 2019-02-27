import React from 'react';
import Select from 'react-select';
import categories from '../mocks/categories';
import coordinators from '../mocks/employes';

const categoriesOptions = categories.map(category => ({
  value: category.id,
  label: category.name,
}));

const coordinatorOptions = [
  {
    label: 'Me',
    options: [
      {
        label: `${coordinators[3].name} ${coordinators[3].lastname}`,
        value: coordinators[3].id,
        email: coordinators[3].email,
      },
    ],
  },
  {
    label: 'Others',
    options: coordinators.map(coordinator => ({
      value: coordinator.id,
      label: `${coordinator.name} ${coordinator.lastname}`,
      email: coordinator.email,
    })),
  },
];

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
  };

  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    if (description.length <= 140) {
      this.setState(() => ({ description }));
    }
  };

  onCategoryChange = (e) => {
    const categoryId = e.value;
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
    this.setState(() => ({
      coordinator: {
        id: e.value,
        email: e.email,
      },
    }));
  };

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({
      coordinator: {
        email,
      },
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();
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
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <h2>About</h2>
          <hr />
          <div className="input-group">
            <label htmlFor="title">
              Title
              <input type="text" value={title} onChange={this.onTitleChange} id="title" />
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="description">
              Description
              <textarea value={description} onChange={this.onDescriptionChange} id="description" />
            </label>
            <p>{description.length}/140</p>
          </div>
          <div className="input-group">
            <Select
              options={categoriesOptions}
              value={categoriesOptions[categoryId]}
              onChange={this.onCategoryChange}
            />
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
          <div className="input-group__inner-group">
            Responsible
            <Select
              options={coordinatorOptions}
              value={coordinatorOptions[1].options[coordinator.id]}
              onChange={this.onCoordinatorChange}
            />
            <input type="text" value={coordinator.email} onChange={this.onEmailChange} />
          </div>
        </div>
      </form>
    );
  }
}

export default AddEventPage;
