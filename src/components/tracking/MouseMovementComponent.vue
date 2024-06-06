<template>
  <div>
    <canvas id="mouse-movement-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { useMouseStore } from '@/store/mousemovement.js';
import { onMounted, onBeforeUnmount } from 'vue';

interface Movement {
  x: number;
  y: number;
}

const store = useMouseStore();
const movements: Movement[] = store.movements;

let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;

const resizeCanvas = () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (context) {
      drawLine(context);
    }
  }
};

onMounted(() => {
  canvas = document.getElementById("mouse-movement-canvas") as HTMLCanvasElement;
  if (canvas) {
    context = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  } else {
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
});

function drawLine(context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, canvas!.width, canvas!.height);
  context.lineWidth = 10;
  context.beginPath();
  if (movements.length > 0) {
    context.moveTo(movements[0].x, movements[0].y);
    for (const move of movements) {
      context.lineTo(move.x, move.y);
    }
  }
  context.closePath();
  context.stroke();
}
</script>

<style scoped lang="scss">
#mouse-movement-canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
