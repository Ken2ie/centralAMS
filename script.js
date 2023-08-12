const video = document.getElementById("video");

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
]).then(startWebcam);

async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = stream;
  } catch (error) {
    console.error(error);
  }
}

async function getLabeledFaceDescriptions() {
  const label = "Ellis";
  const maxImageIndex = 15; // Adjust this to the total number of images

  const labeledFaceDescriptors = [];
  const descriptions = [];

  for (let i = 1; i <= maxImageIndex; i++) {
    const img = await faceapi.fetchImage(`./labels/${label}/${i}.jpg`);
    const detections = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detections) {
      descriptions.push(detections.descriptor);
    } else {
      console.log(`No face detected in ${label}/${i}.jpg`);
    }
  }

  if (descriptions.length > 0) {
    labeledFaceDescriptors.push(new faceapi.LabeledFaceDescriptors(label, descriptions));
  }

  return labeledFaceDescriptors;
}



video.addEventListener("play", async () => {
  const labeledFaceDescriptors = await getLabeledFaceDescriptions();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  function detectAndDrawFaces() {
    faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors()
      .then((detections) => {
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });

        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: result.toString(),
          });
          drawBox.draw(canvas);
        });

        requestAnimationFrame(detectAndDrawFaces);
      });
  }

  detectAndDrawFaces();
});
