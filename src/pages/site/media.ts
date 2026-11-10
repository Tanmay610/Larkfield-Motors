export interface MediaEntry {
  src: string;
  alt: string;
}

// Clean and direct references to vehicle and dealership media
// To swap out any picture, simply replace the corresponding file in public/assets/
// or update the path below.
export const media: Record<string, MediaEntry> = {
  // Vehicles
  tucson: { src: "/assets/tucson.webp", alt: "A dark grey Hyundai Tucson on a dirt road under a pale sky" },
  raptor: { src: "/assets/raptor.webp", alt: "A grey Ford F-150 Raptor in an underground parking garage, lights on" },
  qx60: { src: "/assets/qx60.webp", alt: "A white Infiniti QX60 parked on a harbor dock beside fishing boats" },
  tacoma: { src: "/assets/tacoma.webp", alt: "A white Toyota Tacoma TRD Pro parked on a street of brick buildings" },
  zBlack: { src: "/assets/370z-black.webp", alt: "A black Nissan 370Z in a parking lot at dusk" },
  ram: { src: "/assets/ram-2500.webp", alt: "A white Ram 2500 pickup parked on gravel under a grey sky" },
  evo: { src: "/assets/lancer-evo.webp", alt: "A black Mitsubishi Lancer Evolution parked on a sloping street" },
  gr86: { src: "/assets/toyota-86.webp", alt: "A white Toyota 86 parked side-on in an empty lot" },
  zWhite: { src: "/assets/370z-white.webp", alt: "A white Nissan 370Z parked side-on against a pink wall" },
  tiguan: { src: "/assets/tiguan.webp", alt: "A red Volkswagen Tiguan parked outside a lit showroom at night" },
  kona: { src: "/assets/kona.webp", alt: "A red Hyundai Kona parked side-on in an empty lot" },
  q5: { src: "/assets/audi-q5.webp", alt: "A white Audi Q5 parked between two houses" },
  eclass: { src: "/assets/mercedes-eclass.webp", alt: "A black Mercedes-Benz E-Class parked in front of a red house" },
  escalade: { src: "/assets/escalade.webp", alt: "A black Cadillac Escalade on a wet street at night" },
  silverado: { src: "/assets/silverado.webp", alt: "A silver Chevrolet Silverado parked in a grassy field" },
  crv: { src: "/assets/crv.webp", alt: "A black Honda CR-V parked by a fence and bare trees" },
  civic: { src: "/assets/civic.webp", alt: "A black Honda Civic Si parked on a sunny street" },

  // Details & Closeups
  interior: { src: "/assets/interior.webp", alt: "A roomy modern car interior with wide windows" },
  camera: { src: "/assets/camera.webp", alt: "A dashboard screen showing the reversing camera" },
  wheelBlack: { src: "/assets/wheel-black.webp", alt: "A black alloy wheel up close" },
  headlight: { src: "/assets/headlight.webp", alt: "The headlight of a white car up close" },
  dash: { src: "/assets/dashboard.webp", alt: "A dashboard and steering wheel from the driver’s seat" },
  wheelWhite: { src: "/assets/wheel-white.webp", alt: "A white sports wheel and the front of a dark car" },

  // Dealership & People
  testDrive: { src: "/assets/test-drive.webp", alt: "A smiling woman at the wheel on a test drive" },
  group: { src: "/assets/showroom-group.webp", alt: "Three people talk about cars in a bright showroom" },
  newOwner: { src: "/assets/new-owner.webp", alt: "A woman holds up the keys beside her new car in the showroom" },
  handshake: { src: "/assets/handshake.webp", alt: "A salesman and a customer shake hands and pass over car keys" },
  lease: { src: "/assets/lease.webp", alt: "Two people go through a lease agreement beside a car" },
  couple: { src: "/assets/couple.webp", alt: "A couple in the front seats of their new car, holding the key" },
  clipboard: { src: "/assets/clipboard.webp", alt: "A salesman with a clipboard in the showroom" },
  keys: { src: "/assets/car-keys.webp", alt: "A dealer hands the keys to a woman sitting in her new car" },
};

// Aliases for backwards compatibility with any existing components
media.cdTucson = media.tucson;
media.cdRaptor = media.raptor;
media.cdQx60 = media.qx60;
media.cdTacoma = media.tacoma;
media.cdZBlack = media.zBlack;
media.cdRam = media.ram;
media.cdEvo = media.evo;
media.cdGr86 = media.gr86;
media.cdZWhite = media.zWhite;
media.cdTiguan = media.tiguan;
media.cdKona = media.kona;
media.cdQ5 = media.q5;
media.cdEclass = media.eclass;
media.cdEscalade = media.escalade;
media.cdSilverado = media.silverado;
media.cdCrv = media.crv;
media.cdCivic = media.civic;
media.cdInterior = media.interior;
media.cdCamera = media.camera;
media.cdWheelBlack = media.wheelBlack;
media.cdHeadlight = media.headlight;
media.cdDash = media.dash;
media.cdWheelWhite = media.wheelWhite;
media.cdTestDrive = media.testDrive;
media.cdGroup = media.group;
media.cdNewOwner = media.newOwner;
media.cdHandshake = media.handshake;
media.cdLease = media.lease;
media.cdCouple = media.couple;
media.cdClipboard = media.clipboard;
media.cdKeys = media.keys;
