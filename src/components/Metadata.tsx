import Head from 'next/head'
import { NextSeo } from 'next-seo'

type MetadataProps = {
  title?: string
  description?: string
  canonical?: string
}

export const Metadata = ({
  title = 'LetMeAsk',
  description = 'Crie salas de perguntas e respostas ao vivo.',
  canonical,
}: MetadataProps) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta name="viewport" content="width=device-width,initial-scale=1" key="viewport" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" key="apple" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" key="icon32" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" key="icon16" />
        <link rel="icon" href="/favicon.ico" key="favicon" />
      </Head>

      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title: title,
          description: description,
          url: canonical,
          locale: 'pt-BR',
          site_name: 'LetMeAsk',
        }}
      />
    </>
  )
}
