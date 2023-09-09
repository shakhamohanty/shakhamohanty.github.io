import {
  experience,
  edData,
  workedOnRecently,
  familiarWith,
} from './module/data.js';

const expDiv = document.getElementById('experience');
const edDiv = document.getElementById('education');
const workedRecentlyDiv = document.getElementById('workedOnRecently');
const familiarDiv = document.getElementById('familiarWith');
const printMeDiv = document.getElementById('printMe');
const printMobileDiv = document.getElementById('print-mobile');

printMeDiv.addEventListener('click', () => {
  handlePrint(printMeDiv);
});

printMobileDiv.addEventListener('click', () => {
  handlePrint(printMobileDiv);
});

function handlePrint(element) {
  element.style.display = 'none';
  window.print();
  element.style.display = 'block';
}

function renderExperience() {
  const template = experience.reduce((acc, exp) => {
    const { isMultiPosition } = exp;
    acc += `
      <article>
      <h2>
        <span class="org-name">${exp.organization}${isMultiPosition ? '' : ','}</span>
        ${isMultiPosition ? '' : `<span class="exp-sub__text"> ${exp.location} — ${exp.designation}</span>`}
      </h2>
      ${
        isMultiPosition
          ? `
            ${
              exp.positions.length === 1 
                ? `<div style="margin-top: -1.25rem">`
                : `<div style="margin-left: 2rem; margin-top: -1.75rem">`
            }
            
              ${
                exp.positions.map((p, index) => {
                  return `
                    <div>
                      ${
                        exp.positions.length === 1 
                          ? ''
                          : `<span class="designation-node"></span>`
                      }
                      <div class="${index === exp.positions.length - 1 ? '' : 'designation-path'}">
                        <h2 class="designation-text" style="margin-bottom: 4px">${p.designation}</h2>
                        <p style="opacity: 0.6; margin: -0.25rem 0">${p.duration}</p>
                        <p style="opacity: 0.6; margin: -0.25rem 0">${p.location}</p>
                      </div>
                    </div>
                  `
                }).join('')
              }
            </div>
          `
          : `<p class="from-to">${exp.workedFrom} - ${exp.workedTo}</p>`
      }
      
      <ul> 
        ${exp.didWhat.reduce((liAcc, work) => (liAcc += `<li>${work}</li>`), '')}
      </ul>
    </article>
  `;

    return acc;
  }, '');

  expDiv.innerHTML = template;
}

function renderEducation() {
  const template = edData.reduce((acc, ed) => {
    acc += `
    <article>
    <h2>
      <span class="org-name">${ed.name},</span>
      <span class="exp-sub__text"> ${ed.location} — ${ed.course}</span>
    </h2>
    <p class="from-to">${ed.fromDate} - ${ed.toDate} - <span class="aggregate">${ed.aggregate}</span></p>
    </article>
    `;

    return acc;
  }, '');

  edDiv.innerHTML = template;
}

function renderSkills() {
  const workedRecentlyTemplate = workedOnRecently.reduce((acc, skill) => {
    if (Array.isArray(skill.value)) {
      return (acc += `
          <p>
            <span class="skill-title">${skill.category} : </span>
            <ul style="margin-top: -12px">
              ${skill.value.map((v) => `<li>${v}</li>`).join('')}
            </ul>
          </p>
        `);
    }

    return (acc += `
      <p><span class="skill-title">${skill.category} : </span> ${skill.value}</p>
    `);
  }, '');

  const familiarWithTemplate = familiarWith.reduce(
    (acc, skill) =>
      (acc += `
    <p><span class="skill-title">${skill.category} : </span> ${skill.value}</p>
  `),
    ''
  );

  workedRecentlyDiv.innerHTML = workedRecentlyTemplate;
  // familiarDiv.innerHTML = familiarWithTemplate;
}

(function main() {
  renderExperience();
  renderEducation();
  renderSkills();
})();
