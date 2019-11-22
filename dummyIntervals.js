export const intervals = [
    {
      cadence: 80, // in bpm
      duration: 10, // in seconds
      exercise: "running", // 'walking', 'rowing', 'jumping jacks', 'pushups', 'cycling', 'breathing', 'dancing', 'playing music'
      location: "forearm", // 'leg', 'chest'
      hapticOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "singlebeat" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "singlebeat" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        }
      },
      soundOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        }
      },
      visualOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "black" // different color to flash, different visualization?
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "green" // different color to flash, different visualization?
        }
      }
    },
    {
      cadence: 80, // in bpm
      duration: 10, // in seconds
      exercise: "running", // 'walking', 'rowing', 'jumping jacks', 'pushups', 'cycling', 'breathing', 'dancing', 'playing music'
      location: "forearm", // 'leg', 'chest'
      hapticOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "heartbeat" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "singleBeat" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        }
      },
      soundOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        }
      },
      visualOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "black" // different color to flash
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "green" // different color to flash
        }
      }
    },
    {
      cadence: 60, // in bpm
      duration: 10, // in seconds
      exercise: "running", // 'walking', 'rowing', 'jumping jacks', 'pushups', 'cycling', 'breathing', 'dancing', 'playing music'
      location: "forearm", // 'leg', 'chest'
      hapticOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "triplet" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "singleBeat" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        }
      },
      soundOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        }
      },
      visualOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "black" // different color to flash, different visualization?
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "green" // different color to flash, different visualization?
        }
      }
    },
    {
      cadence: 80, // in bpm
      duration: 10, // in seconds
      exercise: "running", // 'walking', 'rowing', 'jumping jacks', 'pushups', 'cycling', 'breathing', 'dancing', 'playing music'
      location: "forearm", // 'leg', 'chest'
      hapticOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "doubletime" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "singleBeat" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        }
      },
      soundOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        }
      },
      visualOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "black" // different color to flash, different visualization?
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "green" // different color to flash, different visualization?
        }
      }
    },
    {
      cadence: 80, // in bpm
      duration: 10, // in seconds
      exercise: "running", // 'walking', 'rowing', 'jumping jacks', 'pushups', 'cycling', 'breathing', 'dancing', 'playing music'
      location: "forearm", // 'leg', 'chest'
      hapticOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tripletime" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "singleBeat" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        }
      },
      soundOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        }
      },
      visualOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "black" // different color to flash, different visualization?
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "green" // different color to flash, different visualization?
        }
      }
    },
    {
      cadence: 80, // in bpm
      duration: 10, // in seconds
      exercise: "running", // 'walking', 'rowing', 'jumping jacks', 'pushups', 'cycling', 'breathing', 'dancing', 'playing music'
      location: "forearm", // 'leg', 'chest'
      hapticOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "quadrupletime" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "singleBeat" // 'heartbeat' (duh-DUH), 'doublet' (DUH-duh), 'triplet' (DUH-duh-duh), 'doubleTime' (split beat DUH-DUH), 'tripleTime', 'quadrupleTime'
        }
      },
      soundOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "tick" // different alert sounds available on phone
        }
      },
      visualOptions: {
        cadence: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "black" // different color to flash, different visualization?
        },
        step: {
          when: "everyBeat", // 'muteAtGoal', 'mute', 'decreaseAtGoal'
          what: "green" // different color to flash, different visualization?
        }
      }
    }
  ];