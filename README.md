# Next SPA with multi entry points examples

Thanks to https://github.com/geops/next-nginx-routes/tree/main.

## Context

Sometimes building NextJS applications we'll need to use the `next export`, which turn your JSX pages into pure HTML.
But, in most apps, we need dynamic paths, like handled in SSR applications or SPA apps with React Router, for example:

`GET /product/:id`

## Problem

For the above scenario, for NextJS pages route pattern, we need to create the files:

```
|--pages
  |--product
    |--[id].tsx
```

And when run `next build` with `next.config.js` using:

```json
    output: "export",
```

We get:

```
|--out
  |--pages
    |--product
        |--[id].html
```

And cannot access directly from url the product with id `1`:

`http://localhost:3000/product/1`

We receive 404, because the only available (obviously) route is `/product/[id].html`.

And we need some `url rewrite` to get this done, to see more for these solution, read:

> https://gist.github.com/gaearon/9d6b8eddc7f5e647a054d7b333434ef6

## Solution

As said before, for handle these `dynamic path` for NextJs static output, we need to rewrite the dynamic url to the html!, example:

```nginx
rewrite / out/index.html;
rewrite /product/1 out/product/[id].html;
```

For these `url rewrites`, you can use countless ways, like:

Directly web servers:
- Nginx (like this example)
- Apache
- etc

Or configure directly in your CDN:
- Azion
- Akamai
- Cloudfront
- etc

## Running the example:

Use:
1. Nodejs >= 18.18
2. Docker

1. Install local packages: `pnpm install`
2. Build the static html and generate the Nginx config: `pnpm build`
3. Build local image docker: `docker build -t next-spa-example .`
4. Run the container: `docker run -p 8080:80 next-spa-example`

## Testing

Now, running the project local, make the first test using the browser router:

1. Access `http://localhost:8080/` and click in the first product link
2. The url should be `http://localhost:8080/product/1` with json placeholder information.

Now a test accessing directly the dynamic url:

1. Access `http://localhost:8080/product/1` (now the rewrite in the nginx will do the job)
2. The url should keep `http://localhost:8080/product/1` with correct information.