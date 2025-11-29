const { default: experienceJson } = await import('./experience.json', {
  with: { type: 'json' }
});

class ExperienceNode {
  constructor({ start_date, end_date, company, title, achievements }) {
    this.start = this.formatDate(start_date);
    this.end = this.formatDate(end_date);
    this.company = company;
    this.position = title;
    // Join achievements array into a single string
    this.description = Array.isArray(achievements) ? achievements.join('\n• ') : achievements;
  }

  formatDate(dateStr) {
    const months = {
      'January': '01', 'February': '02', 'March': '03', 'April': '04',
      'May': '05', 'June': '06', 'July': '07', 'August': '08',
      'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };
    
    const [month, year] = dateStr.split(' ');
    return `${months[month]}/${year}`;
  }
}

const experiences = experienceJson.experience.map(exp => new ExperienceNode(exp));

export { experiences };