import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, navigate, StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import GithubCorner from 'react-github-corner';
import { Swipeable } from 'react-swipeable';
import Transition from '../components/transition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub, faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import './index.css';

const Header = ({ name, title, repo, github, linkedIn, email, stackOverflow }) => (
  <header>
    <Link to="/1">
      <span>{title}</span> - {name}
    </Link>
    <div>
      <GithubCorner href={repo} rel="noopener noreferrer" target="_blank" />
      <div className="contacts">
        <a href={email} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEnvelope} size="lg" title="Email" />
        </a>
        <a href={stackOverflow} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faStackOverflow} size="lg" title="StackOverflow" />
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="lg" title="GitHub" />
        </a>
        <a href={linkedIn} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="lg" title="LinkedIn" />
        </a>
      </div>
    </div>
  </header>
);

class TemplateWrapper extends Component {
  NEXT = [13, 32, 39];
  PREV = 37;

  swipeLeft = () => {
    this.navigate({ keyCode: this.NEXT[0] });
  };

  swipeRight = () => {
    this.navigate({ keyCode: this.PREV });
  };

  navigate = ({ keyCode }) => {
    const now = this.props.data.slide.index;
    const slidesLength = this.props.slidesLength;

    if (now) {
      if (keyCode === this.PREV && now === 1) {
        return false;
      } else if (this.NEXT.indexOf(keyCode) !== -1 && now === slidesLength) {
        return false;
      } else if (this.NEXT.indexOf(keyCode) !== -1) {
        navigate(`/${now + 1}`);
      } else if (keyCode === this.PREV) {
        navigate(`/${now - 1}`);
      }
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.navigate);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.navigate);
  }

  render() {
    const { location, children, site } = this.props;
    const { siteMetadata: { title, name, repo, linkedIn, github, stackOverflow, email } } = site;

    return (
      <div>
        <Helmet
          title={`${title} — ${name}`}
        />
        <Header
          name={name}
          title={title}
          repo={repo}
          linkedIn={linkedIn}
          stackOverflow={stackOverflow}
          github={github}
          email={email}
        />
        <Swipeable
          onSwipedLeft={this.swipeLeft}
          onSwipedRight={this.swipeRight}
        >
          <Transition location={location}>
            <div id="slide" style={{ 'width': '100%' }}>{children}</div>
          </Transition>
        </Swipeable>
      </div>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
};

export default props => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        site {
          siteMetadata {
            name
            title
            repo,
            linkedIn,
            github,
            stackOverflow,
            email
          }
        }
        allSlide {
          edges {
            node {
              id
            }
          }
        }
      }
    `}
    render={data => (
      <TemplateWrapper
        site={data.site}
        slidesLength={data.allSlide.edges.length}
        {...props}
      />
    )}
  />
);
