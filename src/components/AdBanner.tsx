import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  style?: React.CSSProperties;
  className?: string;
  format?: string;
  responsive?: string;
  minHeight?: number;
}

export function AdBanner({
  slot,
  style,
  className = "w-full my-4 overflow-hidden flex justify-center",
  format = "auto",
  responsive = "true",
  minHeight = 280,
}: AdBannerProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const ins = insRef.current;
    if (!ins) return;

    // Avoid pushing if ad is already initialized for this element
    if (ins.getAttribute('data-adsbygoogle-status')) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error: ", err);
    }
  }, [slot]);

  return (
    // Reserve space before ad loads to prevent Cumulative Layout Shift (CLS)
    <div
      className={className}
      style={{ minHeight: `${minHeight}px`, contain: 'layout' }}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={style ?? { display: 'block', width: '100%', minHeight: `${minHeight}px` }}
        data-ad-client="ca-pub-7929053030272353"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
