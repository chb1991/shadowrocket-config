const GROUP = "BWG|US";
const PROXY = "lowChar.|ios";
const DELAY_MS = 1200;

setTimeout(() => {
  try {
    const config = JSON.parse($config.getConfig() || "{}");
    const mode = Number(config.running_model);

    if (mode === 0) {
      $config.setSelectPolicy(GROUP, "DIRECT");
      $config.setRunningModel(1);
      console.log("FreeWorld delayed switch: BWG|US -> DIRECT, Loon -> RULE");
    } else {
      $config.setSelectPolicy(GROUP, PROXY);
      if (mode !== 1) {
        $config.setRunningModel(1);
      }
      console.log("Normal network delayed switch: BWG|US -> lowChar.|ios, Loon -> RULE");
    }
  } catch (e) {
    console.log("Network Switch Error: " + e);
  }

  $done();
}, DELAY_MS);
