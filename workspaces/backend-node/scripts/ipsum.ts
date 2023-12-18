const config = {
  words: [
    "billions upon billions",
    "galaxies",
    "consciousness",
    "science",
    "light years",
    "cosmos",
    "rogue",
    "quasar",
    "culture",
    "explorations",
    "worldlets",
    "Vangelis",
    "a billion trillion",
    "Hypatia",
    "birth",
    "Flatland",
    "tesseract",
    "Rig Veda",
    "decipherment",
    "billions upon billions",
    "trillion",
    "radio telescope",
    "prime number",
    "colonies",
    "cosmic fugue",
    "extraplanetary",
    "corpus callosum",
    "Drake Equation",
    "Jean-François Champollion",
    "Cambrian explosion",
    "Tunguska event",
    "of brilliant syntheses",
    "circumnavigated",
    "Euclid",
    "Apollonius of Perga",
    "hydrogen atoms",
    "astonishment",
    "venture",
    "white dwarf",
  ],
  phrases: [
    "tingling of the spine",
    "tendrils of gossamer clouds",
    "ship of the imagination",
    "realm of the galaxies",
    "laws of physics",
    "rich in mystery",
    "cosmic ocean",
    "globular star cluster",
    "intelligent beings",
    "as a patch of light",
    "Orion's sword",
    "rings of Uranus",
    "preserve and cherish that pale blue dot",
    "brain is the seed of intelligence",
    "finite but unbounded",
    "at the edge of forever",
    "another world",
    "across the centuries",
    "how far away",
    "hundreds of thousands",
    "shores of the cosmic ocean",
    "encyclopaedia galactica",
    "muse about",
    "paroxysm of global death",
    "dispassionate extraterrestrial observer",
    "take root and flourish",
    "permanence of the stars",
    "kindling the energy hidden in matter",
    "hearts of the stars",
    "rich in heavy atoms",
    "great turbulent clouds",
    "gathered by gravity",
    "stirred by starlight",
    "inconspicuous motes of rock and gas",
    "the ash of stellar alchemy",
    "emerged into consciousness",
    "are creatures of the cosmos",
    "star stuff harvesting star light",
    "descended from astronomers",
    "dream of the mind's eye",
    "vanquish the impossible",
    "Sea of Tranquility",
    "from which we spring",
    "a still more glorious dawn awaits",
    "network of wormholes",
    "the sky calls to us",
    "concept of the number one",
    "not a sunrise but a galaxyrise",
    "bits of moving fluff",
    "something incredible is waiting to be known",
    "the carbon in our apple pies",
    "made in the interiors of collapsing stars",
    "extraordinary claims require extraordinary evidence",
    "vastness is bearable only through love",
    "a very small stage in a vast cosmic arena",
    "invent the universe",
    "the only home we've ever known",
    "a mote of dust suspended in a sunbeam",
    "courage of our questions",
    "citizens of distant epochs",
    "with pretty stories for which there's little good evidence",
    "two ghostly white figures in coveralls and helmets are soflty dancing",
  ],
  ending:
    " and billions upon billions upon billions upon billions upon billions upon billions upon billions.",
  puncuation: [".", ".", ".", "?", "!"],
}

export function build() {
  let wordbase = config.words.concat(config.phrases)

  let text = ""
  while (text.split(" ").length < 75) {
    text += buildSentence(wordbase, config.puncuation) + " "
  }

  return text
}

function buildSentence(parts: string[], puncuation: string[]) {
  const shuffled = shuffle(parts).slice(0, 6)
  return shuffled.reduce((accum, entry, ix) => {
    let rtn = ""
    if (ix === 0) {
      rtn = accum + entry.charAt(0).toUpperCase() + entry.slice(1)
    } else {
      rtn = accum + " " + entry
    }

    if (ix === shuffled.length - 1) {
      rtn = rtn + puncuation[rando(puncuation.length - 1)]
    }

    return rtn
  }, "")
}

function shuffle(words: string[]) {
  var o, x
  var ix = words.length - 1
  var rtn = []
  while (ix) {
    o = Math.floor(Math.random() * (ix + 1))
    x = words[ix]
    rtn.push(words[o])
    words[o] = x
    ix--
  }
  rtn.push(words[0])

  return rtn
}

function rando(limit: number) {
  return Math.floor(Math.random() * limit)
}
