'use strict';

/* Fidan Gallery — vanilla JavaScript, no framework required. */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const commonsFile = (filename, width = 1200) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;
const commonsPage = (filename) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename.replaceAll(' ', '_'))}`;

const artworks = [
  {
    id: 'mona-lisa', title: 'Mona Lisa', artist: 'Leonardo da Vinci', year: 'c. 1503–1506', movement: 'Renaissance', category: 'Renaissance',
    medium: 'Oil on poplar panel', museum: 'Musée du Louvre, Paris', era: 'High Renaissance',
    summary: 'A quietly enigmatic portrait, celebrated for its soft atmosphere and famously elusive smile.',
    story: 'Leonardo developed the portrait over several years, using delicate layers of translucent paint and sfumato — a technique that softens transitions between light and shadow. Its calm landscape and inward-looking subject helped make the painting one of the most discussed portraits in history.',
    fact: 'The painting is smaller than many visitors expect: approximately 77 × 53 cm.',
    imageFiles: ['Leonardo da Vinci - Mona Lisa.jpg', 'Leonardo da Vinci - Mona Lisa (Louvre, Paris).jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:Leonardo_da_Vinci_-_Mona_Lisa.jpg', aspect: 'portrait'
  },
  {
    id: 'starry-night', title: 'The Starry Night', artist: 'Vincent van Gogh', year: '1889', movement: 'Post-Impressionism', category: 'Post-Impressionism',
    medium: 'Oil on canvas', museum: 'Museum of Modern Art, New York', era: 'Post-Impressionism',
    summary: 'A restless sky swirls above a sleeping village in one of the most recognisable images in modern art.',
    story: 'Van Gogh painted the view from his room at the Saint-Paul-de-Mausole asylum in Saint-Rémy, combining observed landscape with imagined elements. The swirling brushwork, vivid blue and yellow contrasts, and towering cypress tree turn a night scene into an expressive emotional landscape.',
    fact: 'The village in the painting was not copied exactly from the view outside Van Gogh’s window.',
    imageFiles: ['VanGogh-starry night.jpg', 'Vincent van Gogh Starry Night.jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:VanGogh-starry_night.jpg', aspect: 'landscape'
  },
  {
    id: 'persistence-memory', title: 'The Persistence of Memory', artist: 'Salvador Dalí', year: '1931', movement: 'Surrealism', category: 'Surrealism',
    medium: 'Oil on canvas', museum: 'Museum of Modern Art, New York', era: 'Surrealism',
    summary: 'A dreamlike landscape questions the certainty of time with strange, softened forms.',
    story: 'Dalí’s small 1931 painting became a defining image of Surrealism, a movement interested in dreams, unexpected juxtapositions, and the unconscious. Rather than treating time as a rigid measurement, the scene makes it feel unstable and subjective.',
    fact: 'The original painting is relatively small, measuring about 24 × 33 cm.',
    // This work may not have an openly licensed reproduction on Wikimedia Commons in every jurisdiction.
    // The museum reference is provided; if no permitted image source loads, the code uses a clearly labelled local visual fallback.
    imageFiles: ['The Persistence of Memory.jpg', 'Salvador Dalí - The Persistence of Memory.jpg'],
    source: 'https://www.moma.org/collection/works/79018', aspect: 'landscape', fallbackPalette: ['#8ca1a0', '#d5ab70', '#5d5048']
  },
  {
    id: 'girl-pearl-earring', title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', year: 'c. 1665', movement: 'Baroque', category: 'Baroque',
    medium: 'Oil on canvas', museum: 'Mauritshuis, The Hague', era: 'Dutch Golden Age',
    summary: 'A young figure turns toward the viewer, her luminous earring catching a small point of light.',
    story: 'Often described as a tronie — a study of an expressive face or character rather than a conventional portrait — the painting is admired for its deep background, delicate highlights, and the sense that the subject has just turned at the sound of someone entering the room.',
    fact: 'The pearl appears unusually large; it may be an imagined or glass imitation rather than a natural pearl.',
    imageFiles: ['1665 Girl with a Pearl EarringFXD.jpg', 'Girl with a Pearl Earring.jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:1665_Girl_with_a_Pearl_EarringFXD.jpg', aspect: 'portrait'
  },
  {
    id: 'birth-venus', title: 'The Birth of Venus', artist: 'Sandro Botticelli', year: 'c. 1485–1486', movement: 'Renaissance', category: 'Renaissance',
    medium: 'Tempera on canvas', museum: 'Uffizi Gallery, Florence', era: 'Early Renaissance',
    summary: 'Venus arrives on the shore in an elegant mythological scene filled with flowing lines.',
    story: 'Botticelli presents the ancient goddess Venus standing on a shell as wind carries her toward the shore. Its graceful figures, rhythmic drapery, and mythological subject reflect the Renaissance revival of classical literature and ideals of beauty.',
    fact: 'Unlike many large Renaissance paintings, this work was painted on canvas rather than a wooden panel.',
    imageFiles: ['The Birth of Venus (Botticelli) 1.jpg', 'Birth of Venus.jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:The_Birth_of_Venus_(Botticelli)_1.jpg', aspect: 'landscape'
  },
  {
    id: 'last-supper', title: 'The Last Supper', artist: 'Leonardo da Vinci', year: 'c. 1495–1498', movement: 'Renaissance', category: 'Renaissance',
    medium: 'Tempera and oil experiment on plaster', museum: 'Santa Maria delle Grazie, Milan', era: 'High Renaissance',
    summary: 'A monumental wall painting captures the apostles’ reactions to a moment of revelation.',
    story: 'Leonardo arranged the figures in groups of three around the central figure of Christ, using perspective lines to draw attention to the scene’s centre. The experimental technique on the wall, unlike traditional true fresco, contributed to the painting’s long and difficult history of conservation.',
    fact: 'The painting is a wall mural in a Milanese convent refectory, not a portable canvas.',
    imageFiles: ['Leonardo da Vinci (1452-1519) - The Last Supper (1495-1498).jpg', 'The Last Supper - Leonardo Da Vinci.jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:Leonardo_da_Vinci_(1452-1519)_-_The_Last_Supper_(1495-1498).jpg', aspect: 'landscape'
  },
  {
    id: 'great-wave', title: 'The Great Wave off Kanagawa', artist: 'Katsushika Hokusai', year: 'c. 1831', movement: 'Ukiyo-e', category: 'Ukiyo-e',
    medium: 'Colour woodblock print', museum: 'Copies held in collections worldwide', era: 'Edo period',
    summary: 'A towering wave curls above small boats while Mount Fuji rests in the distance.',
    story: 'Part of Hokusai’s series Thirty-six Views of Mount Fuji, the print contrasts the force of the sea with the distant mountain. Its strong contours and carefully layered blues helped the image become an influential example of Japanese ukiyo-e printmaking.',
    fact: 'The deep blue pigment used in many impressions was the imported synthetic pigment Prussian blue.',
    imageFiles: ['1952.343 - Under the Wave off Kanagawa (Kanagawa oki nami.jpg', 'The Great Wave off Kanagawa.jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:1952.343_-_Under_the_Wave_off_Kanagawa_(Kanagawa_oki_nami.jpg', aspect: 'landscape'
  },
  {
    id: 'american-gothic', title: 'American Gothic', artist: 'Grant Wood', year: '1930', movement: 'Modern Art', category: 'Modern Art',
    medium: 'Oil on beaverboard', museum: 'Art Institute of Chicago', era: 'American Regionalism',
    summary: 'Two solemn figures pose before a farmhouse with a sharply pointed Gothic window.',
    story: 'Wood modelled the figures on his sister Nan and his dentist, asking them to pose as a daughter and father. The painting has inspired many readings — from regional pride to satire — and its deliberate, formal arrangement gives it an unmistakable presence.',
    fact: 'The models were not a married couple, despite how often the figures are interpreted that way.',
    imageFiles: ['Grant Wood - American Gothic.jpeg', 'American Gothic by Grant Wood.jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:Grant_Wood_-_American_Gothic.jpeg', aspect: 'portrait'
  },
  {
    id: 'night-watch', title: 'The Night Watch', artist: 'Rembrandt van Rijn', year: '1642', movement: 'Baroque', category: 'Baroque',
    medium: 'Oil on canvas', museum: 'Rijksmuseum, Amsterdam', era: 'Dutch Golden Age',
    summary: 'A civic guard company steps into action through dramatic light, movement, and shadow.',
    story: 'Rembrandt transformed a group portrait into a lively scene, using strong contrasts of light and dark to guide the eye through a crowded composition. Its familiar title is misleading: darkened varnish once made the scene look like night, though it originally depicted daylight.',
    fact: 'The painting was trimmed on several sides in 1715 to fit a new location.',
    imageFiles: ['The Night Watch.jpg', 'The Nightwatch by Rembrandt.jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:The_Night_Watch.jpg', aspect: 'landscape'
  },
  {
    id: 'the-scream', title: 'The Scream', artist: 'Edvard Munch', year: '1893', movement: 'Modern Art', category: 'Modern Art',
    medium: 'Tempera and crayon on cardboard', museum: 'National Museum, Oslo (one version)', era: 'Expressionism',
    summary: 'A figure stands on a bridge beneath a turbulent sky, turning anxiety into vivid colour and line.',
    story: 'Munch made several versions of this motif in different media. The simplified figure and undulating landscape are not intended as a realistic scene; they give visual form to a moment of intense fear and alienation, making the work a landmark for later Expressionist art.',
    fact: 'There are several versions of The Scream, including paintings, pastels, and a lithograph.',
    imageFiles: ['Edvard Munch - The Scream.jpg', 'The Scream by Edvard Munch.jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_The_Scream.jpg', aspect: 'portrait'
  },
  {
    id: 'creation-adam', title: 'The Creation of Adam', artist: 'Michelangelo', year: 'c. 1508–1512', movement: 'Renaissance', category: 'Renaissance',
    medium: 'Fresco', museum: 'Sistine Chapel, Vatican City', era: 'High Renaissance',
    summary: 'Two hands almost meet across a small gap in one of the most iconic images in Western art.',
    story: 'Painted on the ceiling of the Sistine Chapel, the scene forms part of Michelangelo’s vast narrative of Genesis. The near-touching hands create a point of extraordinary tension, suggesting the transfer of life without needing a crowded composition.',
    fact: 'The famous detail is just one part of a ceiling that contains many scenes and figures.',
    imageFiles: ['Michelangelo, The Creation of Adam.jpg', 'Michelangelo - The Creation of Adam.jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:Michelangelo,_The_Creation_of_Adam.jpg', aspect: 'landscape'
  },
  {
    id: 'water-lilies', title: 'Water Lilies', artist: 'Claude Monet', year: 'c. 1906', movement: 'Impressionism', category: 'Impressionism',
    medium: 'Oil on canvas', museum: 'Series held in museums worldwide', era: 'Impressionism',
    summary: 'Lily pads, reflections, and soft colour dissolve the pond into a field of changing light.',
    story: 'Monet returned repeatedly to the water garden at Giverny, studying how light changes across the surface of the pond. In many Water Lilies paintings, the horizon disappears and the viewer looks down into colour, reflection, and movement rather than across a conventional landscape.',
    fact: 'Monet created roughly 250 paintings in the Water Lilies series.',
    imageFiles: ['Claude Monet - Waterlilies - Google Art Project.jpg', 'Water Lilies Monet.jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Waterlilies_-_Google_Art_Project.jpg', aspect: 'landscape'
  },
  {
    id: 'wanderer-fog', title: 'Wanderer above the Sea of Fog', artist: 'Caspar David Friedrich', year: 'c. 1818', movement: 'Romanticism', category: 'Romanticism',
    medium: 'Oil on canvas', museum: 'Hamburger Kunsthalle, Hamburg', era: 'Romanticism',
    summary: 'A lone traveller looks over a vast mountain landscape hidden by drifting mist.',
    story: 'Friedrich places the viewer behind a solitary figure, inviting us to share a moment between awe and uncertainty. The vast fog-filled landscape reflects Romanticism’s interest in the sublime — nature as beautiful, overwhelming, and larger than human understanding.',
    fact: 'The figure is shown from behind, a device that lets viewers imagine themselves in his place.',
    imageFiles: ['Caspar David Friedrich - Wanderer above the sea of fog.jpg', 'Friedrich, Caspar David - Wanderer über dem Nebelmeer.jpg'],
    source: 'https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg', aspect: 'portrait'
  }
];

const artists = [
  { name: 'Leonardo da Vinci', years: '1452 — 1519', description: 'A Renaissance polymath whose art joined careful observation, inventive thinking, and a deep study of human expression.', images: ['Leonardo da Vinci - presumed self-portrait - WGA12798.jpg', 'Leonardo da Vinci.jpeg'], source: 'https://commons.wikimedia.org/wiki/Leonardo_da_Vinci' },
  { name: 'Vincent van Gogh', years: '1853 — 1890', description: 'Known for expressive brushwork and luminous colour, he made ordinary subjects feel intensely personal.', images: ['Self-portrait - Vincent van Gogh.jpg', 'Self-portrait with Felt Hat by Vincent van Gogh.jpg'], source: 'https://commons.wikimedia.org/wiki/File:Self-portrait_-_Vincent_van_Gogh.jpg' },
  { name: 'Claude Monet', years: '1840 — 1926', description: 'A founding Impressionist who studied the shifting effects of daylight, atmosphere, and reflection.', images: ['Portrait of Claude Monet.jpg', 'Claude Monet 1899 Nadar.jpg'], source: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Claude_Monet.jpg' },
  { name: 'Rembrandt van Rijn', years: '1606 — 1669', description: 'A Dutch master of portraiture, storytelling, and the emotional depth of light and shadow.', images: ['Self-portrait by Rembrandt.jpg', 'Rembrandt self portrait.jpg'], source: 'https://commons.wikimedia.org/wiki/File:Self-portrait_by_Rembrandt.jpg' },
  { name: 'Michelangelo', years: '1475 — 1564', description: 'A sculptor, painter, and architect whose powerful figures helped define the High Renaissance.', images: ['Michelangelo Daniele da Volterra.jpg', 'Volterra - Portrait of Michelangelo.jpg'], source: 'https://commons.wikimedia.org/wiki/File:Michelangelo_Daniele_da_Volterra.jpg' },
  { name: 'Pablo Picasso', years: '1881 — 1973', description: 'A pivotal modern artist who repeatedly reinvented his style and helped develop Cubism.', images: ['Pablo Picasso, 1904, Paris, photograph by Ricard Canals i Llambí.jpg', 'Pablo Picasso, 1904, Paris, photograph by Ricard Canals i Llambí cropped.jpg'], source: 'https://commons.wikimedia.org/wiki/Pablo_Picasso' }
];

const artworkGrid = $('#artworkGrid');
const artSearch = $('#artSearch');
const artFilter = $('#artFilter');
const resultCount = $('#resultCount');
const emptyState = $('#emptyState');
const modal = $('#artworkModal');
const toast = $('#toast');
let toastTimeout;
let activeArtwork = null;
let lastFocusedElement = null;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function artworkFallbackSVG(artwork) {
  // Last-resort visual fallback: a unique, labelled mini composition, never a broken-image icon.
  // It is deliberately labelled as a reference graphic so it cannot be mistaken for the original painting.
  const palette = artwork.fallbackPalette || ['#bca983', '#45535a', '#292724'];
  const title = artwork.title.replace(/[&<>"']/g, '').slice(0, 42);
  const safeTitle = escapeHTML(title);
  const isPortrait = artwork.aspect === 'portrait';
  const width = isPortrait ? 560 : 760;
  const height = isPortrait ? 760 : 560;
  const artShape = artwork.category === 'Impressionism'
    ? `<g opacity=".8"><circle cx="${width*.31}" cy="${height*.46}" r="${width*.2}" fill="${palette[1]}"/><circle cx="${width*.57}" cy="${height*.52}" r="${width*.25}" fill="${palette[0]}"/><circle cx="${width*.75}" cy="${height*.38}" r="${width*.14}" fill="#ded4ae"/></g>`
    : artwork.category === 'Romanticism'
      ? `<path d="M0 ${height*.72} L${width*.24} ${height*.4} L${width*.38} ${height*.57} L${width*.61} ${height*.27} L${width*.8} ${height*.55} L${width} ${height*.36} V${height} H0Z" fill="${palette[1]}"/><path d="M0 ${height*.84} L${width*.35} ${height*.58} L${width*.54} ${height*.76} L${width*.77} ${height*.48} L${width} ${height*.7} V${height}H0Z" fill="${palette[2]}"/>`
      : `<g transform="translate(${width*.5} ${height*.48})"><circle r="${width*.26}" fill="none" stroke="${palette[1]}" stroke-width="2"/><ellipse rx="${width*.28}" ry="${height*.11}" fill="${palette[0]}" opacity=".9"/><path d="M-${width*.3} 0 Q0 -${height*.3} ${width*.29} 0 Q0 ${height*.26} -${width*.3} 0Z" fill="${palette[1]}" opacity=".62"/><circle cx="0" cy="0" r="${width*.06}" fill="#e1c17b"/></g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Stylized reference graphic for ${safeTitle}"><defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${palette[0]}"/><stop offset="1" stop-color="${palette[2]}"/></linearGradient><filter id="blur"><feGaussianBlur stdDeviation="20"/></filter></defs><rect width="100%" height="100%" fill="url(#bg)"/><circle cx="${width*.76}" cy="${height*.18}" r="${width*.14}" fill="#e4c984" opacity=".28" filter="url(#blur)"/>${artShape}<rect x="${width*.06}" y="${height*.06}" width="${width*.88}" height="${height*.88}" fill="none" stroke="#e7d1a1" stroke-opacity=".55"/><text x="50%" y="${height*.83}" text-anchor="middle" fill="#fff8e9" font-family="Georgia,serif" font-size="${isPortrait ? 26 : 31}">${safeTitle}</text><text x="50%" y="${height*.89}" text-anchor="middle" fill="#e5d7bc" font-family="Arial,sans-serif" font-size="11" letter-spacing="3">ARTWORK REFERENCE</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function attachImageFallback(img, fileNames, dataForFallback, { localFallback = true } = {}) {
  const urls = fileNames.map((filename) => commonsFile(filename, 1200));
  let index = 0;
  img.dataset.fallbackAttempted = '0';
  delete img.dataset.localFallback;
  delete img.dataset.fallbackVisual;
  const oldLabel = img.closest('.artwork-image-wrap, .artist-portrait-wrap, .about-art-frame, .modal-image-wrap')?.querySelector('.artwork-error-label');
  oldLabel?.remove();
  img.onerror = function onImageError() {
    while (index < urls.length) {
      const nextUrl = urls[index++];
      img.dataset.fallbackAttempted = String(index);
      // Skip the URL already attempted as the primary source; continue to a distinct backup.
      if (img.src !== nextUrl) {
        img.src = nextUrl;
        return;
      }
    }
    if (localFallback && img.dataset.localFallback !== 'true') {
      img.dataset.localFallback = 'true';
      img.src = artworkFallbackSVG(dataForFallback);
      img.dataset.fallbackVisual = 'true';
      const wrap = img.closest('.artwork-image-wrap, .artist-portrait-wrap, .about-art-frame, .modal-image-wrap');
      if (wrap && !wrap.querySelector('.artwork-error-label')) {
        const label = document.createElement('span');
        label.className = 'artwork-error-label';
        label.textContent = 'REFERENCE VISUAL · ORIGINAL SOURCE UNAVAILABLE';
        wrap.append(label);
      }
    }
  };
  // A source sometimes fails after the browser has cached a failed response; force a predictable backup order.
  img.onload = () => {
    if (img.dataset.fallbackVisual !== 'true') {
      const label = img.closest('.artwork-image-wrap, .artist-portrait-wrap, .about-art-frame, .modal-image-wrap')?.querySelector('.artwork-error-label');
      label?.remove();
    }
  };
}

