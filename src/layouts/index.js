import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, navigate, StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import GithubCorner from 'react-github-corner';
import { Swipeable } from 'react-swipeable';
import Transition from '../components/transition';
import GithubIcon from './../icons/Github.png';
import LinkedInIcon from './../icons/LinkedIn.png';
import GmailIcon from './../icons/Gmail.png';
import './index.css';

const Header = ({ name, title, date, repo, github, linkedIn, email }) => (
  <header>
    <Link to="/1">
      <span>{title}</span> - {name}
    </Link>
    <div>
      <GithubCorner href={repo} rel="noopener noreferrer" target="_blank"/>
      <div className="contacts">
        <a href={github} target="_blank" rel="noopener noreferrer">
          <img src={GithubIcon} alt="github profile" />
        </a>
        <a href={linkedIn} target="_blank" rel="noopener noreferrer">
          <img src={LinkedInIcon} alt="linkedin profile" />
        </a>
        <a href={email} target="_blank" rel="noopener noreferrer">
          <img src={GmailIcon} alt="send mail" />
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
    const {siteMetadata: { title, name, date, repo, github, linkedIn, email } } = site;

    return (
      <div>
        <Helmet
          title={`${title} — ${name}`}
        />
        <Header
          name={name}
          title={title}
          date={date}
          repo={repo}
          github={github}
          linkedIn={linkedIn}
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
            date,
            repo,
            github,
            linkedIn,
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
