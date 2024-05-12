import { vi } from "vitest";
import { audio } from "../constants";
import { getPlayerNextLeft, playSound } from "./index";

describe("getPlayerNextLeft", () => {
  it("returns x when nextX is less than or esqual to 0 + size", () => {
    const x = 5;
    const playerMovementUnit = 2;
    const size = 3;
    expect(getPlayerNextLeft(x, playerMovementUnit, size)).toBe(x);
  });

  it("returns nextX when nextX is greater than 0 + size", () => {
    const x = 5;
    const playerMovementUnit = 2;
    const size = 1;
    expect(getPlayerNextLeft(x, playerMovementUnit, size)).toBe(
      x - playerMovementUnit
    );
  });
});
/*
describe("playSound", () => {
  let soundSpy: vi.MockInstance;

  beforeEach(() => {
    soundSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    soundSpy.mockRestore();
  });

  it("plays the sound when the sound name is valid", () => {
    const soundName = "hit1";
    const volume = 0.5;
    const startTime = 2;

    playSound(soundName, volume, startTime);

    expect(audio[soundName].volume).toBe(volume);
    expect(audio[soundName].currentTime).toBe(startTime);
    expect(audio[soundName].play).toHaveBeenCalled();
  });

  it("logs a warning when the sound name is not found", () => {
    const soundName = "invalidSound";

    playSound(soundName);

    expect(console.warn).toHaveBeenCalledWith(
      `Sound "${soundName}" not found.`
    );
  });

  it("sets the volume correctly", () => {
    const soundName = "shotgun";
    const volume = 0.8;

    playSound(soundName, volume);

    expect(audio[soundName].volume).toBe(volume);
  });

  it("sets the start time correctly", () => {
    const soundName = "powerup";
    const startTime = 5;

    playSound(soundName, undefined, startTime);

    expect(audio[soundName].currentTime).toBe(startTime);
  });
});*/

// audio.test.ts

describe("playSound", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should play the specified sound", () => {
    const playSpy = vi.spyOn(audio.shotgun, "play");
    playSound("shotgun");
    expect(playSpy).toHaveBeenCalled();
  });

  it("should set the volume and start time correctly", () => {
    const audioInstance = audio.shotgun;
    const volumeSetter = vi.fn();
    const currentTimeSetter = vi.fn();

    Object.defineProperty(audioInstance, "volume", {
      set: volumeSetter,
    });
    Object.defineProperty(audioInstance, "currentTime", {
      set: currentTimeSetter,
    });

    playSound("shotgun", 0.5, 2);

    expect(volumeSetter).toHaveBeenCalledWith(0.5);
    expect(currentTimeSetter).toHaveBeenCalledWith(2);
  });

  it("should log a warning if the sound is not found", () => {
    const warnSpy = vi.spyOn(console, "warn");
    playSound("nonexistent");
    expect(warnSpy).toHaveBeenCalledWith('Sound "nonexistent" not found.');
  });
});
