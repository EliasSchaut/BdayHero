<template>
  <div class="relative flex items-center justify-center">
    <canvas
      ref="movie_canvas"
      class="absolute z-10 h-[110%] w-[110%] blur-3xl sm:top-16"
    />
    <video
      @play="add_ambient"
      ref="movie"
      class="relative z-20 mt-[5%] w-[20rem] rounded-md shadow-md sm:top-16 sm:w-[30rem]"
      :src="src"
      controls
      muted
      loop
    />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  mounted() {
    (this.$refs.movie as HTMLVideoElement).play();
  },
  methods: {
    add_ambient() {
      const canvas = this.$refs.movie_canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const video = this.$refs.movie as HTMLVideoElement;
      const loop = setInterval(() => {
        if (!video.paused && !video.ended) {
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
});
</script>
