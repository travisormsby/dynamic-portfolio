//TODO: dynamically display skill blurb text

/*get the URL query parameters to set any skills to be checked on load.
The query parameters need to be formatted '?skills='
followed by a semicolon separated list of skills to check on load.
So to load skills called GIS and JavaScript, for example, the URL
should end with portfolio.html?skills=GIS;JavaScript
*/
const urlParams = new URLSearchParams (window.location.search);

try {
  var checkedSkills = urlParams.get ('skills').split (';');
} catch (err) {
  var checkedSkills = [];
}

// initialize variables to hold the selected skills and corresponding portfolio artifacts
var skills = {};
var displayedArtifacts = new Set ();

// function to create list of artifacts that correspond to selected skills
const skillDisplay = function () {
  checkedSkills.forEach (skill => {
    if (skills.hasOwnProperty (skill)) {
      skills[skill].forEach (artifact => {
        displayedArtifacts.add (artifact);
      });
    }
  });
};

// function to display artifacts that have the selected skills
const displayArtifacts = function () {
  document.querySelectorAll ('.artifact').forEach (artifact => {
    if (displayedArtifacts.has (parseInt (artifact.id))) {
      artifact.style.display = 'block';
    } else {
      artifact.style.display = 'none';
    }
  });
};

// function to display the skill blurbs associated with selected skill
const displayBlurbs = function () {
  document.querySelectorAll ('.skill-blurb').forEach (blurb => {
    if (checkedSkills.includes (blurb.getAttribute ('name'))) {
      blurb.style.display = 'block';
    } else {
      blurb.style.display = 'none';
    }
  });
};

// get the portfolio content and convert from JSON string into object
const portfolioContent = fetch (
  './data/portfolio-content.json'
).then (content => {
  return content.json ();
});

// create the artifact display divs for each artifact in the portfolio
const artifactMarkup = portfolioContent.then (content => {
  content.artifacts.forEach (artifact => {
    skillDiv = document.createElement ('div');

    Object.keys (artifact.skills).forEach (skill => {
      skillText = document.createElement ('p');
      skillText.setAttribute ('class', 'skill-blurb ');
      skillText.setAttribute ('name', skill);
      skillText.innerHTML = `<strong>${skill}:</strong> ${artifact.skills[skill]}`;
      skillDiv.appendChild (skillText);

      if (skills.hasOwnProperty (skill)) {
        skills[skill].push (artifact.id);
      } else {
        skills[skill] = [artifact.id];
      }
    });

    artifactDiv = document.createElement ('div');
    artifactDiv.id = artifact.id;
    artifactDiv.setAttribute ('class', 'artifact');
    document.body.appendChild (artifactDiv);

    title = document.createElement ('h1');
    title.innerHTML = artifact.title;
    artifactDiv.appendChild (title);

    projectLink = document.createElement ('a');
    projectLink.setAttribute ('href', artifact.fullURL);
    projectLink.setAttribute ('target', '_blank');
    artifactDiv.appendChild (projectLink);

    thumbnail = document.createElement ('img');
    thumbnail.setAttribute ('class', 'thumbnail');
    thumbnail.src = artifact.thumbnailURL;
    projectLink.appendChild (thumbnail);

    artifactDiv.appendChild (skillDiv);
  });

  skillDisplay ();
  displayArtifacts ();
  displayBlurbs ();
});

// create checkboxes for each skill in the portfolio
const skillMarkup = portfolioContent.then (() => {
  skillDiv = document.querySelector ('#skillBoxes');

  let skillCounter = 0;

  Object.keys (skills).forEach (skill => {
    checkBox = document.createElement ('input');
    checkBox.type = 'checkbox';
    checkBox.id = 'skill' + skillCounter;
    checkBox.value = skill;
    if (checkedSkills.includes (skill)) {
      checkBox.setAttribute ('checked', 'true');
    }

    // the event listener will toggle artifacts on/off depending on whether the skills
    // associated with them are checked
    checkBox.addEventListener ('change', function () {
      displayedArtifacts.clear ();

      if (this.checked) {
        checkedSkills.push (skill);
      } else {
        checkedSkills = checkedSkills.filter (item => item !== skill);
      }
      skillDisplay ();
      displayArtifacts ();
      displayBlurbs ();
    });
    checkBoxLabel = document.createElement ('label');
    checkBoxLabel.setAttribute ('for', 'skill' + skillCounter);
    checkBoxLabel.innerHTML = skill;
    skillDiv.appendChild (checkBox);
    skillDiv.appendChild (checkBoxLabel);
    skillCounter++;
  });
});
