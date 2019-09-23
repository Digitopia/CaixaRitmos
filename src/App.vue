<template>
  <div id="app">
    <h1>Caixa de Ritmos</h1>
    <i
      class="fa"
      :class="playing ? 'fa-stop' : 'fa-play'"
      @click="togglePlay"
    ></i>
    <div class="grid">
      <template v-for="(instrument, idxInstrument) in instruments">
        <div :key="instrument.name">
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
          <img src="img/triangulo.jpg" />
        </div>
      </template>
    </div>
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
          icon: 'img/triangulo.png',
          sample: 'sounds/do.wav',
        },
        {
          name: 'Congas',
          icon: 'img/triangulo.png',
          sample: 'sounds/re.wav',
        },
        {
          name: 'Clavas ',
          icon: 'img/triangulo.png',
          sample: 'sounds/mi.wav',
        },
        {
          name: 'Triângulo',
          icon: 'img/triangulo.png',
          sample: 'sounds/fa.wav',
        },
        {
          name: 'Maracas',
          icon: 'img/triangulo.png',
          sample: 'sounds/sol.wav',
        },
        {
          name: 'Darbuka',
          icon: 'img/triangulo.png',
          sample: 'sounds/la.wav',
        },
        {
          name: 'Pandeireta',
          icon: 'img/triangulo.png',
          sample: 'sounds/si.wav',
        },
        {
          name: 'Agogo',
          icon: 'img/triangulo.png',
          sample: 'sounds/do.wav',
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
  },

  mounted() {},

  methods: {
    initAudio() {
      // init samples
      this.samples = new Tone.Players().toMaster()
      this.instruments.forEach(instrument => {
        this.samples.add(instrument.name, instrument.sample)
      })

      window.samples = this.samples

      Tone.Transport.bpm.value = 120

      this.loop = new Tone.Sequence(
        (time, measure) => {
          this.activeMeasure = measure
          for (let i = 0; i < this.instruments.length; i++) {
            if (this.matrix[i][measure]) {
              console.log('playing', i, measure)
              console.log(this.instruments[i].name)
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
      else Tone.Transport.stop()
    },

    toggleStep(idxInstrument, idxStep) {
      this.matrix[idxInstrument][idxStep] = !this.matrix[idxInstrument][idxStep]
      this.$forceUpdate() // NOTE: because vue doesn't detect changes in the matrix
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 10px;
  text-align: left;
  align-items: center;
  justify-items: right;
}

.instrument {
  outline: 1px solid grey;
  display: flex;
  padding: 10px;
  &.active {
    img {
      opacity: 1 !important;
    }
  }
  &.activeMeasure {
    outline: 1px solid red;
  }
  &:hover {
    outline: 1px solid black;
  }
  img {
    opacity: 0.5;
    width: 100%;
    height: 100%;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