function setupImage(img, files, artwork, eager = false) {
  attachImageFallback(img, files, artwork);
  img.loading = eager ? 'eager' : 'lazy';
  img.decoding = 'async';
  img.src = commonsFile(files[0], eager ? 1600 : 1200);
}

function createArtworkCard(artwork, index) {
  const card = document.createElement('article');
  card.className = 'artwork-card';
  card.dataset.artworkId = artwork.id;
  const safeTitle = escapeHTML(artwork.title);
  const safeArtist = escapeHTML(artwork.artist);
  card.innerHTML = `
    <div class="artwork-image-wrap">
      <img class="artwork-image" alt="${safeTitle} by ${safeArtist}" width="800" height="1000" loading="lazy">
      <span class="artwork-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="artwork-movement">${escapeHTML(artwork.movement)}</span>
      <button class="artwork-quick-view" type="button" aria-label="View details for ${safeTitle}"><span>VIEW ARTWORK</span><span aria-hidden="true">↗</span></button>
    </div>
    <div class="artwork-info">
      <div class="artwork-meta-line"><span>${escapeHTML(artwork.category)}</span><span class="artwork-year">${escapeHTML(artwork.year)}</span></div>
      <h3>${safeTitle}</h3>
      <p class="artwork-artist">${safeArtist}</p>
      <p class="artwork-summary">${escapeHTML(artwork.summary)}</p>
      <button class="artwork-details-link" type="button">View Artwork <span aria-hidden="true">↗</span></button>
    </div>`;
  const img = $('.artwork-image', card);
  setupImage(img, artwork.imageFiles, artwork, index < 4);
  $$('.artwork-quick-view, .artwork-details-link', card).forEach((button) => {
    button.addEventListener('click', () => openArtwork(artwork, index));
  });
  return card;
}

