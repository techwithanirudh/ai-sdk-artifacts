import { SparklesIcon } from 'lucide-react'

const APP_NAME = 'AI SDK Artifacts'
const APP_DEFAULT_TITLE = 'AI SDK Artifacts'
const APP_TITLE_TEMPLATE = '%s | AI SDK Artifacts'
const APP_DESCRIPTION =
  'AI SDK Artifacts is a starter kit for building a Next.js application with AI SDK'

const logo = (
  <>
    <SparklesIcon className="size-5" fill="var(--muted-foreground)" />
  </>
)

const isProductionEnvironment = process.env.NODE_ENV === 'production'

export {
  APP_NAME,
  APP_DEFAULT_TITLE,
  APP_TITLE_TEMPLATE,
  APP_DESCRIPTION,
  logo,
  isProductionEnvironment,
}
