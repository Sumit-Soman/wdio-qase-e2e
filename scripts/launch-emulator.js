import { spawn, exec } from 'child_process';
import minimist from 'minimist';
import {conf} from '../test/helpers/load-config';

const args = minimist(process.argv.slice(2));

const deviceName = args.emulatorDeviceName || conf.emulatorDeviceName;

function launchEmulator(emulatorName) {
  console.log(`Launching emulator: ${emulatorName}...`);

  const emulatorProcess = spawn(
    `${process.env.ANDROID_HOME}/emulator/emulator`,
    ['-avd', emulatorName],
    {
      detached: true, 
      stdio: 'ignore', 
    }
  );
  emulatorProcess.unref();
  
  exec('adb wait-for-device', (error) => {
    if (error) {
      console.error(`Error waiting for emulator: ${error.message}`);
      return;
    }
    console.log('Emulator launched and ready.');
  });
}

launchEmulator(deviceName);