// eslint-disable-next-line import/no-cycle
import { sampleRUM, getMetadata } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function loadGoogleTagManager() {
  // Initialize the data layer
  /* global userdata */
  /* eslint no-undef: "error" */
  const locale = getMetadata('locale');
  const pageCountry = {
    en: 'INT',
    de: 'DE',
  };
  const conf = {
    pageArea: 'web',
    pageCountry: pageCountry[locale],
    pageEnvironment: 'prod_publish',
    pageIdentifier: 'main',
    pageLanguage: locale,
    pageLocation: 'ALL_General-Article_002',
    pageName: window.location.href,
    pagePool: 'smt',
    pageTags: '',
    contentHierarchy1: 'news-and-events',
    productName: '',
  };
  if (typeof userdata !== 'undefined' && userdata.accountid) {
    conf.userLoginState = 'true';
    conf.userId = userdata.accountid;
    if (userdata.zeissid
      && userdata.zeissid.organization
      && userdata.zeissid.organization.zeisscustomerno) {
      conf.zeissid = conf.zeissid || {};
      conf.zeissid.organisation = conf.zeissid.organisation || {};
      conf.zeissid.organisation.zeisscustomerno = userdata.zeissid.organization.zeisscustomerno;
    }
    if (userdata.mkto_med_myzeiss) {
      conf.mkto_med_myzeiss = conf.mkto_med_myzeiss || {};
      if (userdata.mkto_med_myzeiss.myZEISSInterest) {
        conf.mkto_med_myzeiss.myZEISSInterest = userdata.mkto_med_myzeiss.myZEISSInterest;
      }
      if (userdata.mkto_med_myzeiss.myZEISSProfession) {
        conf.mkto_med_myzeiss.myZEISSProfession = userdata.mkto_med_myzeiss.myZEISSProfession;
      }
      if (userdata.mkto_med_myzeiss.myZEISSRole) {
        conf.mkto_med_myzeiss.myZEISSRole = userdata.mkto_med_myzeiss.myZEISSRole;
      }
    }
  } else {
    conf.userLoginState = 'false';
  }

  window.dataLayer = [conf];

  // Include the manager
  // eslint-disable-next-line
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WWQQS7V');
}

loadGoogleTagManager();
