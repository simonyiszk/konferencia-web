import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import 'whatwg-fetch';
import Container from '../components/Container';
import Hero from '../components/Hero';
import LoadingIndicator from '../components/LoadingIndicator';
import PageContent from '../components/PageContent';
import initialExhibitors from '../data/api/exhibitors';
import Sponsors from '../sections/Sponsors';
import styles from './expo.module.scss';

export const frontmatter = {
  title: 'Expo',
};

// const EXHIBITORS_DATA_REFRESH_INTERVAL = 60000;

export default class ExpoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExhibitorsDataLoaded: true,
      exhibitors: initialExhibitors,
    };

    // this.exhibitorsDataIntervalID = 0;
  }

  /*
  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.refreshExhibitorsData();

      this.exhibitorsDataIntervalID = window.setInterval(
        () => this.refreshExhibitorsData(),
        EXHIBITORS_DATA_REFRESH_INTERVAL,
      );
    }
  }

  componentWillUnmount() {
    if (this.exhibitorsDataIntervalID !== 0) {
      window.clearInterval(this.exhibitorsDataIntervalID);
    }
  }

  refreshExhibitorsData() {
    fetch('https://proxy.kir-dev.sch.bme.hu/weboldal/konferenciapi/stand.php')
      .then(response => response.json())
      .then(exhibitors =>
        this.setState({
          isExhibitorsDataLoaded: true,
          exhibitors,
        }));
  }
  */

  render() {
    const { data } = this.props;
    const { isExhibitorsDataLoaded, exhibitors } = this.state;

    return (
      <div>
        <Helmet title={frontmatter.title} />

        <Hero>
          <Container className={styles.heroContentContainer}>
            {isExhibitorsDataLoaded ? (
              <div className={styles.mapAndLegendContainer}>
                <div className={styles.mapImageContainer}>
                  <img
                    src="https://proxy.kir-dev.sch.bme.hu/weboldal/konferenciapi/map.png"
                    alt="Térkép"
                    className={styles.mapImage}
                  />
                </div>

                <table className={styles.legendContainer}>
                  <tbody>
                    {exhibitors.map(exhibitor => (
                      <tr key={exhibitor.id}>
                        <td className="text-right">{exhibitor.id}</td>
                        <td>{exhibitor.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center">
                <LoadingIndicator className={styles.loadingIndicator} />

                <p>Kiállítók adatainak betöltése folyamatban...</p>
              </div>
            )}
          </Container>
        </Hero>

        {isExhibitorsDataLoaded && (
          <PageContent>
            <Container>
              <h1>Kiállítók</h1>

              {exhibitors.map(exhibitor => (
                <React.Fragment key={exhibitor.id}>
                  <h2>{exhibitor.name}</h2>

                  <p
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{ __html: exhibitor.description }}
                  />
                </React.Fragment>
              ))}

              <Sponsors data={data} />
            </Container>
          </PageContent>
        )}
      </div>
    );
  }
}

ExpoPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export const query = graphql`
  query ExpoPageQuery {
    ...SponsorsSection
  }
`;
