<template>
  <div class="relative flex justify-center items-center">
    <canvas ref="movie_canvas" class="absolute w-[110%] h-[110%] z-10 blur-3xl sm:top-16" />
    <video
      @play="add_ambient"
      ref="movie"
      class="relative w-[20rem] shadow-md rounded-md sm:top-16 sm:w-[30rem] z-20 mt-[5%]"
      src="https://prime.schaut.dev/Videos/71103/steam.mov"
      controls
      muted
      loop
    />
  </div>

</template>

<script lang="ts">
export default defineComponent({
  mounted() {
    (this.$refs.movie as HTMLVideoElement).play()
  },
  methods: {
    add_ambient() {
      const canvas = this.$refs.movie_canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const video = this.$refs.movie as HTMLVideoElement;
      const loop = setInterval(() => {
        if (!video.paused && !video.ended) {
          console.log('draw');
          ctx.drawImage(
            video,
            0,
            0,
            video.videoWidth,
            video.videoHeight,
            0,
            0,
            canvas.width,
            canvas.height,
          );
        } else {
          clearInterval(loop);
        }
      }, 1000 / 30);
    },

  },
})
;
</script>