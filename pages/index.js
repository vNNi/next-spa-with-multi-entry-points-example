import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1>Home page</h1>
      <hr />
      <ul>
        <li>
          <Link href="/product/1">go to product 1</Link>
        </li>
        <li>
          <Link href="/product/2">go to product 2</Link>
        </li>
      </ul>
    </>
  );
}