function renderArtworks(list = artworks) {
  const fragment = document.createDocumentFragment();
  list.forEach((artwork) => fragment.append(createArtworkCard(artwork, artworks.indexOf(artwork))));
  artworkGrid.replaceChildren(fragment);
  resultCount.textContent = `${list.length} ${list.length === 1 ? 'artwork' : 'artworks'}`;
  emptyState.hidden = list.length !== 0;
  artworkGrid.hidden = list.length === 0;
  $('#collectionCount').textContent = `${list.length} ${list.length === 1 ? 'work' : 'works'} to discover`;
}

function filterArtworks() {
  const query = artSearch.value.trim().toLocaleLowerCase();
  const movement = artFilter.value;
  const list = artworks.filter((artwork) => {
    const searchable = [artwork.title, artwork.artist, artwork.movement, artwork.category, artwork.era, artwork.year, artwork.summary].join(' ').toLocaleLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesMovement = movement === 'all' || artwork.category === movement || artwork.movement === movement;
    return matchesQuery && matchesMovement;
  });
  renderArtworks(list);
}

function makeMetaItem(label, value) {
  return `<div class="meta-item"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value || 'Not documented')}</strong></div>`;
}

function openArtwork(artwork, index) {
  activeArtwork = artwork;
  lastFocusedElement = document.activeElement;
  $('#modalTitle').textContent = artwork.title;
  $('#modalArtist').textContent = `${artwork.artist} · ${artwork.year}`;
  $('#modalDescription').textContent = artwork.summary;
  $('#modalStory').textContent = artwork.story;
  $('#modalFact').textContent = artwork.fact;
  $('#modalIndex').textContent = `${String(index + 1).padStart(2, '0')} / ${String(artworks.length).padStart(2, '0')}`;
  $('#modalMeta').innerHTML = [
    makeMetaItem('ART MOVEMENT', artwork.movement),
    makeMetaItem('MEDIUM', artwork.medium),
    makeMetaItem('PERIOD', artwork.era),
    makeMetaItem('COLLECTION', artwork.museum)
  ].join('');
  const modalImage = $('#modalImage');
  modalImage.alt = `${artwork.title} by ${artwork.artist}`;
  setupImage(modalImage, artwork.imageFiles, artwork, true);
  $('#modalSource').href = artwork.source;
  $('#modalSource').textContent = artwork.source.includes('moma.org') ? 'View museum record ↗' : 'View image source & license details ↗';
  if (!modal.open) {
    modal.showModal();
    document.body.classList.add('modal-open');
  }
}

