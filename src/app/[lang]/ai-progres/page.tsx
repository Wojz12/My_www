import { Metadata } from 'next'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/get-dictionary'
import AiProgresPage from '@/components/ai-progres/AiProgresPage'

export const metadata: Metadata = {
    title: 'AI Progress | Portfolio',
    description: 'Dashboard showing key indicators of approaching AGI',
}

interface Props {
    params: { lang: Locale }
}

export default async function AiProgresRoute({ params: { lang } }: Props) {
    const dictionary = await getDictionary(lang)

    return (
        <div className="pt-24">
            <AiProgresPage dictionary={dictionary.aiProgres} />
        </div>
    )
}
