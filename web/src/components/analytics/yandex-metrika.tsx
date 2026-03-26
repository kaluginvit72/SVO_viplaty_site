import Script from "next/script";

type Props = {
  counterId: string;
};

/** Параметры init как в коде счётчика из Метрики (Вебвизор, хеш, dataLayer). */
const YM_INIT = {
  ssr: true,
  webvisor: true,
  trackHash: true,
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  ecommerce: "dataLayer",
} as const;

/**
 * Счётчик Яндекс.Метрики: tag.js + init после интерактива + noscript-пиксель.
 */
export function YandexMetrika({ counterId }: Props) {
  const id = counterId.trim();
  /** Только цифры: защита от инъекции в inline-скрипт. */
  if (!/^\d{5,12}$/.test(id)) return null;

  const initJson = JSON.stringify(YM_INIT);

  return (
    <>
      <Script id="ym-tag-loader" strategy="afterInteractive">
        {`
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(${JSON.stringify(id)},"init",${initJson});
        `.trim()}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${encodeURIComponent(id)}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
            width={1}
            height={1}
          />
        </div>
      </noscript>
    </>
  );
}
