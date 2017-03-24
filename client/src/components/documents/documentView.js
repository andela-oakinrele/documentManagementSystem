import React, { Component } from 'react';
import * as req from 'superagent';
import { browserHistory } from 'react-router';
import '../../main.scss';
import NavBar from '../navbar/navBar';
import Dialog from '../diaLog/confirmDialog';
import EditDocument from './documentEdit';
import request from '../../helpers/request';
import { fetchToken } from '../../helpers/auth';

/**
 *
 * @class DocumentView
 * @extends {Component}
 */
class DocumentView extends Component {
  componentDidMount() {
    this.handleDocumentView();
  }
  handleDocumentView() {
    const documentId = this.props.params.id;
    request(`http://localhost:5000/documents/${documentId}`, 'get', null, (err, res) => {
      if (err) {
        Materialize.toast('Unable to get document', 4000, 'rounded');
      } else {
        this.props.dispatch(this.props.fetchDocumentById(res.body));
      }
    });
  }
  /**
   * @memberOf DocumentView
   */
  handleDocumentDelete() {
    const documentId = this.props.params.id;
    req
      .delete(`http://localhost:5000/documents/${documentId}`)
      .set('x-access-token', fetchToken())
      .end((err, res) => {
        if (err) {
          Materialize.toast('Unable to delete', 4000, 'rounded');
        } else {
          this.props.dispatch(this.props.deleteDocument(res.body));
          Materialize.toast('Successful', 4000, 'rounded');
          browserHistory.push('/dashboard');
        }
      });
  }
  render() {
    return (
      <div>
        <NavBar />
        <div className="row">
          <form className="col s6 card hoverable offset-s3">
            <div className="row">
              <div className="input-field col s6">
                <h3 style={{ fontWeight: 100 }} name="title">{ this.props.documents ? this.props.documents.title : 'Loading'}</h3>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                {this.props.documents && <div dangerouslySetInnerHTML={{ __html: this.props.documents.content }} />}
              </div>
            </div>
            <div />
            <div>
              <div className="dialog"><EditDocument {...this.props} /> </div>
              <div className="dialog">
                <Dialog header="Confirmation" message="Are you sure you want to delete this document?" action="DELETE" onContinue={this.handleDocumentDelete.bind(this)} />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// DocumentView.propTypes = {
//   fetchDocumentById: React.PropTypes.func.isRequired,
//   dispatch: React.PropTypes.func.isRequired
// };

export default DocumentView;