// dummy data in here
const users = [
  { username: "sofiec", password: "bennie" },
  { username: "Admonia", password: "MockingJay" },
  { username: "chrlee20043", password: "ilovetocode123" },
  { username: "jennifer", password: "teddy" },
];

const museums = [
  {
    museumName: "The Metropolitan Museum of Art",
    image: "https://media.timeout.com/images/106041969/750/422/image.jpg",
    description:
      "The Met is a world-renowned art museum in New York City, founded in 1870. It boasts a vast and diverse collection spanning 5,000 years, featuring art and artifacts from various cultures and civilizations. It's a major cultural institution known for its exceptional art holdings and educational programs.",
    link: "https://www.metmuseum.org/",
    type: "art",
    lat: 40.779434,
    lng: -73.963402,
  },
  {
    museumName: "The Guggenheim Museum",
    image:
      "https://www.guggenheim.org/wp-content/uploads/2022/09/installation-srgm-storylines-contemporary-art-at-the-guggenheim-2015.jpg",
    description:
      "The Guggenheim Museum in New York City is an architectural marvel and a hub of modern and contemporary art. Designed by renowned architect Frank Lloyd Wright, its iconic spiral structure is a work of art in itself. Inside, you'll discover a world-class collection of avant-garde and abstract art, including works by artists like Picasso, Kandinsky, and Pollock. As you ascend the spiraling ramps, you'll experience a unique journey through the evolution of art and culture. With its innovative architecture and diverse exhibitions, the Guggenheim offers visitors an unforgettable artistic experience at every turn.",
    link: "https://www.guggenheim.org/",
    type: "art",
    lat: 40.782951,
    lng: -73.958992,
  },
  {
    museumName: "The MoMa",
    image:
      "https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1635866732/pcsrgie8hynaag88gkax.jpg",
    description:
      "The Museum of Modern Art, often referred to as MoMA, is a world-renowned institution dedicated to showcasing the finest examples of modern and contemporary art. Located in the heart of New York City, MoMA boasts an impressive collection of paintings, sculptures, photography, films, and design objects created by some of the most influential artists of the 20th and 21st centuries. From Picasso's 'Les Demoiselles d'Avignon' to van Gogh's 'Starry Night,' the museum's galleries offer a captivating journey through the evolution of art and creativity. With its commitment to innovation and artistic expression, MoMA continues to inspire and challenge the boundaries of the art world.",
    link: "https://www.moma.org/",
    type: "art",
    lat: 40.761509,
    lng: -73.978271,
  },
  {
    museumName: "The Whitney Museum of American Art",
    image:
      "https://whitneymedia.org/assets/image/781045/large_lehoux-630.006-web.jpg",
    description:
      "As the preeminent institution devoted to the art of the United States, the Whitney Museum of American Art presents the full range of twentieth-century and contemporary American art, with a special focus on works by living artists. The Whitney is dedicated to collecting, preserving, interpreting, and exhibiting American art, and its collection—arguably the finest holdings of twentieth-century American art in the world—is the Museum's key resource. The Museum's flagship exhibition, the Biennial, is the country's leading survey of the most recent developments in American art.",
    link: "https://whitney.org/",
    type: "art",
    lat: 40.739613,
    lng: -74.00898,
  },
  {
    museumName: "American Museum of Natural History",
    image: "https://tinyurl.com/mrsaznbk",
    description:
      "The American Museum of Natural History (AMNH) is an iconic institution located in the heart of New York City. Founded in 1869, it stands as one of the largest and most renowned natural history museums in the world, attracting millions of visitors annually. Nestled within Central Park on the Upper West Side of Manhattan, this magnificent museum is not only a testament to human curiosity and scientific exploration but also a cherished cultural treasure.",
    link: "https://www.amnh.org/",
    type: "academic",
    lat: 40.781303,
    lng: -73.974113,
  },
  {
    museumName: "The Museum of the Moving Image",
    image: "https://media.timeout.com/images/101748989/image.jpg",
    description:
      "The Museum of the Moving Image, located in New York City, is a cultural institution dedicated to the art, history, and technology of film, television, and digital media. It offers visitors a dynamic and interactive experience, showcasing the evolution of moving images and their impact on our culture. The museum features exhibitions, screenings, and educational programs that explore the rich history and creative process behind motion pictures and digital media.",
    link: "https://movingimage.us/",
    type: "academic",
    lat: 40.756345,
    lng: -73.92395,
  },
  {
    museumName: "The Tenement Museum",
    image:
      "https://static01.nyt.com/images/2020/04/21/arts/21virus-tenement1/21virus-tenement1-mediumSquareAt3X.jpg",
    description:
      "The Tenement Museum, located in New York City, is a historical museum that tells the stories of immigrant life in the late 19th and early 20th centuries. Housed in a tenement building, it offers guided tours and exhibits that recreate the living conditions and experiences of the diverse immigrant communities that once called the building home. The museum provides a glimpse into the challenges, aspirations, and contributions of these immigrant families, highlighting their role in shaping the city's history and culture.",
    link: "https://www.tenement.org/",
    type: "academic",
    lat: 40.718796,
    lng: -73.99007,
  },
  {
    museumName: "The NY Transit Museum",
    image: "https://nytransitmuseum.org/wp-content/uploads/2016/05/About.jpg",
    description:
      "The Transit Museum, situated in New York City, is a museum dedicated to the history and development of public transportation in the city. It showcases an extensive collection of vintage subway cars, buses, and related artifacts. Visitors can explore the evolution of New York City's transit system through exhibits, interactive displays, and historic vehicles, offering insights into the vital role public transportation has played in shaping the city's growth and daily life.",
    link: "https://www.nytransitmuseum.org/",
    type: "academic",
    lat: 40.690527,
    lng: -73.989818,
  },
  {
    museumName: "The Brooklyn Museum",
    image:
      "https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1637210908/j407bgg6ewkt2qqloqjo.jpg",
    description:
      "The Brooklyn Museum, founded in 1895, is one of the oldest and largest art museums in the United States. It houses over 1.5 million diverse artworks, from ancient Egyptian artifacts to contemporary pieces, in a Beaux-Arts building designed by McKim, Mead & White. The museum hosts temporary exhibitions, educational programs, and special events, fostering inclusivity and community engagement while enriching Brooklyn's cultural landscape.",
    link: "https://www.brooklynmuseum.org/",
    type: "art",
    lat: 40.6709108,
    lng: -73.963316,
  },
  {
    museumName: "The Museum of the City of New York",
    image: "https://artnexus.com:3000/uploads/2017/04/1be9b8vlm-mcny.jpg",
    description:
      "The Museum of the City of New York is a treasure trove of history and culture, dedicated to preserving and celebrating the vibrant tapestry of New York City. Located on the iconic Fifth Avenue, this museum offers a captivating journey through the city's past, present, and future. Explore an extensive collection of artifacts, photographs, and exhibitions that showcase the city's rich history, diverse communities, and innovative spirit. From the early days of Dutch colonization to the ever-evolving metropolis we know today, The Museum of the City of New York provides a captivating window into the heart and soul of the Big Apple.",
    link: "https://www.mcny.org/",
    type: "academic",
    lat: 40.7925,
    lng: -73.9519,
  },
  {
    museumName: "The MET Cloisters",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTAjd95UIiQLnIZs4DDh_-vu2469uN1POaRQ&usqp=CAU",
    description:
      "The Cloisters is a branch of the Metropolitan Museum of Art in New York City dedicated to medieval European art and architecture. It's designed to look like a medieval monastery and features a remarkable collection of art and artifacts from the Middle Ages. The museum's peaceful setting and gardens provide a unique and serene experience for visitors.",
    link: "https://www.metmuseum.org/visit/plan-your-visit/met-cloisters",
    type: "art",
    lat: 40.8649,
    lng: - 73.9312,
  },
  {
    museumName: "The Statue of Liberty Museum",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hACP-dlyYoYdkZkrxTVpxZFdD0nY7uCKpA&usqp=CAU",
    description:
      "The Statue of Liberty Museum, located on Liberty Island in New York Harbor, is a captivating museum dedicated to the iconic symbol of freedom and democracy: the Statue of Liberty. It features engaging exhibits and historical artifacts that chronicle the statue's origin, construction, and its enduring role in American history and immigration. Visitors can explore the museum to gain a deeper understanding of the statue's cultural significance and the values it represents.",
    link: "https://www.statueofliberty.org/statue-of-liberty/statue-of-liberty-museum/?gclid=CjwKCAjw-KipBhBtEiwAWjgwrPVF15rZ8hB81HblpAmKQv13TP-Es1BXQeXeONBKr1WypXSYugO8wRoCogQQAvD_BwE",
    type: "academic",
    lat: 40.6910,
    lng: - 74.0461,
  },
  {
    museumName: "The Noguchi Museum",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9F98MonOhCiKl6exAB1_aRUic0Zi1inh-HA&usqp=CAU",
    description:
      "The Noguchi Museum and Garden, located in Long Island City, New York, is a unique space dedicated to the works of Isamu Noguchi, a prominent Japanese-American sculptor and artist. The museum showcases Noguchi's sculptures, designs, and his innovative approach to art and design. The serene outdoor garden complements the indoor displays, providing a tranquil environment for visitors to appreciate the fusion of art, sculpture, and nature.",
    link: "https://www.noguchi.org/",
    type: "art",
    lat: 40.7668,
    lng: - 73.9381,
  },
  {
    museumName: "Bartow-Pell Mansion Museum",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaUBHBbs6g7dqllZVfu_oHhRY92gr8VuaPEg&usqp=CAU",
    description:
      "The Bartow-Pell Mansion Museum, nestled in Pelham Bay Park in the Bronx, New York, is a historic gem. This 19th-century mansion, surrounded by lush gardens, offers visitors a glimpse into the elegance and charm of the past. It features art, architecture, and period furnishings, making it a delightful destination for history and architecture enthusiasts.",
    link: "https://www.bartowpellmansionmuseum.org/",
    type: "art",
    lat: 40.8716,
    lng: - 73.8052,
  },
  {
    museumName: "Asia Society Museum",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx3YGwItAeLgf4MnlZ1Zjm-0OcOq-0fsGzKQ&usqp=CAU",
    description:
      "The Bartow-Pell Mansion Museum, nestled in Pelham Bay Park in the Bronx, New York, is a historic gem. This 19th-century mansion, surrounded by lush gardens, offers visitors a glimpse into the elegance and charm of the past. It features art, architecture, and period furnishings, making it a delightful destination for history and architecture enthusiasts.",
    link: "https://asiasociety.org/museum",
    type: "academic",
    lat: 40.7684,
    lng: - 73.9655,
  },
  {
    museumName: "Museum Of Sex",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA-iPlVuQtKCEqBkj59bNYhlg8hFOfOj1pTA&usqp=CAU",
    description:
      "The Museum of Sex, situated in New York City, is a unique and provocative museum dedicated to exploring human sexuality through various exhibits, art, and educational displays. It offers a candid and thought-provoking perspective on this often-taboo topic, making it an intriguing destination for those interested in human relationships and culture.",
    link: "https://www.museumofsex.com/",
    type: "other",
    lat: 40.7440,
    lng: - 73.9874,
  },
  {
    museumName: "Coney Island Museum",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTqJMMP_XzNO78uszdMTAOS4DPO0pDKn5UMw&usqp=CAU",
    description:
      "The Coney Island Museum, located in the famous Coney Island of Brooklyn, New York, is a place where visitors can explore the rich history and unique culture of this iconic amusement destination. It features a collection of artifacts, exhibits, and memorabilia that celebrate the vibrant past and present of Coney Island, making it a fascinating destination for history and amusement park enthusiasts.",
    link: "https://www.coneyislandmuseum.org/",
    type: "academic",
    lat: 40.5741,
    lng: - 73.9823,
  },  
  {
    museumName: "Gracie Mansion Conservancy",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxhetme7zPby57DFdau7FzDf7CkcKxtr8log&usqp=CAU",
    description:
      "Gracie Mansion, located in Manhattan, New York City, serves as the official residence of the city's mayor. This historic mansion, set in a picturesque park, has a rich history and serves as an important symbol of civic leadership and public events in the city.",
    link: "https://www.graciemansion.org/",
    type: "academic",
    lat: 40.7779,
    lng: - 73.9430,
  },  
  {
    museumName: "King Manor Museum",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHqHiqqdr1kK5PDtT2LdslPeJcZ5l1jZTsvw&usqp=CAU",
    description:
      "The King Manor Museum in Queens, New York City is a historic treasure. It was once the home of Rufus King, a Founding Father and early American statesman. The museum offers a glimpse into the life and times of the early United States, featuring exhibits and artifacts showcasing this important period in American history.",
    link: "https://www.kingmanor.org/",
    type: "academic",
    lat: 40.7018,
    lng: - 73.8072,
  },  
  {
    museumName: "Dia Art Foundation",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdcc_2cdOEkHSLvDuzutSi2kvE4dpMnjdvJg&usqp=CAU",
    description:
      "The Dia Art Foundation in Chelsea, New York City, is a renowned cultural institution. It's dedicated to showcasing avant-garde contemporary art, often in unconventional and immersive ways, offering visitors a unique and thought-provoking art experience.",
    link: "https://www.diaart.org/",
    type: "art",
    lat: 40.7497,
    lng: -  74.0067,
  }, 
   {
    museumName: "Neue Galerie",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVKNd3S8YEdNMtFqc7XGxXKq4o3gxXi9DqjA&usqp=CAU",
    description:
      "The Neue Galerie New York is a distinguished museum in Manhattan that specializes in early 20th-century German and Austrian art and design. It features an exceptional collection of works by renowned artists like Gustav Klimt and Egon Schiele, as well as decorative arts and design objects from the same era. The museum offers a captivating journey through the vibrant and innovative art movements of the early 1900s.",
    link: "https://www.neuegalerie.org/",
    type: "art",
    lat:  40.7811,
    lng: - 73.9635,
  }, 
  {
    museumName: "Jackie Robinson Museum",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnyLYAdTvHkC5pcHBq8JhsW1X_mjqzFHWcWA&usqp=CAU",
    description:
      "The Jackie Robinson Museum, situated in New York City, is a tribute to the life and legacy of Jackie Robinson, the first African American to play in Major League Baseball. This museum tells the inspiring story of his achievements, contributions to the civil rights movement, and his impact on sports and society. Visitors can explore exhibits, memorabilia, and interactive displays, gaining a deeper understanding of this pioneering figure in American history.",
    link: "https://www.jackierobinsonmuseum.org/",
    type: "academic",
    lat: 40.8206,
    lng: - 73.9469,
  },  
  {
    museumName: "Waterfront Barge Museum",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7L8xIv3DliKUuLl4j0BXlkjky1GBjkQdhHg&usqp=CAU",
    description:
      "The Waterfront Barge Museum in Red Hook, Brooklyn, is a fascinating maritime museum. It showcases the history and heritage of New York's working waterfront through a collection of historic ships, artifacts, and exhibits. Visitors can explore the barge and learn about the city's maritime past, making it a unique destination for those interested in the maritime history of New York.",
    link: "https://waterfrontmuseum.org/",
    type: "academic",
    lat: 40.6727,
    lng: - 74.0064,
  },  
  {
    museumName: "Frick Collection",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThSzr3v5uPQhi0ARlf_pCU9v5JiFcyeoFMlw&usqp=CAU",
    description:
      "The Frick Collection, nestled in the heart of Manhattan, is a renowned art museum housed in the former residence of industrialist Henry Clay Frick. The museum features a superb collection of European art, including works by Old Masters, Renaissance paintings, and decorative arts. Its intimate and elegant setting provides an exceptional environment for art enthusiasts to admire these masterpieces in a unique and historic context.",
    link: "https://www.frick.org/",
    type: "art",
    lat: 40.7711,
    lng: - 73.9672,
  }, 
];

