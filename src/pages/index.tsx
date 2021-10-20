import type { NextPage } from 'next'
import { Button } from '../components/Button'

const Home: NextPage = () => {
  const action = (text: string) => {
    console.log(text)
  }

  return (
    <main>
      <Button />

      <Button click={(e) => (e.stopPropagation(), action('Hello, world!'))}>
        Hello, world!
      </Button>

      <Button className="m-4" click={() => action("it's purple!")}>
        <span className="flex-none mr-2 bg-purple-300 w-5 h-5 rounded"></span>
        <span className="text-purple-600">Hello,</span>
        &nbsp;world!
      </Button>

      <Button
        click={() => action('custom accessibility')}
        ariaLabel="custom accessibility"
      >
        Button with custom accessibility
      </Button>
    </main>
  )
}

export default Home
