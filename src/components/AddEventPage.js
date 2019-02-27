import React from 'react';
import categories from '../mocks/categories';
// import employes from '../mocks/employes';

class AddEventPage extends React.Component {
  state = {
    title: '',
    description: '',
    categoryId: undefined,
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
    const categoryId = e.target.value;
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
            Category
            <select value={categoryId} onChange={this.onCategoryChange}>
              <option selected />
              {
                categories && categories.map(
                  category => (
                    <option
                      value={category.id}
                      key={category.name}
                    >
                      {category.name}
                    </option>
                  ),
                )
              }
            </select>
          </div>
          <div className="input-group">

          </div>
        </form>
      </div>
    );
  }
}

export default AddEventPage;
