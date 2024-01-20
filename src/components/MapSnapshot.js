import React, { useEffect, useRef } from 'react';
import LabelStudio from 'label-studio';
import 'label-studio/build/static/css/main.css';


const getMapSnapshotUrl = (lat, lng, zoom = 18, size = '640x600', type = 'hybrid') => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&maptype=${type}&key=${apiKey}`;
};

const MapSnapshot = ({ lat, lng }) => {
  const labelStudioContainerRef = useRef();


  useEffect(() => {
    if (labelStudioContainerRef.current) {
      initializeLabelStudio();
    }
  }, [lat, lng]); // Reinitialize when lat or lng changes


 const initializeLabelStudio = () => {
  console.log("Start...");
  const mapImageUrl = getMapSnapshotUrl(lat, lng);
  const labelStudioConfig = {
    config: `<View>
  <Image name="image" value="$image" />
  <PolygonLabels name="labels" toName="image">
    <Label value="Tank" />
    <Label value="Trench" />
  </PolygonLabels>
    </View>`,
    interfaces: [
      "panel",
      "update",
      "submit",
      "controls",
      "side-column",
      "annotations:menu",
      "annotations:add-new",
      "annotations:delete",
      "predictions:menu"
    ],
    user: {
      pk: 1,
      firstName: "Pvt",
      lastName: "Snuffy"
    },
    task: {
      annotations: [],
      predictions: [],
      id: 1,
      data: {
        image: mapImageUrl     }
    },
    onLabelStudioLoad: function (LS) {
      var c = LS.annotationStore.addAnnotation({
        userGenerate: true
      });
      LS.annotationStore.selectAnnotation(c.id);
    },
    onSubmitAnnotation: (LS, annotation) => {
        console.log("Annotation submitted", annotation);
        fetch ('http://localhost:3001/submit-annotation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(annotation)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        })
    }
  };

 new LabelStudio(labelStudioContainerRef.current.id, labelStudioConfig);
    console.log("Label Studio Initialized");
};

return (
    <div ref={labelStudioContainerRef} id="label-studio" style={{ width: '100%', height: '400px' }}>
    </div>
  );
};

export default MapSnapshot;
