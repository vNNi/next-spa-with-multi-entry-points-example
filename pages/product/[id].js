import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr'

export default function Page() {
  const router = useRouter();
  const id = router.query.id  
  if (id == null) {
    // Static pre-generated HTML
    return <h1>Loading...</h1>
  }
  return (
    <>
      <h1>Page for {id}</h1>
      <ul>
        <li>
          <Link href="/product/1">go to product 1</Link>
        </li>
        <li>
          <Link href="/product/2">go to product 2</Link>
        </li>
      </ul>
      <hr />
      <Content id={id} />
    </>
  )
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Content({ id }) {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/todos/' + id, fetcher)
  if (error) return <h1>Failed to load</h1>
  if (!data) return <h1>Loading...</h1>
  return (
      <pre>{JSON.stringify(data, null, 2)}</pre>
  );
}