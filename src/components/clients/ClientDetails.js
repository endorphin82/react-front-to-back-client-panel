import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import classnames from 'classnames';

import Spinner from '../layout/Spinner';

class ClientDetails extends Component {
  render() {
    const {client} = this.props;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"/>
                {' '}
                Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link
                  to={`/client/edit/${client.id}`}
                  className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr/>
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>Client ID:{' '}<span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{' '}
                    <span
                      className={classnames("balance", {
                        'text-danger': client.balance > 0,
                        'text-success': client.balance == 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>{' '}
                  </h3>
                  {/* @todo: balanceform */}
                </div>
              </div>

              <hr/>
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner/>;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: 'clients',
      storeAs: 'client', doc: props.match.params.id
    }
  ]),
  connect(({firestore: {ordered}}, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);