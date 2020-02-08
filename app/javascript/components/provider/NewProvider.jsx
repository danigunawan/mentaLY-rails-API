import React from 'react';
import { Link } from 'react-router-dom';
import statesInNigeria from '../appointments/statesInNigeria';
import DisplayAllTitles from '../auth/DisplayAllTtitles';
import Field from '../auth/Field';
import '../styles/NewProvider.css';

class NewProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      state: '',
      logo: '',
      description: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = '/api/v1/providers/';
    const { name, email, state, logo, description } = this.state;

    if (name.length == 0 || email.length == 0 || state.length == 0) return;

    const body = {
      name,
      email,
      state,
      logo,
      description,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.props.history.push(`/provider/${response.id}`))
      .catch(error => console.log(error.message));
  }
  render() {
    const displayStatesInNigeria = () =>
      statesInNigeria.map((state, k) => <option key={k}>{state}</option>);
    return (
      <div className="container">
        <div className="row new-provider-wrapper">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <DisplayAllTitles
              main="Add a new provider/partner"
              sub={`You're signed in as an admin.`}
            />
            <form className="new-provider-form" onSubmit={this.onSubmit}>
              <Field
                name="name"
                label="Name: "
                onChange={this.onChange}
                type="text"
                name="name"
                id="name"
              />

              <Field
                name="email"
                label="Email: "
                onChange={this.onChange}
                type="email"
                name="email"
                id="email"
              />
              <div className="state-group">
                <label className="state-label" htmlFor="email">
                  State:
                </label>
                <select
                  name="state"
                  id="state"
                  className="form-control-state"
                  required
                  onChange={this.onChange}
                  placeholder="Lagos"
                >
                  {displayStatesInNigeria()}
                </select>
              </div>

              <Field
                name="logo"
                label="Logo URL: "
                onChange={this.onChange}
                type="url"
                name="logo"
                id="logo"
              />

              <div className="description-label">
                <label htmlFor="description">Description</label>
                <div>
                  <textarea
                    className="form-control-txtarea"
                    id="description"
                    name="description"
                    rows="3"
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <button type="submit" className="make-provider-btn">
                Create Provider
              </button>
            </form>
            {/* 



              <Link to="/providers" className="btn btn-link mt-3">
                Back to Providers
              </Link>
            </form> */}
          </div>
        </div>
      </div>
    );
  }
}

export default NewProvider;
