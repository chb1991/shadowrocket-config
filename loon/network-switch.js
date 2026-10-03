const GROUP = "BWG|US";
const PROXY = "lowChar.|ios";

try {
  const config = JSON.parse($config.getConfig() || "{}");
  const mode = Number(config.running_model);

  if (mode === 0) {
    $config.setSelectPolicy(GROUP, "DIRECT");
    $config.setRunningModel(1);
    console.log("FreeWorld: BWG|US -> DIRECT, Loon -> RULE");
  } else {
    $config.setSelectPolicy(GROUP, PROXY);
    if (mode !== 1) {
      $config.setRunningModel(1);
    }
    console.log("Normal Network: BWG|US -> lowChar.|ios, Loon -> RULE");
  }
} catch (e) {
  console.log("Network Switch Error: " + e);
}

$done();
