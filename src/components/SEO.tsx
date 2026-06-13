import { useEffect } from 'react';

interface SEOProps {
  page: 'home' | 'doubts' | 'about' | 'admin' | 'disclaimer' | 'contact';
}

const SITE_TITLE = "PYQs Archive - Graphic Era";
const SITE_DESCRIPTION = "GEHU Archive is a student\u2011driven collection of previous\u2011year question papers of Graphic Era Hill University, Dehradun Campus. It also hosts a Doubts section where students can ask and answer queries.";

export function SEO({ page }: SEOProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const baseKeywords = "gehu pyqs, geu pyqs, gehu pyqs archive, pyqs gehu, gehu archive, gehu previous year papers, graphic era university pyqs, graphic era hill university pyqs, gehu dehradun pyqs, graphic era dehradun pyqs, dehradun campus pyqs, gehu haldwani pyqs, gehu bhimtal pyqs";

    // Map Page Meta Info
    let pageTitle = "";
    let pageDescription = "";
    let pageKeywords = "";

    switch (page) {
      case 'home':
        pageTitle = SITE_TITLE;
        pageDescription = SITE_DESCRIPTION;
        pageKeywords = `${baseKeywords}, gehu exam papers, gehu notes download, gehu question papers`;
        break;
      case 'doubts':
        pageTitle = `Doubts | ${SITE_TITLE}`;
        pageDescription = `Ask questions, get solutions, and share academic knowledge with peers at Graphic Era Hill University. Prepare better for exam papers together.`;
        pageKeywords = `${baseKeywords}, gehu solutions, gehu study community, solve questions gehu`;
        break;
      case 'about':
        pageTitle = `About the Project | ${SITE_TITLE}`;
        pageDescription = SITE_DESCRIPTION;
        pageKeywords = `${baseKeywords}, gehu portal info, student archive initiative, graphic era info`;
        break;
      case 'admin':
        pageTitle = `Admin Access | ${SITE_TITLE}`;
        pageDescription = `Secure dashboard login for GEHU Archive administration.`;
        pageKeywords = `${baseKeywords}, admin access portal`;
        break;
      case 'disclaimer':
        pageTitle = `Disclaimer | ${SITE_TITLE}`;
        pageDescription = `Disclaimer for GEHU Archive. Student-driven portal with no official university affiliation.`;
        pageKeywords = `${baseKeywords}, disclaimer`;
        break;
      case 'contact':
        pageTitle = `Contact Us | ${SITE_TITLE}`;
        pageDescription = `Get in touch with the student maintainers of GEHU Archive. Feedback, queries, and reports.`;
        pageKeywords = `${baseKeywords}, contact us`;
        break;
    }

    // 3. Inject into DOM
    document.title = pageTitle;

    // Update meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', pageDescription);

    // Update meta keywords
    let keyMeta = document.querySelector('meta[name="keywords"]');
    if (!keyMeta) {
      keyMeta = document.createElement('meta');
      keyMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keyMeta);
    }
    keyMeta.setAttribute('content', pageKeywords);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    
    // Clean URL: exclude query params, trailing slashes (except for root domain)
    let cleanPath = window.location.pathname;
    if (cleanPath.endsWith('/') && cleanPath.length > 1) {
      cleanPath = cleanPath.slice(0, -1);
    }
    const canonicalUrl = `https://in-gehu.in${cleanPath}`;
    canonical.setAttribute('href', canonicalUrl);
  }, [page]);

  return null;
}
