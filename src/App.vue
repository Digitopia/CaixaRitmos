<template>
  <div id="app">
    <h1 class="title">Caixa de Ritmos</h1>
    <div class="grid">
      <template v-for="(instrument, idxInstrument) in instruments">
        <div :key="instrument.name" class="instrument-label">
          {{ instrument.name }}
        </div>
        <div
          v-for="idxStep in gridSize"
          :key="`${instrument.name}-${idxStep - 1}`"
          class="instrument"
          :class="{
            active: matrix[idxInstrument][idxStep - 1],
            activeMeasure: idxStep - 1 === activeMeasure,
          }"
          @click="toggleStep(idxInstrument, idxStep - 1)"
        >
          <img :src="instrument.icon" />
        </div>
      </template>
    </div>
    <i
      class="play fa"
      :class="playing ? 'fa-stop' : 'fa-play'"
      @click="togglePlay"
    ></i>
  </div>
</template>

<script>
import Tone from 'tone'

window.Tone = Tone

export default {
  name: 'app',

  data() {
    return {
      playing: false,
      gridSize: 8,
      activeMeasure: -1,
      matrix: [],
      instruments: [
        {
          name: 'Bongós',
          icon: 'img/bongos.png',
          sample: 'sounds/bongos.mp3',
        },
        {
          name: 'Congas',
          icon: 'img/congas.png',
          sample: 'sounds/congas.mp3',
        },
        {
          name: 'Clavas ',
          icon: 'img/clavas.png',
          sample: 'sounds/clavas.mp3',
        },
        {
          name: 'Triângulo',
          icon: 'img/triangulo.png',
          sample: 'sounds/triangulo.mp3',
        },
        {
          name: 'Maracas',
          icon: 'img/maracas.png',
          sample: 'sounds/maracas.mp3',
        },
        {
          name: 'Darbuka',
          icon: 'img/darbuka.png',
          sample: 'sounds/darbuka.mp3',
        },
        {
          name: 'Pandeireta',
          icon: 'img/pandeireta.png',
          sample: 'sounds/pandeireta.mp3',
        },
        {
          name: 'Agogo',
          icon: 'img/agogo.png',
          sample: 'sounds/agogo.mp3',
        },
      ],
    }
  },

  created() {
    // init matrix
    for (let i = 0; i < this.instruments.length; i++) {
      this.matrix[i] = new Array(this.gridSize)
      for (let j = 0; j < this.gridSize; j++) {
        this.matrix[i][j] = false
      }
    }

    this.initAudio()

    document.addEventListener('keypress', evt => {
      if (evt.key === ' ') this.togglePlay()
    })
  },

  methods: {
    initAudio() {
      // init samples
      this.samples = new Tone.Players().toMaster()
      this.instruments.forEach(instrument => {
        this.samples.add(instrument.name, instrument.sample)
      })

      window.samples = this.samples

      Tone.Transport.bpm.value = 110

      this.loop = new Tone.Sequence(
        (time, measure) => {
          this.activeMeasure = measure
          for (let i = 0; i < this.instruments.length; i++) {
            if (this.matrix[i][measure]) {
              this.samples.get(this.instruments[i].name).start(time)
            }
          }
        },
        [0, 1, 2, 3, 4, 5, 6, 7],
        '1m'
      )

      this.loop.start(0)
    },

    togglePlay() {
      this.playing = !this.playing
      if (this.playing) Tone.Transport.start()
      else {
        this.activeMeasure = -1
        Tone.Transport.stop()
      }
    },

    toggleStep(idxInstrument, idxStep) {
      this.matrix[idxInstrument][idxStep] = !this.matrix[idxInstrument][idxStep]
      this.$forceUpdate() // NOTE: because vue doesn't detect changes in the matrix
    },
  },
}
</script>

<style lang="scss">
:root {
  --primary: #e84855;
  --secondary: #ffc857;
  --accent: #2e4052;
  --other: #5eb1bf;
}

html,
body {
  // height: 100%;
}

html,
body {
  background-color: var(--secondary);
}

#app {
  font-family: 'Raleway', sans-serif;
  font-weight: normal;
  box-sizing: border-box;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  color: var(--accent);
  user-select: none;
}

img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

* {
  -webkit-tap-highlight-color: transparent !important;
  &:focus {
    outline: none !important;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 10px;
  text-align: left;
  align-items: center;
  justify-items: right;
}

.instrument-label {
  font-weight: bold;
  font-size: 1em;
}

@media only screen and (max-width: 600px) {
  .instrument-label {
    font-size: 10px;
  }
}

.instrument {
  outline: 1px solid var(--secondary);
  padding: 10px;
  text-align: center;
  &.active {
    img {
      opacity: 1 !important;
    }
  }
  &.activeMeasure {
    outline: 1px solid var(--accent);
  }
  &:hover {
    cursor: pointer;
  }
  img {
    opacity: 0.5;
    width: 100%;
    &:hover {
      opacity: 0.7;
    }
  }
}

.play {
  margin-top: 20px;
  font-size: 3em;
  &:hover {
    cursor: pointer;
  }
}
</style>
