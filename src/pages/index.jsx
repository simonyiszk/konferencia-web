import PropTypes from 'prop-types';
import React from 'react';
import ContactInfo from '../components/ContactInfo';
import Container from '../components/Container';
import Hero from '../components/Hero';
import Highlight from '../components/Highlight';
import PageContent from '../components/PageContent';
import Presentation from '../components/Presentation';
import SimonyiKonferenciaIconSrc from '../data/icons/simonyi-konferencia.svg';
import ContactSectionSeparatorSrc from '../data/section-separators/contact.svg';
import LocationSectionSeparatorSrc from '../data/section-separators/location.svg';
import PresentationsSectionSeparatorSrc from '../data/section-separators/presentations.svg';
import Sponsors from '../sections/Sponsors';
import styles from './index.module.scss';

class IndexPage extends React.PureComponent {
  componentDidMount() {
    const { data } = this.props;

    if (typeof window !== 'undefined') {
      const eventbriteWidgetScript = document.createElement('script');
      eventbriteWidgetScript.type = 'text/javascript';
      eventbriteWidgetScript.src =
        'https://www.eventbrite.com/static/widgets/eb_widgets.js';

      document.head.appendChild(eventbriteWidgetScript);
      eventbriteWidgetScript.onload = () => {
        window.EBWidgets.createWidget({
          widgetType: 'checkout',
          eventId: data.site.siteMetadata.siteEventbriteID,
          modal: true,
          modalTriggerElementId: `eventbrite-widget-modal-trigger-${
            data.site.siteMetadata.siteEventbriteID
          }`,
          onOrderComplete: () => {},
        });
      };
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <Hero className={styles.hero}>
          <Container className={styles.heroContentContainer}>
            <div className={styles.iconContainer}>
              <img
                src={SimonyiKonferenciaIconSrc}
                alt=""
                className={styles.icon}
              />
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
                id={`eventbrite-widget-modal-trigger-${
                  data.site.siteMetadata.siteEventbriteID
                }`}
                href={data.site.siteMetadata.siteEventbriteURL}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                className={styles.registrationButton}
                onClick={(event) => {
                  event.preventDefault();
                }}
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

          <div className={styles.presentationsSection}>
            <img src={PresentationsSectionSeparatorSrc} alt="" />

            <Container>
              <h1>Előadások</h1>

              <div className={styles.presentationsContainer}>
                {data.allPresentationsYaml.edges.map(({ node }) => (
                  <Presentation
                    key={node.title}
                    title={node.title}
                    presenterName={node.presenterName}
                    presenterRole={node.presenterRole}
                    presenterImage={
                      node.presenterImage.childImageSharp.resolutions
                    }
                    abstract={node.abstract}
                  />
                ))}
              </div>
            </Container>
          </div>

          <div className={styles.locationSection}>
            <img src={LocationSectionSeparatorSrc} alt="" />

            <Container>
              <h1>Helyszín</h1>

              <p className="text-center">
                <span role="img" aria-label="Parkoló jel">
                  🅿️
                </span>{' '}
                <em>
                  A helyszínen parkolási lehetőség csak korlátozott mennyiségben
                  érhető el
                </em>
              </p>

              <iframe
                src={data.site.siteMetadata.siteAddressURL}
                title="Térkép"
                className={styles.mapFrame}
              />
            </Container>
          </div>

          {/*
            <h1>Nyereményjáték</h1>
            <p>
              Szokásunkhoz híven a látogatók között idén is kisorsulunk értékes
              nyereményeket. A játékban való részvétel követelménye két – egy a
              Simonyi Károly Szakkollégium tagjai által és egy a rendezvény
              támogatói által biztosított – stand meglátogatása. Az említett standok
              felkeresésekor a telefonos applikáció – vagy az e-mailben kiküldött
              QR-kód – segítségével kerülhet be a nevünk a virtuális kalapba.
            </p>

            <div className={styles.sweepstakeIconsContainer}>
              <MdTabletMac />
              <MdDesktopWindows />
            </div>
          */}

          <div className={styles.contactSection}>
            <img src={ContactSectionSeparatorSrc} alt="" />

            <Container>
              <h1>Kapcsolat</h1>

              <div className={styles.contactInfosContainer}>
                {data.allContactsYaml.edges.map(({ node }) => (
                  <ContactInfo
                    key={node.name}
                    name={node.name}
                    role={node.role}
                    email={node.email}
                    telephone={node.telephone}
                    image={node.image.childImageSharp.resolutions}
                    className={styles.contactInfo}
                  />
                ))}
              </div>

              <Sponsors data={data} />
            </Container>
          </div>
        </PageContent>
      </div>
    );
  }
}

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
        siteEventbriteID
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

    allContactsYaml {
      edges {
        node {
          name
          role
          email
          telephone
          image {
            childImageSharp {
              resolutions(width: 256, height: 256, cropFocus: CENTER) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }

    ...SponsorsSection
  }
`;
