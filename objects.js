const { default: experienceJson } = await import('./experience.json', {
  with: { type: 'json' }
});

class ExperienceNode {
  constructor({ start_date, end_date, company, title, achievements }) {
    this.start = start_date;
    this.end = end_date;
    this.company = company;
    this.position = title;
    this.description = achievements;
  }
}

const cventExp = new ExperienceNode(experienceJson.experience[0]);
const mitreAiExp = new ExperienceNode(experienceJson.experience[1]);
const mitreSweExp = new ExperienceNode(experienceJson.experience[2]);
const sysAdminExp = new ExperienceNode(experienceJson.experience[3]);


export {cventExp, mitreAiExp, mitreSweExp, sysAdminExp}