const recordAudio = () =>
      new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
          new Promise(resolve => {
            mediaRecorder.addEventListener("stop", () => {
              const audioBlob = new Blob(audioChunks);
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              const play = () => audio.play();
           
                var socket = io.connect();
                socket.emit('send audio', {audio:true , buffer: audioChunks});
          console.log("submit audio");

           
              resolve({ audioBlob, audioUrl, play });
            });

            mediaRecorder.stop();
          });

      resolve({ start, stop });
    });

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));

  const handleAction = async () => {
    var sleepNum = 1000 * prompt("Enter how many seconds you'd like to record (Max is 60 and Min is 3");

    console.log(sleep);
    const recorder = await recordAudio();
      const actionButton = document.getElementById('action');
    actionButton.disabled = true;
    recorder.start();
    await sleep(sleepNum);
    const audio = await recorder.stop();
    await sleep(sleepNum);
    actionButton.disabled = false;
  }