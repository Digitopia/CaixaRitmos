<template>
  <div
    id="app"
    @touchstart="hasHover = false"
    :class="{ 'has-hover': hasHover }"
  >
    <a
      href="http://www.casadamusica.com/pt/servico-educativo/agenda/2019/11/20-caixa-de-ritmos/1000/?lang=pt#tab=0"
      target="_blank"
      ><img src="icon.jpeg" class="icon" alt=""
    /></a>
    <h1 class="title">Caixa de Ritmos</h1>
    <div class="container">
      <div class="content">
        <template v-for="(instrument, idxInstrument) in instruments">
          <div :key="instrument.name" class="instrument-label item">
            {{ instrument.name }}
          </div>
          <div
            v-for="idxStep in gridSize"
            :key="`${instrument.name}-${idxStep - 1}`"
            class="instrument item"
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
import Shake from 'shake.js'

export default {
  name: 'app',

  data() {
    return {
      hasHover: true,
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

    new Shake({ threshold: 10, timeout: 1000 }).start()
    window.addEventListener('shake', this.shaked, false)
  },

  mounted() {
    window.addEventListener('resize', () => {
      this.resize()
    })

    this.resize()
  },

  methods: {
    shaked() {
      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          this.matrix[i][j] = false
        }
      }
      this.$forceUpdate()
      if (this.playing) this.togglePlay()
    },

    resize() {
      const labels = document.querySelectorAll('.instrument-label')
      labels.forEach(label => {
        window.fitText(label, 0.6)
      })
    },

    initAudio() {
      // init samples
      this.samples = new Tone.Players().toMaster()
      this.instruments.forEach(instrument => {
        this.samples.add(instrument.name, instrument.sample)
      })

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
        this.samples.stopAll()
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
  background-color: var(--secondary);
}

#app {
  font-family: 'Raleway', sans-serif;
  font-weight: normal;
  box-sizing: border-box;
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

.instrument-label {
  font-weight: bold;
  border: none !important;
  text-align: center;
}

.instrument {
  border: 1px solid var(--secondary);
  // outline: 1px solid grey;
  text-align: center;
  &.active {
    img {
      opacity: 1 !important;
    }
  }
  &.activeMeasure {
    border: 1px solid var(--accent);
  }
  &:hover {
    cursor: pointer;
    // outline: 1px solid grey;
  }
  img {
    // padding: 5px;
    // &:hover {
    //   opacity: 0.9;
    // }
    opacity: 0.1;
    width: 80%;
    height: 80%;
  }
}

// NOTE: separating this rule so that can better toggle it if mobile or not
.has-hover .instrument img:hover {
  opacity: 0.4;
}

.play {
  margin-top: 3vmin;
  font-size: 5vmin;
  &:hover {
    cursor: pointer;
  }
}

.title {
  color: var(--accent);
  user-select: none;
  -webkit-tap-highlight-color: transparent !important;
  font-size: 4vmin;
  padding-top: 4vmin;
  padding-bottom: 1vmin;
}

// --------------------

.container {
  align-items: center;
  display: flex;
  justify-content: center;
  // height: 100vh;
  // width: 100vw;
}

.content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 80vw;
  width: 80vw;
}

.item {
  // border: 1px solid #aaa;
  height: calc(11.11% - 4px);
  margin: 1px;
  width: calc(11.11% - 4px);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (orientation: landscape) {
  .content {
    height: 80vh;
    width: 80vh;
  }
}

.icon {
  position: absolute;
  top: 1vmin;
  right: 1vmin;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
  border-radius: 5px;
  height: 50px;
  max-height: 8vmin;
}
</style>
