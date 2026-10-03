const GROUP = "BWG|US";
const PROXY = "lowChar.|ios";
const DELAY_MS = 1200;
const DEBOUNCE_KEY = "loon.network-switch.latest";

const token =
  String($script.startTime.getTime()) + "-" +
  String(Date.now()) + "-" +
  String(Math.random());

$persistentStore.write(token, DEBOUNCE_KEY);

setTimeout(() => {
  try {
    // Only the most recent network-changed event is allowed to act.
    if ($persistentStore.read(DEBOUNCE_KEY) !== token) {
      console.log("Network Switch: stale event ignored");
      $done();
      return;
    }

    const config = JSON.parse($config.getConfig() || "{}");
    const mode = Number(config.running_model);

    if (mode === 0) {
      // FreeWorld is signaled by ssid-trigger temporarily setting DIRECT.
      $config.setSelectPolicy(GROUP, "DIRECT");
      $config.setRunningModel(1);
      console.log("FreeWorld final: BWG|US -> DIRECT, Loon -> RULE");
    } else {
      // Cellular / other Wi-Fi.
      $config.setSelectPolicy(GROUP, PROXY);
      if (mode !== 1) {
        $config.setRunningModel(1);
      }
      console.log("Normal network final: BWG|US -> lowChar.|ios, Loon -> RULE");
    }
  } catch (e) {
    console.log("Network Switch Error: " + e);
  }

  $done();
}, DELAY_MS);
