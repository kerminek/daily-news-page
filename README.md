# Daily News Page
&nbsp;&nbsp;&nbsp;This project used to show the current news from NYTimes and Reuters agencies, but due to the many problems with their RSS support, I removed that functionality. Only NASA's Picture of the Day is being fetched from their API.

&nbsp;&nbsp;&nbsp;I think that this project features a pretty interesting layout, both on desktop and mobile. The only problem I've had was with limiting both API and RSS usage so the content wouldn't be refreshed too often. I couldn't really do that using classic cache strategies because I don't have any server to deploy my things; I use just Vercel. Of course, I could use a database and keep there a date of the last successful page generation. But I didn't want to use a database service to store just one value. So I've decided to use a Next.js feature called 'Incremental Static Regeneration (ISR)'.

## Technologies used in this project:
  - Next.js
  - Tailwind
  - A little bit of Typescript
