// eslint-disable-next-line import/no-cycle
import { sampleRUM, getMetadata } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

/**
 * Define the environment based on the hostname
 * @param {*} hostname
 * @returns
 */
export function pageEnvironment(hostname) {
  switch (hostname) {
    case 'www.zeiss.de':
    case 'www.zeiss.com':
      return 'prod_publish';
    case 'localhost':
      return 'local_publish';
    default:
      return 'publish';
  }
}

export function pathItem(pathname, index) {
  // Capture the path item at the given index
  return pathname.split('/')[index] || '';
}

function loadGoogleTagManager() {
  // Initialize the data layer
  /* eslint no-undef: "error" */
  const url = new URL(window.location.href);
  const locale = getMetadata('locale');
  const pageCountry = {
    en: 'INT',
    de: 'DE',
  };
  const conf = {
    pageArea: 'web',
    pageCountry: pageCountry[locale],
    pageEnvironment: pageEnvironment(url.hostname),
    pageIdentifier: 'main',
    pageLanguage: locale,
    pageLocation: 'ALL_General-Article_002',
    pageName: url.pathname,
    pagePool: pathItem(url.pathname, 4),
    pageTags: '',
    contentHierarchy1: pathItem(url.pathname, 3),
    productName: '',
  };
  window.dataLayer = [conf];

  // Include the manager
  // eslint-disable-next-line
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WWQQS7V');
}

loadGoogleTagManager();
