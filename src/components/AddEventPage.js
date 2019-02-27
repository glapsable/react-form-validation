import React from 'react';

class AddEventPage extends React.Component {
  state = {
    title: '',
    description: '',
  };

  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log('form submission');
  };

  render() {
    const { title, description } = this.state;

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
              <input type="text" value={description} onChange={this.onDescriptionChange} id="description" />
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default AddEventPage;
