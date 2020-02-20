# dynamic-portfolio
This small web app was created to help MGIS students at the University of Minnesota create dynamic portfolios.

The idea is that you might want to present a specific subset of portfolio items to a particular potential employer.  That way you can tailor your portfolio to the particular requirements of a position.

The app works by reading information about portfolio artifacts from a json file called portfolio-content.json.  There is an example file in the repo that you can use as a template for your content.

An important, but non-obvious feature of the app is that it allows you to create URLs that will generate a page with specific skills already selected.  You can do that by putting ?skills= after the normal URL for wherever you're hosting the portfolio.html file.  After the = you should put a semicolon separated list of the skills you want to have preselected.  

For example, if you go to [maps.umn.edu/travis/dynamic-portfolio/portfolio.html] (maps.umn.edu/travis/dynamic-portfolio/portfolio.html), you will see a blank portfolio with no artifact selected.  But if you go to [maps.umn.edu/travis/dynamic-portfolio/portfolio.html?skills=Python;Statistics] (maps.umn.edu/travis/dynamic-portfolio/portfolio.html?skills=Python;Statistics), you will see a portfolio with artifacts showing Python and Statistics skills.  This allows you to generate URLs to give to prospective employers that have a default selection of skills that is the most relevant to that position.

The goal is that you can edit the portfolio-content.json file and plug your portfolio right into the app.  You should also alter the content in the portfolio.html file so that it has your name and not mine.  But you may want to do some more in-depth customization of the app.  If you want to make changes to the look of your page, that will primarily be done with the styles.css file.  Altering the scripts.js file will change how the page interacts with the portfolio-content.json content and is recommended only if you have a reasonably good grasp of JavaScript.
