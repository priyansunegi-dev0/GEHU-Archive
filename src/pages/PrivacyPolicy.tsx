import { useEffect, useState } from 'react';
import { SEO } from '@/components/SEO';

export function PrivacyPolicy() {
  const [campusName, setCampusName] = useState('GEHU Archive');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes("dehradun")) setCampusName("Dehradun Campus");
      else if (hostname.includes("haldwani")) setCampusName("Haldwani Campus");
      else if (hostname.includes("bhimtal")) setCampusName("Bhimtal Campus");
      else if (hostname.includes("doubts")) setCampusName("Doubts Portal");
    }
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO page="privacy" /> {/* Using about metadata mapping or customize if needed */}
      <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
        Privacy Policy
      </h1>
      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-4">
        <p>
          Last updated: June 11, 2026
        </p>
        <p>
          At GEHU Archive ({campusName}), accessible from in-gehu.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by GEHU Archive and how we use it.
        </p>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>
        
        <h2 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">Log Files</h2>
        <p>
          GEHU Archive follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>

        <h2 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">Cookies and Web Beacons</h2>
        <p>
          Like any other website, GEHU Archive uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">Google DoubleClick DART Cookie</h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-black dark:text-white underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
        </p>

        <h2 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">Our Advertising Partners</h2>
        <p>
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Each of our advertising partners has their own Privacy Policy for their policies on user data.
        </p>

        <h2 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">Privacy Policies</h2>
        <p>
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on GEHU Archive, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
        </p>
        <p>
          Note that GEHU Archive has no access to or control over these cookies that are used by third-party advertisers.
        </p>

        <h2 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">Third Party Privacy Policies</h2>
        <p>
          GEHU Archive's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>
        <p>
          You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
        </p>

        <h2 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </p>
      </div>
    </main>
  );
}
