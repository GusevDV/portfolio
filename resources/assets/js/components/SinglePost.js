import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import axios from 'axios';

class SinglePost extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  componentDidMount(){
    this.props.onLoadingChange();
    axios.get('/api/post/' + this.props.match.params.id)
      .then(response => response.data)
      .then(data => this.setState({data}))
      .finally(() => this.props.onLoadingChange());
  }

  render() {
    const {title, text, url} = this.state.data;

    const meta = {
      title: title,
    }

    return(
      <DocumentMeta {...meta}>
        <main className="post-container">
          <article className="post-single">
            <h1 className="post-title">{title}</h1>
            <div dangerouslySetInnerHTML={{__html: text}}></div>
            {displayUrl(url)}
          </article>
        </main>
      </DocumentMeta>
    )
  }
}

SinglePost.propTypes = {
  onLoadingChange: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

//Remove http and www from text url
function displayUrl(url) {
  if (url) {
    const url_text_remove = ['http://', 'www.']; //Elements that will be removed from the beginning of url
    var text_url = url;
    url_text_remove.forEach((item) => {
      if (url.indexOf(item) !== -1) {
        text_url = text_url.slice(item.length);
      }
    });
    return  (
      <div>
        URL: <a href={url} target="_blank" rel="noopener noreferrer">{text_url}</a>
      </div>
    )
  }
}

export default SinglePost;
