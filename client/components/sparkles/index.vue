<template>
  <div class="relative flex w-full flex-col items-center justify-center">
    <div class="absolute inset-0 w-full">
      <SparklesCore
        background="transparent"
        :minSize="0.6"
        :maxSize="1.4"
        :particleDensity="100"
        class="h-full w-full"
        particleColor="#999999"
      />
    </div>
    <slot />
  </div>
</template>
