// Meeting.js

import { useEffect, useRef, useState } from 'react';

const Meeting = () => {
  const videoRef = useRef();
  const [meetingActive, setMeetingActive] = useState(false);
  const peerRef = useRef(null);

  const toggleMeeting = () => {
    if (!meetingActive) {
      // Start meeting
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          const peer = new Peer(); // Create a new Peer instance
          peerRef.current = peer; // Store it in the ref

          peer.on('open', (id) => {
            console.log(`My peer ID is: ${id}`);
          });

          peer.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (remoteStream) => {
              // Display the remote video stream
              const remoteVideo = document.createElement('video');
              remoteVideo.srcObject = remoteStream;
              remoteVideo.autoplay = true;
              document.body.appendChild(remoteVideo);
            });
          });

          setMeetingActive(true);
        })
        .catch((error) => {
          console.error('Error accessing user media:', error);
        });
    } else {
      // Stop meeting
      const peer = peerRef.current; // Get the stored Peer instance
      if (peer) {
        peer.destroy();
      }
      setMeetingActive(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('peerjs').then((PeerModule) => {
        const Peer = PeerModule.default;
        peerRef.current = new Peer(); // Store the Peer instance in the ref
      });
    }
  }, []);

  return (
    <div>
      <h1>Meeting</h1>
      <video ref={videoRef} autoPlay muted></video>
      <button onClick={toggleMeeting}>
        {meetingActive ? 'Stop Meeting' : 'Start Meeting'}
      </button>
    </div>
  );
};

export default Meeting;
