import React from 'react';
import Select from 'react-select';
import categories from '../mocks/categories';
// import employes from '../mocks/employes';

const options = categories.map(category => ({
  value: category.id,
  label: category.name,
}));

class AddEventPage extends React.Component {
  state = {
    title: '',
    description: '',
    categoryId: undefined,
  };

  componentDidMount() {
    console.log(options);
  }

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

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { title, description, categoryId } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
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
              options={options}
              value={options[categoryId]}
              onChange={this.onCategoryChange}
            />
          </div>
          <div className="input-group">
            Payment
            <div className="input-group__inner-group">
              <label htmlFor="free-event">
                <input type="radio" id="free-event" />
                Free event
              </label>
            </div>
            <div className="input-group__inner-group">
              <label htmlFor="paid-event">
                <input type="radio" id="paid-event" />
                Paid event
              </label>
            </div>
            <div className="input-group__inner-group">
              <input type="text" />
              $
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddEventPage;
