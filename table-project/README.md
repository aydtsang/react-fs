# Initializing Project

1. Create `next-app` with experimental features (i.e. `app` directory and route handlers)

```
pnpm create next-app --experimental-app
```

2. Remove all of the files that come with the example so that we have the basics (i.e. remove static resources, styles, fonts, components, etc.)

3. Test the server to see if it's running (check `/` and `/api/hello`)
```
pnpm dev
```

# What's up with tables?

Getting data into the browser and rendering a table into the browser is fairly trivial.

However, what happens when we want interactivity? We want to take the same data and allow the client to transform it in a way that works for them.