const reviews = [
  {
    userId: 1,
    museumId: 1,
    rating: 5,
    body: "I'm a review",
    date: "2023-09-20",
  },
  {
    userId: 1,
    museumId: 1,
    rating: 5,
    body: "I'm a morty.",
    date: "2023-09-20",
  },
  {
    userId: 1,
    museumId: 2,
    rating: 5,
    body: "I'm a review too",
    date: "2023-09-18",
  },
  { userId: 2, museumId: 3, rating: 5, body: "Reviewing", date: "2023-09-17" },
  {
    userId: 3,
    museumId: 4,
    rating: 5,
    body: "I'm a review",
    date: "2023-09-16",
  },
  {
    userId: 1,
    museumId: 5,
    rating: 5,
    body: "Look at this review",
    date: "2023-09-20",
  },
];

const journal = [
  {
    entryId: 1,
    userId: 1,
    title: "my museum visit",
    body: "journal entry",
    date: "2023-09-23",
  },
  {
    entryId: 2,
    userId: 1,
    title: "Trip to the Natural History Museum",
    body: "Learned a lot about ancient civilizations and fossils at the natural history museum.",
    date: "2023-09-25",
  },
  {
    entryId: 3,
    userId: 2,
    title: "Adventures in Science Museum",
    body: "Took my kids to the science museum, and they had a blast with all the interactive exhibits.",
    date: "2023-09-26",
  },
];

const favorites = [
  { favoriteId: 1, userId: 1, museumId: 1 },
  { favoriteId: 2, userId: 1, museumId: 2 },
];

module.exports = { users, museums, reviews, journal, favorites };
