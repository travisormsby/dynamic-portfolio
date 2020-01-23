# dynamic-portfolio
This small web app was created to help MGIS students at the University of Minnesota create dynamic portfolios.

The idea is that you might want to present a specific subset of portfolio items to a particular potential employer.  That way you can tailor your portfolio to the particular requirements of a position.

The app works by reading information about portfolio artifacts from a json file called portfolio-content.json.  There is an example file in the repo, but the basic format is as follows:

```json
{
    "artifacts": [
        {
            "id": 
            "title":
            "thumbnailURL":
            "fullURL":
            "skills": {
                "skill1": 
                "skill2":
            }
            "rating":
        }
    ]
}
```

Artifacts are a list of all the different objects in your portfolio.  The id attribute should be a unique identifier of some kind.  The title is a string for what you want to call the artifact.  The thumbnailURL is a string for the URL of an image you want to use as a thumbnail for the artifact.  I recommend using a square image at least 300px in width.  The fullURL is a string for the URL of where people can see the full project.  In the skills object, the keys are strings for the different skills the artifact demonstrates.  The values associated with these keys should be strings that give a short explanation of how the artifact demonstrates that skill.  The rating is your evaluation of how good the artifact is.  The app will display your best artifacts first.
