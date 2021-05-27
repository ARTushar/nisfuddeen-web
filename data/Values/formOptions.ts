type InputType = 'SELECT' | 'TEXT';
type Lang = 'en'| 'bn';

interface Info {
  name: string,
  label: {[key: string]: string},
  options?: {value: string, label: string} 
}

export const personalInfo: Info[] = [
  {
    name: 'prayerTimes',
    label: {
      en: 'How many times you pray everyday?'
    },
  }
]