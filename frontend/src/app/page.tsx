import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="flex flex-col items-center mb-auto my-16">
      <h1 className="text-5xl">Top Tracks</h1>
      <h2 className="text-lg mt-4">Image Grid Generator</h2>
      <Button variant="primary" className="mt-8">Log in Spotify</Button>
    </main>
  )
}
