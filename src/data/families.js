const families = [
  {
    ID: 0,
    name: 'House Stark',
    words: 'Winter is coming',
    allegiance: [4, 10],
    vassals: [1, 9, 12],
    img: '/static/houses/Stark.webp',
    members: ['Jon Snow', 'Sansa Stark', 'Arya Stark', 'Bran Stark', 'Benjen Stark', 'Catelyn Stark', 'Eddard Stark']
  },
  {
    ID: 1,
    name: 'House Tully',
    words: 'Family, Duty, Honor',
    allegiance: [0, 6, 10],
    vassals: [],
    img: '/static/houses/Tully.webp',
    members: ['Edmure Tully']
  },
  {
    ID: 2,
    name: 'House Lannister',
    words: 'Hear Me Roar!',
    allegiance: [4, 10],
    vassals: [],
    img: '/static/houses/Lannister.webp',
    members: ['Cersei Lannister', 'Jaime Lannister', 'Tyrion Lannister']
  },
  {
    ID: 3,
    name: 'House Tyrell',
    words: 'Growing Strong',
    allegiance: [4, 10],
    vassals: [8, 11],
    img: '/static/houses/Tyrell.webp',
    members: ['Olenna Tyrell', 'Mace Tyrell']
  },
  {
    ID: 4,
    name: 'House Targaryen',
    words: 'Fire and Blood',
    allegiance: [],
    vassals: [0, 1, 2, 7, 9, 10],
    img: '/static/houses/Targaryen.webp',
    members: ['Daenerys Targaryen', 'Rhaegar Targaryen']
  },
  {
    ID: 5,
    name: 'House Bolton',
    words: 'Our Blades Are Sharp',
    allegiance: [0],
    vassals: [11],
    img: '/static/houses/Bolton.webp'
  },
  {
    ID: 6,
    name: 'House Frey',
    words: 'We Stand Together',
    allegiance: [0, 2, 10],
    vassals: [],
    img: '/static/houses/Frey.webp'
  },
  {
    ID: 7,
    name: 'House Grayjoy',
    words: 'We Do Not Sow',
    allegiance: [4, 10],
    vassals: [],
    img: '/static/houses/Greyjoy.webp'
  },
  {
    ID: 8,
    name: 'House Tarly',
    words: 'Fist in Battle',
    allegiance: [2],
    vassals: [],
    img: '/static/houses/Tarly.webp'
  },
  {
    ID: 9,
    name: 'House Arryn',
    words: 'As High As Honor',
    allegiance: [0, 10],
    vassals: [],
    img: '/static/houses/Arryn.webp'
  },
  {
    ID: 10,
    name: 'House Baratheon',
    words: 'Ours is the Fury',
    allegiance: [],
    vassals: [0, 1, 2, 3, 5, 6, 7, 9],
    img: '/static/houses/Baratheon.webp',
    members: ['Joffrey Baratheon', 'Myrcella Baratheon', 'Tommen Baratheon', 'Gendry Baratheon', 'Stannis Baratheon']
  },
  {
    ID: 11,
    name: 'House Karstark',
    words: 'The Sun of Winter',
    allegiance: [0, 5],
    vassals: [],
    img: '/static/houses/Karstark.webp'
  },
  {
    ID: 12,
    name: 'House Mormont',
    words: 'Here We Stand',
    allegiance: [0],
    vassals: [],
    img: '/static/houses/Mormont.webp'
  }
]
export default families