function closeArtwork() {
  if (modal.open) modal.close();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('is-visible'), 4200);
}

function setupArtists() {
  const grid = $('#artistsGrid');
  const fragment = document.createDocumentFragment();
  artists.forEach((artist, index) => {
    const article = document.createElement('article');
    article.className = 'artist-card';
    article.innerHTML = `
      <div class="artist-portrait-wrap">
        <img class="artist-portrait" alt="Portrait of ${escapeHTML(artist.name)}" width="420" height="560" loading="lazy">
        <span class="artist-initial" aria-hidden="true">${escapeHTML(artist.name.split(' ').map((part) => part[0]).join('').slice(0, 2))}</span>
      </div>
      <div class="artist-period">${escapeHTML(artist.years)}</div>
      <h3>${escapeHTML(artist.name)}</h3>
      <p>${escapeHTML(artist.description)}</p>`;
    setupImage($('.artist-portrait', article), artist.images, { title: artist.name, aspect: 'portrait', category: 'Modern Art', fallbackPalette: ['#b9a77f', '#655b4a', '#292620'] });
    fragment.append(article);
  });
  grid.replaceChildren(fragment);
}

function setupStaticImage(element, fileNames, fallbackArtwork) {
  setupImage(element, fileNames, fallbackArtwork, true);
}

