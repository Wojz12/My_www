import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import CV from '@/components/sections/CV'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import AdditionalInfo from '@/components/sections/AdditionalInfo'
import Contact from '@/components/sections/Contact'
import AiTools from '@/components/sections/AiTools'
import { getDictionary } from '../../get-dictionary'
import { Locale } from '../../i18n-config'

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)

  return (
    <>
      <Hero dictionary={dictionary.hero} lang={lang} />
      <About dictionary={dictionary.about} />
      <CV dictionary={dictionary.cv} />
      <Experience dictionary={dictionary.experience} />
      <Skills dictionary={dictionary.skills} />
      <Projects dictionary={dictionary.projects} />
      <AiTools dictionary={dictionary.aiTools} />
      <AdditionalInfo dictionary={dictionary.additionalInfo} />
      <Contact dictionary={dictionary.contact} />
    </>
  )
}

