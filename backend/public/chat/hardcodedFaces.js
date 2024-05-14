const colors = {
    mediumAlmond: "#c79377",
    mediumDeepRose: "#e88c94",
    lightMediumAlmond: "#d9af9e",
    lightMediumRose: "#f3aeb3",
    lightAlmond: "#e6b9b4",
    lightRose: "#fbc7c4",
    lightMediumGolden: "#f2c8a2",
    veryLightAlmond: "#ede6cf",
    lightGolden: "#eddcc5",
    veryLightRose: "#f8e1e2",
    veryLightGolden: "#f0dece",
    deepestAlmond: "#533528",
    extraDeepGolden: "#614430",
    extraDeepRose: "#6d4d4c",
    extraDeepAlmond: "#6e4f45",
    veryDeepAlmond: "#88605f",
    deepGolden: "#8c5b2a",
    mediumDeepGolden: "#a06b4f",
    deepAlmond: "#976a59",
    veryDeepRose: "#906c65",
    deepRose: "#b96e6b",
    mediumDeepAlmond: "#ac8068",
    mediumGolden: "#dda26b"
  };
  
  
  function getFaceColors() {
    const faceColor = _.sample(Object.values(colors));
    let browColor = chroma(faceColor).darken(1);
    if (Math.random() < 0.2) {
        browColor = chroma(faceColor).brighten(1);
    }
    let mouthColor = chroma(faceColor).darken(2);
  
    const eyeColor = "black";
  
    return { faceColor, browColor, mouthColor, eyeColor };
  }
  