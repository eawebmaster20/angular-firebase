const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// Define the static routes for your app
const staticRoutes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  // Add more routes as needed
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://your-site.com' });

  staticRoutes.forEach(route => {
    sitemap.write(route);
  });

  // If you have dynamic routes (like blog posts or products),
  // you can fetch them from an API or database here and add them to the sitemap
  // Example:
  // const posts = await fetchPostsFromAPI();
  // posts.forEach(post => {
  //   sitemap.write({ url: `/posts/${post.id}`, changefreq: 'weekly', priority: 0.8 });
  // });

  sitemap.end();
  const xml = await streamToPromise(sitemap);

  // Write the sitemap to the 'dist' folder or wherever your build files are located
  fs.writeFileSync('./dist/sitemap.xml', xml.toString());

  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);
