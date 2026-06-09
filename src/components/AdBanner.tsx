import { useEffect } from 'react';

export function AdBanner() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error: ", err);
    }
  }, []);

  return (
    <div className="w-full my-4 overflow-hidden flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-7929053030272353"
        data-ad-slot="2605579668"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
