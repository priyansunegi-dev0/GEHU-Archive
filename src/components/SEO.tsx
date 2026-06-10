import { useEffect } from 'react';

interface SEOProps {
  page: 'home' | 'doubts' | 'contribute' | 'about' | 'admin' | 'privacy' | 'disclaimer' | 'contact';
}

export function SEO({ page }: SEOProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hostname = window.location.hostname;
    
    // 1. Detect Campus / Subdomain details
    let campusName = "PYQs Archive";
    let titleSuffix = "PYQs Archive";
    let baseKeywords = "gehu pyqs - PYQs Archive, geu pyqs, gehu pyqs archive, pyqs gehu, gehu archive, gehu previous year papers, graphic era university pyqs, graphic era hill university pyqs";
    
    if (hostname.includes("dehradun")) {
      campusName = "Dehradun Campus";
      titleSuffix = "Dehradun Campus";
      baseKeywords += ", gehu dehradun pyqs, graphic era dehradun pyqs, dehradun campus pyqs, geu dehradun papers, dehradun gehu pyqs, pyqs gehu dehradun";
    } else if (hostname.includes("haldwani")) {
      campusName = "Haldwani Campus";
      titleSuffix = "Haldwani Campus";
      baseKeywords += ", gehu haldwani pyqs, graphic era haldwani pyqs, haldwani campus pyqs, geu haldwani papers, haldwani gehu pyqs, pyqs gehu haldwani";
    } else if (hostname.includes("bhimtal")) {
      campusName = "Bhimtal Campus";
      titleSuffix = "Bhimtal Campus";
      baseKeywords += ", gehu bhimtal pyqs, graphic era bhimtal pyqs, bhimtal campus pyqs, geu bhimtal papers, bhimtal gehu pyqs, pyqs gehu bhimtal";
    } else if (hostname.includes("doubts")) {
      campusName = "Doubts Portal";
      titleSuffix = "Doubts Portal";
      baseKeywords += ", gehu doubts, geu doubts solved, doubts gehu, doubts pyqs gehu, graphic era doubts forum, ask academic queries gehu";
    }

    // 2. Map Page Meta Info
    let pageTitle = "";
    let pageDescription = "";
    let pageKeywords = "";

    switch (page) {
      case 'home':
        pageTitle = `PYQs Archive | ${titleSuffix}`;
        pageDescription = `Free download of Graphic Era Hill University (${campusName}) previous year question papers (PYQs), mid-term, end-term papers, notes, and study material. All branches, courses, and semesters.`;
        pageKeywords = `${baseKeywords}, gehu exam papers, gehu notes download, gehu question papers`;
        break;
      case 'doubts':
        pageTitle = `Ask & Answer Academic Doubts | ${titleSuffix}`;
        pageDescription = `Ask questions, get solutions, and share academic knowledge with peers at Graphic Era Hill University (${campusName}). Prepare better for exam papers together.`;
        pageKeywords = `${baseKeywords}, gehu solutions, gehu study community, solve questions gehu`;
        break;
      case 'contribute':
        pageTitle = `Contribute Study Material | ${titleSuffix}`;
        pageDescription = `Upload and share previous year question papers, notes, or solutions for Graphic Era Hill University (${campusName}). Help other students with their exam preparation.`;
        pageKeywords = `${baseKeywords}, upload gehu papers, contribute notes, share study material`;
        break;
      case 'about':
        pageTitle = `About the Project | ${titleSuffix}`;
        pageDescription = `GEHU Archive is a student-driven study portal providing high-quality resources, notes, and past examination papers for Graphic Era Hill University (${campusName}).`;
        pageKeywords = `${baseKeywords}, gehu portal info, student archive initiative, graphic era info`;
        break;
      case 'admin':
        pageTitle = `Admin Access | ${titleSuffix}`;
        pageDescription = `Secure dashboard login for GEHU Archive administration.`;
        pageKeywords = `${baseKeywords}, admin access portal`;
        break;
      case 'privacy':
        pageTitle = `Privacy Policy | ${titleSuffix}`;
        pageDescription = `Privacy Policy for GEHU Archive. Read how we collect and protect your data.`;
        pageKeywords = `${baseKeywords}, privacy policy`;
        break;
      case 'disclaimer':
        pageTitle = `Disclaimer | ${titleSuffix}`;
        pageDescription = `Disclaimer for GEHU Archive. Student-driven portal with no official university affiliation.`;
        pageKeywords = `${baseKeywords}, disclaimer`;
        break;
      case 'contact':
        pageTitle = `Contact Us | ${titleSuffix}`;
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
    canonical.setAttribute('href', window.location.href);
  }, [page]);

  return null;
}
