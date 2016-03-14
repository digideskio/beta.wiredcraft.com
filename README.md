The official Wiredcraft website. A mix of Jekyll, npm, bower, bourbon and gulp.

## Gotchas


- **Blog posts vs. other content types**: blog posts are stored in the `_posts/` folder. They differ a bit from the other collections (i.e. `_work`, `_team` or `_jobs`) in that they **require** a date in their filename (e.g. `2015-06-28-my-awesome-post.md` and not just `my-awesome-post.md`) and auto generate an excerpt (see below).
- **Preview picture**: for most pages you should define a `preview:` attribute which is an absolute URL for the picture you want to show on the Twitter, LinkedIn and Facebook cards when sharing content.
- **Relative and absolute paths for images**: in the case of blog posts, because they end up feeding the RSS feeds (`atom.xml` and `newsletter.xml`), you need to use absolute path (*aka* `http://wiredcraft.com/images/my-pretty-pic.png` instead of `/images/my-pretty-pic.png`) to make sure it will display in RSS readers and emails.
- **Excerpt**: excerpts are teasers for the content that get used in multiple places; as the `<meta name='description'>`, as the description for the Open Graph and Twitter Cards (the text that shows when you share a URL from our website on Twitter, Facebook or LinkedIn) or the feeds (`atom.xml` and `newsletter.xml`). You can do one of two things:
  - Drop a `<!-- more -->` tag in the content to specify where the excerpt stops (e.g. any blog post),
  - Define an `excerpt:` attribute in the YAML font matter (e.g. `index.html`).
- **Drafts**: the `_drafts/` folder allows you to add posts that are not published on GitHub pages, but can be seen locally by using the `--drats` flag (i.e. `jekyll serve --drafts`). [More about this on Jekyllrb.com](http://jekyllrb.com/docs/drafts/).
- **`_newsletter/`**: the `_newsletter/` folder contains the code (HTML and SCSS/CSS) that was used to generate the email template used on mailchimp. It serves no purpose on the site and is just present here for reference.
- **SEO**: make sure there's always a decent excerpt, that you pick up a preview image and that you add at most 2 keywords that will add up to the 8 site-wide keywords ([you can read more about why you need these 10 or less  keywords](http://www.searchenginejournal.com/maximizing-your-meta-tags-for-seo-and-ctr/));
  - Washington DC
  - strategy
  - design
  - data visualization
  - Open Data
  - international development
  - Berlin
  - Shanghai

  ## Install

  We use both npm and bower, respectively for the gulp dependencies (+ eggshell) and 3rd party JS:

      npm install
      bower install

  You also may need to install the `githug-pages` gem:

      sudo gem install github-pages

  ## Build

  You'll need to build the JS and CSS:

      gulp

  ## Run

  It's a regular jekyll site:

      jekyll serve

  If you're running it locally, you'll need to overload the configuration with the development specific variables (makes sure we don't prepend resources links with the URL for example):

      jekyll serve --config _config.yml,_config-dev.yml