function initImageFallbacks() {
  const hero = $('#heroImage');
  const heroArt = { title: 'The Starry Night', artist: 'Vincent van Gogh', aspect: 'landscape', category: 'Post-Impressionism', fallbackPalette: ['#283c68', '#d8b55e', '#111b31'] };
  attachImageFallback(hero, ['VanGogh-starry night.jpg', 'Vincent van Gogh Starry Night.jpg'], heroArt);
  hero.addEventListener('error', () => {
    // The attached fallback handler replaces the image source; retain a tasteful background behind it as well.
    hero.style.opacity = '.38';
  });
  setupStaticImage($('#aboutImage'), ['The Birth of Venus (Botticelli) 1.jpg', 'Birth of Venus.jpg'], { title: 'The Birth of Venus', aspect: 'landscape', category: 'Renaissance' });
}

function setupSearchAndFilters() {
  let debounceTimer;
  artSearch.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(filterArtworks, 110);
  });
  artFilter.addEventListener('change', filterArtworks);
  $('#clearSearch').addEventListener('click', () => {
    artSearch.value = '';
    artFilter.value = 'all';
    filterArtworks();
    artSearch.focus();
  });
  $('#searchToggle').addEventListener('click', () => {
    if (window.matchMedia('(max-width: 760px)').matches) {
      $('#menuToggle').setAttribute('aria-expanded', 'true');
      $('#navLinks').classList.add('is-open');
    }
    document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => artSearch.focus({ preventScroll: true }), 450);
  });
  $$('[data-movement-link]').forEach((link) => {
    link.addEventListener('click', () => {
      const value = link.dataset.movementLink;
      artFilter.value = value;
      filterArtworks();
    });
  });
}

