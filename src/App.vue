<template>
  <div id="app">
    <h1>Caixa de Ritmos</h1>
    <div class="grid">
      <template v-for="instrument in instruments">
        <div :key="instrument.name">{{ instrument.name }}</div>
        <div v-for="i in 8" :key="`${instrument.name}-${i}`" class="instrument">
          <img src="img/triangulo.jpg" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Tone from 'tone'

// function fill(rows, cols, value) {
//   let matrix = new Array(rows)
//   for (let i = 0; i < rows; i++) {
//     matrix[i] = []
//     for (let j = 0; j < cols; j++) {
//       matrix[i][j] = value
//     }
//   }
//   return matrix
// }

export default {
  name: 'app',

  data() {
    return {
      instruments: [
        {
          name: 'Bongós',
          icon: 'public/img/triangulo.png',
          sample: 'public/samples/snap.mp3',
        },
        {
          name: 'Congas',
          icon: 'public/img/triangulo.png',
          sample: 'public/samples/snap.mp3',
        },
        {
          name: 'Clavas ',
          icon: 'public/img/triangulo.png',
          sample: 'public/samples/snap.mp3',
        },
        {
          name: 'Triângulo',
          icon: 'public/img/triangulo.png',
          sample: 'public/samples/snap.mp3',
        },
        {
          name: 'Maracas',
          icon: 'public/img/triangulo.png',
          sample: 'public/samples/snap.mp3',
        },
        {
          name: 'Darbuka',
          icon: 'public/img/triangulo.png',
          sample: 'public/samples/snap.mp3',
        },
        {
          name: 'Pandeireta',
          icon: 'public/img/triangulo.png',
          sample: 'public/samples/snap.mp3',
        },
        {
          name: 'Agogo',
          icon: 'public/img/triangulo.png',
          sample: 'public/samples/snap.mp3',
        },
      ],
      // matrix: fill(this.instruments.length, 8, 0),
    }
  },

  created() {
    this.samples = new Tone.Players().toMaster()
    this.instruments.forEach(instrument => {
      this.samples.add(instrument.name, instrument.sample)
    })

    Tone.Transport.bpm.value = 90

    // this.loop = new Tone.Sequence(
    //   (time, measure) => {
    //     for (let i = 0; i < this.tracks.length; i++) {
    //       if (this.matrix[i][measure]) {
    //         console.log('playing', i, measure)
    //         this.players.get(this.labels[i]).start(time)
    //       }
    //     }
    //   },
    //   [0, 1, 2, 3, 4, 5, 6, 7],
    //   '2m'
    // )
  },

  mounted() {},
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
  &:hover {
    outline: 1px solid black;
  }
  img {
    width: 100%;
    height: 100%;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
