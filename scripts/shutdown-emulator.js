import { exec } from "child_process";

function closeEmulator() {
  console.log("Closing emulator...");

  exec("adb emu kill", (error, stdout, stderr) => {
    if (error) {
      console.error(`Failed to close emulator: ${error.message}`);
      return;
    }
    console.log("Emulator closed successfully.");
  });
}

closeEmulator();