function setupNavigation() {
  const header = $('.site-header');
  const menuToggle = $('#menuToggle');
  const navLinks = $('#navLinks');
  const navAnchors = $$('.nav-link');

  function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 30); }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menuToggle.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
    navLinks.classList.toggle('is-open', !expanded);
  });
  navAnchors.forEach((anchor) => anchor.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    navLinks.classList.remove('is-open');
  }));

  const sections = ['home', 'gallery', 'artists', 'about', 'contact'].map((id) => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((anchor) => anchor.classList.toggle('active', anchor.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }
}

function setupReveals() {
  document.documentElement.classList.add('js-ready');
  const revealTargets = $$('.reveal, .artist-card');
  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, observerRef) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observerRef.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
  revealTargets.forEach((target, index) => {
    if (target.classList.contains('artist-card')) target.style.transitionDelay = `${(index % 6) * 70}ms`;
    observer.observe(target);
  });
}

function setupParallax() {
  const hero = $('.hero');
  const heroImage = $('#heroImage');
  if (!hero || !heroImage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const shift = Math.max(-22, Math.min(22, -rect.top * .07));
        heroImage.style.objectPosition = `center calc(48% + ${shift}px)`;
      }
      scheduled = false;
    });
  }, { passive: true });
}

function setupModal() {
  $('#modalClose').addEventListener('click', closeArtwork);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeArtwork();
  });
  modal.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.open) closeArtwork();
  });
}

function setupContactForm() {
  $('#contactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = $('#contactName').value.trim();
    const email = $('#contactEmail').value.trim();
    const message = $('#contactMessage').value.trim();
    if (!name || !email || !message) {
      $('#formFeedback').textContent = 'Please complete all fields before sending.';
      return;
    }
    $('#formFeedback').textContent = `Thank you, ${name}. Your note is ready in this local demo, but was not sent to a server.`;
    $('#contactForm').reset();
    showToast('Thank you for sharing your thoughts about art.');
  });
}

function setupFooter() {
  $('#currentYear').textContent = new Date().getFullYear();
  $('#backTop').addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function setupLoader() {
  const loader = $('#siteLoader');
  const hide = () => window.setTimeout(() => loader.classList.add('is-hidden'), 420);
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide, { once: true });
  // Avoid leaving the intro overlay in place if a remote image never finishes loading.
  window.setTimeout(hide, 2100);
}

function init() {
  renderArtworks();
  setupArtists();
  initImageFallbacks();
  setupSearchAndFilters();
  setupNavigation();
  setupModal();
  setupContactForm();
  setupFooter();
  setupReveals();
  setupParallax();
  setupLoader();
}

document.addEventListener('DOMContentLoaded', init, { once: true });
