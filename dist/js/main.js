document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".js-liquid");

    const lensCanvas = document.getElementById("lens");
    const lensCtx = lensCanvas.getContext("2d");

    const noiseCanvas = document.getElementById("noise");
    const noiseCtx = noiseCanvas.getContext("2d");

    function generateLens() {

        const rect = button.getBoundingClientRect();

        const w = Math.ceil(rect.width);
        const h = Math.ceil(rect.height);

        lensCanvas.width = w;
        lensCanvas.height = h;

        const img = lensCtx.createImageData(w, h);
        const data = img.data;

        const cx = w / 2;
        const cy = h / 2;

        const rx = cx;
        const ry = cy;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {

                const dx = (x - cx) / rx;
                const dy = (y - cy) / ry;

                const d = Math.pow(Math.abs(dx), 4) + Math.pow(Math.abs(dy), 4);

                const i = (y * w + x) * 4;

                const falloffStart = 0.85;
                const falloffEnd = 1.15;

                let edge = 0;

                if (d < falloffStart) {
                    edge = 1;
                } else if (d < falloffEnd) {
                    edge = 1 - (d - falloffStart) / (falloffEnd - falloffStart);
                } else {
                    edge = 0;
                }

                data[i] = (dx * edge * 0.5 + 0.5) * 255;
                data[i + 1] = (dy * edge * 0.5 + 0.5) * 255;
                data[i + 2] = 128;
                data[i + 3] = 255;

            }
        }

        lensCtx.putImageData(img, 0, 0);

        document
            .getElementById("lensMap")
            .setAttribute("href", lensCanvas.toDataURL());

    }



    function generateNoise() {

        const w = 128;
        const h = 128;

        noiseCanvas.width = w;
        noiseCanvas.height = h;

        const img = noiseCtx.createImageData(w, h);
        const data = img.data;

        for (let i = 0; i < data.length; i += 4) {

            const v = Math.random() * 255;

            data[i] = v;
            data[i + 1] = v;
            data[i + 2] = 128;
            data[i + 3] = 255;

        }

        noiseCtx.putImageData(img, 0, 0);

        document
            .getElementById("noiseMap")
            .setAttribute("href", noiseCanvas.toDataURL());

    }

    generateLens();
    generateNoise();
});


