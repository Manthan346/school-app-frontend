// src/data/schoolData.js

export const states = {
  'Pennsylvania': ['Jenkintown', 'Philadelphia', 'Pittsburgh', 'Villanova'],
  'Florida': ['Land O Lakes', 'Miami', 'Orlando', 'Tampa'],
  'Virginia': ['Alexandria', 'Richmond', 'Norfolk'],
  'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Beverly Hills'],
  'New York': ['New York City', 'Buffalo', 'Albany'],
  'Texas': ['Houston', 'Dallas', 'Austin'],
  'Illinois': ['Chicago', 'Springfield', 'Rockford']
}

export const schoolsData = [
  {
    id: 1,
    name: 'Abington Friends School',
    address: '575 Washington Lane, Jenkintown, PA 19046',
    state: 'Pennsylvania',
    city: 'Jenkintown',
    type: 'Day School',
    gender: 'Coed',
    grades: 'PK-12',
    code: '1030',
    established: '1697',
    students: '650',
    website: 'https://abingtonfriends.net'
  },
  {
    id: 2,
    name: 'Academy at the Lakes',
    address: '2331 Collier Parkway, Land O Lakes, FL 34639',
    state: 'Florida',
    city: 'Land O Lakes',
    type: 'Day School',
    gender: 'Coed',
    grades: 'PK-12',
    code: '1057',
    established: '1992',
    students: '450',
    website: 'https://academyatthelakes.org'
  },
  {
    id: 3,
    name: 'Academy of Notre Dame de Namur',
    address: '560 Sproul Road, Villanova, PA 19085',
    state: 'Pennsylvania',
    city: 'Villanova',
    type: 'Day School',
    gender: 'Girls',
    grades: '6-12',
    code: '1081',
    established: '1864',
    students: '380',
    website: 'https://ndapa.org'
  },
  {
    id: 4,
    name: 'Alexandria Country Day School',
    address: '2400 Russell Road, Alexandria, VA 22301',
    state: 'Virginia',
    city: 'Alexandria',
    type: 'Day School',
    gender: 'Coed',
    grades: 'K-8',
    code: '1190',
    established: '1983',
    students: '280',
    website: 'https://acdsnet.org'
  },
  {
    id: 5,
    name: 'Beverly Hills Preparatory',
    address: '9615 Olympic Blvd, Beverly Hills, CA 90210',
    state: 'California',
    city: 'Beverly Hills',
    type: 'Day School',
    gender: 'Coed',
    grades: '9-12',
    code: '1245',
    established: '2001',
    students: '320',
    website: 'https://bhprep.org'
  },
  {
    id: 6,
    name: 'Trinity School NYC',
    address: '139 W 91st St, New York, NY 10024',
    state: 'New York',
    city: 'New York City',
    type: 'Day School',
    gender: 'Coed',
    grades: 'K-12',
    code: '1456',
    established: '1709',
    students: '950',
    website: 'https://trinityschoolnyc.org'
  },
  {
    id: 7,
    name: 'St. Johns School Houston',
    address: '2401 Claremont Ln, Houston, TX 77019',
    state: 'Texas',
    city: 'Houston',
    type: 'Day School',
    gender: 'Coed',
    grades: 'K-12',
    code: '1598',
    established: '1946',
    students: '1250',
    website: 'https://sjs.org'
  },
  {
    id: 8,
    name: 'Chicago Latin School',
    address: '59 W North Blvd, Chicago, IL 60610',
    state: 'Illinois',
    city: 'Chicago',
    type: 'Day School',
    gender: 'Coed',
    grades: 'JK-12',
    code: '1672',
    established: '1888',
    students: '1100',
    website: 'https://latinschool.org'
  },
  {
    id: 9,
    name: 'Miami Prep Academy',
    address: '1250 Biscayne Blvd, Miami, FL 33132',
    state: 'Florida',
    city: 'Miami',
    type: 'Day School',
    gender: 'Coed',
    grades: '6-12',
    code: '1734',
    established: '1995',
    students: '520',
    website: 'https://miamiprep.org'
  },
  {
    id: 10,
    name: 'San Francisco Day School',
    address: '350 Masonic Ave, San Francisco, CA 94118',
    state: 'California',
    city: 'San Francisco',
    type: 'Day School',
    gender: 'Coed',
    grades: 'K-8',
    code: '1889',
    established: '1975',
    students: '340',
    website: 'https://sfds.net'
  },
  {
    id: 11,
    name: 'Phillips Academy Andover',
    address: '180 Main Street, Andover, MA 01810',
    state: 'Massachusetts',
    city: 'Andover',
    type: 'Boarding School',
    gender: 'Coed',
    grades: '9-12',
    code: '2001',
    established: '1778',
    students: '1150',
    website: 'https://andover.edu'
  },
  {
    id: 12,
    name: 'The Lawrenceville School',
    address: '2500 Main Street, Lawrenceville, NJ 08648',
    state: 'New Jersey',
    city: 'Lawrenceville',
    type: 'Boarding School',
    gender: 'Coed',
    grades: '9-12',
    code: '2045',
    established: '1810',
    students: '816',
    website: 'https://lawrenceville.org'
  }
]

export const genderOptions = [
  { value: 'Coed', label: 'Coed' },
  { value: 'Girls', label: 'Girls School' },
  { value: 'Boys', label: 'Boys School' }
]

export const schoolTypes = [
  { value: 'Day School', label: 'Day School' },
  { value: 'Boarding School', label: 'Boarding School' },
  { value: 'Both', label: 'Day & Boarding' }
]
