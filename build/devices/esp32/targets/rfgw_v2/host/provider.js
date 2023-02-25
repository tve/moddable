import Analog from "embedded:io/analog"
import Digital from "embedded:io/digital"
import DigitalBank from "embedded:io/digitalbank"
import PulseCount from "embedded:io/pulsecount"
import PWM from "embedded:io/pwm"
import Serial from "embedded:io/serial"
import SMBus from "embedded:io/smbus"
import SPI from "embedded:io/spi"

const device = {
  Serial: {
    default: {
      io: Serial,
      port: 1,
      receive: 3,
      transmit: 1,
    },
  },
  SPI: {
    default: {
      io: SPI,
      clock: 32,
      in: 19,
      out: 33,
      port: 1,
    },
    radio: {
      io: SPI,
      clock: 32,
      in: 19,
      out: 33,
      port: 1,
			// MISO set-up time is 20ns @5Mhz when burst-reading FIFO, that's not enough
			// due to MISO passing through GPIO matrix...
      hz: 3_000_000,
      mode: 0,
    },
  },
  Analog: {
    // analog pin to measure battery voltage
    battery: {
      io: Analog,
      pin: 35,
      fct: 2, // multiply measurement by fct to get actual voltage
    },
  },
  io: { Analog, Digital, DigitalBank, PulseCount, PWM, Serial, SMBus, SPI },
  pin: {
    led: 4, // default green activity LED
    led_wifi: 2, // blue wifi LED
    // pins used by the sx1276 radio
    radio_reset: 27,
    radio_dio0: 26,
    radio_dio4: 22,
    radio_select: 25,
  },
}

export default device;
