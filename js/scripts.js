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

// function to display the skill blurbs associated with selected skills
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
    let skillDiv = document.createElement ('div');

    Object.keys (artifact.skills).sort ().forEach (skill => {
      let skillText = document.createElement ('p');
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

    let artifactDiv = document.createElement ('div');
    artifactDiv.id = artifact.id;
    artifactDiv.setAttribute ('class', 'artifact');
    artifactDiv.style.order = 10 - artifact.rating; // order artifacts high to low based on rating

    document.querySelector ('#artifactContent').appendChild (artifactDiv);

    let projectLink = document.createElement ('a');
    projectLink.setAttribute ('href', artifact.fullURL);
    projectLink.setAttribute ('target', '_blank');
    artifactDiv.appendChild (projectLink);

    let thumbnail = document.createElement ('img');
    thumbnail.setAttribute ('class', 'thumbnail');
    thumbnail.src = artifact.thumbnailURL;
    projectLink.appendChild (thumbnail);

    let title = document.createElement ('h2');
    title.innerHTML = artifact.title;
    artifactDiv.appendChild (title);

    artifactDiv.appendChild (skillDiv);
  });

  skillDisplay ();
  displayArtifacts ();
  displayBlurbs ();
});

// create checkboxes for each skill in the portfolio
const skillMarkup = portfolioContent.then (() => {
  let skillDiv = document.querySelector ('#skillBoxes');

  // create a checkbox to toggle all other boxes on/off
  let toggleBox = document.createElement ('input');

  toggleBox.type = 'checkbox';
  toggleBox.id = 'toggleBox';
  toggleBox.checked = false;

  let toggleBoxLabel = document.createElement ('label');
  toggleBoxLabel.setAttribute ('for', 'toggleBox');
  toggleBoxLabel.innerHTML = 'Toggle all skills on/off';

  const event = new Event ('change');

  toggleBox.addEventListener ('change', function () {
    document.querySelectorAll ('input[name="skill"').forEach (box => {
      if (this.checked) {
        box.checked = true;
        box.dispatchEvent (event);
      } else {
        box.checked = false;
        box.dispatchEvent (event);
      }
    });
  });
  skillDiv.appendChild (toggleBox);
  skillDiv.appendChild (toggleBoxLabel);

  let skillCounter = 0;

  Object.keys (skills).sort ().forEach (skill => {
    let checkBox = document.createElement ('input');
    checkBox.type = 'checkbox';
    checkBox.id = 'skill' + skillCounter;
    checkBox.setAttribute ('name', 'skill');
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
        document.querySelector ('#toggleBox').checked = false; // if at least one checkbox is off, the all skills box should be unchecked
      }
      skillDisplay ();
      displayArtifacts ();
      displayBlurbs ();
    });
    let checkBoxLabel = document.createElement ('label');
    checkBoxLabel.setAttribute ('for', 'skill' + skillCounter);
    checkBoxLabel.innerHTML = skill;
    skillDiv.appendChild (checkBox);
    skillDiv.appendChild (checkBoxLabel);
    skillCounter++;
  });
});
