import PropTypes from 'prop-types';
import React from 'react';
import Container from '../components/Container';
import Hero from '../components/Hero';
import Highlight from '../components/Highlight';
import PageContent from '../components/PageContent';
import Presentation from '../components/Presentation';
import PresentationsAssetSrc from '../data/assets/presentations.svg';
import SimonyiKonferenciaIconSrc from '../data/icons/simonyi-konferencia.svg';
import styles from './index.module.scss';

const IndexPage = ({ data }) => (
  <div>
    <Hero className={styles.hero}>
      <Container className={styles.heroContentContainer}>
        <div className={styles.iconContainer}>
          <img src={SimonyiKonferenciaIconSrc} alt="" className={styles.icon} />
        </div>

        <div>
          <h1 className={styles.title}>{data.site.siteMetadata.title}</h1>

          <div>
            <h2 className={styles.eventDate}>
              {data.site.siteMetadata.eventDate}
            </h2>

            <h2 className={styles.eventVenue}>
              {data.site.siteMetadata.eventVenue}
            </h2>

            <h3 className={styles.eventAddress}>
              {data.site.siteMetadata.siteAddressPretty}
            </h3>
          </div>

          <a
            href={data.site.siteMetadata.siteEventbriteURL}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className={styles.registrationButton}
          >
            Regisztráció
          </a>
        </div>
      </Container>
    </Hero>

    <PageContent>
      <Container>
        <h1>A Konferenciáról</h1>

        <div className={styles.highlightsContainer}>
          {data.allHighlightsYaml.edges.map(({ node }) => (
            <Highlight
              key={node.title}
              title={node.title}
              symbol={node.symbol}
              symbolLabel={node.symbolLabel}
              text={node.text}
              className={styles.highlight}
            />
          ))}
        </div>
      </Container>

      <img
        // TODO: Avoid hacky workarounds
        style={{ marginTop: '2em', marginBottom: '-1em' }}
        src={PresentationsAssetSrc}
        alt=""
      />

      <div style={{ background: '#eee' }}>
        <Container>
          <h1 style={{ marginTop: 0 }}>Előadások</h1>

          <div className={styles.presentationsContainer}>
            {data.allPresentationsYaml.edges.map(({ node }) => (
              <Presentation
                key={node.title}
                title={node.title}
                presenterName={node.presenterName}
                presenterRole={node.presenterRole}
                presenterImage={node.presenterImage.childImageSharp.resolutions}
                abstract={node.abstract}
              />
            ))}
          </div>
        </Container>
      </div>

      <h1>Helyszín</h1>
      <iframe
        src={data.site.siteMetadata.siteAddressURL}
        title="Térkép"
        className={styles.mapFrame}
      />

      <Container>
        <h1>Nyereményjáték</h1>
        <div className="text-center" style={{ height: '50vh' }}>
          TODO
        </div>

        <h1>Kapcsolat</h1>
        <div className="text-center" style={{ height: '50vh' }}>
          TODO: Fő kapcsolattartók hozzáadása
        </div>

        <h1>Támogatók</h1>

        <h3 className="text-center">Főtámogatók</h3>
        <div className="text-center" style={{ height: '30vh' }}>
          Lorem ipsum TODO
        </div>

        <h3 className="text-center">Kiemelt támogatók</h3>
        <div className="text-center" style={{ height: '20vh' }}>
          Lorem ipsum TODO
        </div>

        <h3 className="text-center">További támogatók</h3>
        <div className="text-center" style={{ height: '10vh' }}>
          Lorem ipsum TODO
        </div>
      </Container>
    </PageContent>
  </div>
);

IndexPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        eventDate(formatString: "LL", locale: "hu")
        eventVenue
        siteAddressURL
        siteAddressPretty
        siteEventbriteURL
      }
    }

    allHighlightsYaml {
      edges {
        node {
          title
          symbol
          symbolLabel
          text
        }
      }
    }

    allPresentationsYaml {
      edges {
        node {
          title
          presenterName
          presenterRole
          presenterImage {
            childImageSharp {
              resolutions(width: 192, height: 192, cropFocus: CENTER) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
          abstract
        }
      }
    }
  }
`;
