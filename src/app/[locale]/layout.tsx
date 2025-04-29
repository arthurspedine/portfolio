import type { Metadata } from 'next'
import './globals.css'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import { Sono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ThemeProvider } from '@/components/theme-provider'

const sono = Sono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Arthur Spedine - Portfolio',
  description: 'Portfolio of Arthur Spedine, software developer.',
}

export default async function LocaleLayout({
  children,
  params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} className='scroll-smooth' suppressHydrationWarning>
      <body className={`${sono.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
