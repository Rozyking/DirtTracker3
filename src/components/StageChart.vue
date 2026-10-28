<script>
import Chart from 'chart.js/auto'
import { toSeconds, formatSeconds } from '@/helpers/time'

export default {
    props: {
        results: { type: Array, required: true },
        selectedStage: { type: String, default: null }
    },
    computed: {
        stageResults() { /* unchanged */ },
        hasData() { /* unchanged */ }
    },
    watch: {
        stageResults: {
            handler() { this.draw(); },
            flush: "post"
        }
    },
    mounted() {
        this.draw();
    },
    beforeUnmount() {
        if (this.chart) this.chart.destroy();
    },
    methods: {
        draw() {
            if (!this.hasData) return;

            const labels = this.stageResults.map((r, i) => r.date || "Run " + (i + 1));
            const times = this.stageResults.map(r => this.toSeconds(r.time));
            const styles = this.stageResults.map(r => (r.pb ? "star" : "circle"));
            const radii = this.stageResults.map(r => (r.pb ? 9 : 4));

            if (this.chart) {
                const dataset = this.chart.data.datasets[0];
                this.chart.data.labels = labels;
                dataset.data = times;
                dataset.pointStyle = styles;
                dataset.pointRadius = radii;
                this.chart.options.plugins.title.text = this.selectedStage;
                this.chart.update();
                return;
            }

            this.chart = new Chart(this.$refs.canvas, {
                type: "line",
                data: {
                    labels,
                    datasets: [{
                        label: "Time",
                        data: times,
                        borderColor: "#c26b64",
                        backgroundColor: "#c26b64",
                        pointStyle: styles,
                        pointRadius: radii,
                        tension: 0.2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: this.selectedStage },
                        tooltip: {
                            callbacks: {
                                label: context => this.formatSeconds(context.parsed.y)
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: { callback: value => this.formatSeconds(value) }
                        }
                    }
                }
            });
        }
    }
}

</script>

<template>
    <div>
        <p v-if="!selectedStage" class="text-center text-muted py-5">
            Select a stage from the list to see your times.
        </p>
        <p v-else-if="!hasData" class="text-center text-muted py-5">
            No results for this stage yet.
        </p>
        <div v-show="hasData">
            <canvas ref="canvas" role="img" aria-label="Line chart of race times for the selected stage"></canvas>
        </div>
    </div>
</template>