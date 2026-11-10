import React from "react";
import { media, type MediaEntry } from "./media";
import { larkfieldPack, type StylePack } from "@/style-packs/larkfield";
import { CenterHero } from "@/components/center-hero";
import { ActionTiles, type TileItem } from "@/components/action-tiles";
import { BodyStage, type BodyStageItem } from "@/components/body-stage";
import { CarIndex, type CarTypeFilter } from "@/components/car-index";
import { FeatureCards, type FeatureCardData } from "@/components/feature-cards";
import { HelpCards, type HelpCardItem } from "@/components/help-cards";
import { MenuList, type MenuGroup } from "@/components/menu-list";
import { ProductRow } from "@/components/product-row";
import { ShowroomBand } from "@/components/showroom-band";
import { SiteFooter, SocialLinks } from "@/components/site-footer";
import { SizeChart } from "@/components/size-chart";
import { SpecStrip } from "@/components/spec-strip";
import { StatementSection } from "@/components/statement-section";
import { TrimCompare } from "@/components/trim-compare";
import { Photo, HeroPhotoBanner } from "@/components/photo";
import { PriceBadge } from "@/components/price-badge";
import { CardActionButton } from "@/components/card-action";
import { ActionLink } from "@/components/action-link";
import { ContactPanel } from "@/components/contact-panel";
import { ContactDetailsSection } from "@/components/contact-details";
import { SplitMediaSection } from "@/components/split-media-section";
import {
  IconTool,
  IconEngine,
  IconSteeringWheel,
  IconClipboardCheck,
  IconPhone,
  IconMessageCircle,
} from "@tabler/icons-react";

export interface CarItem {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  type: "suv" | "truck" | "sedan" | "sports";
  price: number;
  miles: number;
  owners: number;
  mpg: number;
  zeroSixty: number;
  seats: number;
  engine: string;
  color: string;
  photo: MediaEntry;
  sizes: [string, string, string, string, [string, string], string];
  isNew?: boolean;
}

export const cars: CarItem[] = [
  {
    id: "2022-hyundai-tucson",
    year: 2022,
    make: "Hyundai",
    model: "Tucson",
    trim: "SEL",
    type: "suv",
    price: 27900,
    miles: 24180,
    owners: 1,
    mpg: 28,
    zeroSixty: 8.6,
    seats: 5,
    engine: "2.5L four-cylinder, 187 hp",
    color: "Amazon Gray",
    photo: media.cdTucson,
    sizes: ["65.6 in", "73.4 in", "108.5 in", "182.3 in", ["Cargo space", "38.7 cu ft"], "8.3 in"],
    isNew: true,
  },
  {
    id: "2019-ford-f150-raptor",
    year: 2019,
    make: "Ford",
    model: "F-150 Raptor",
    trim: "SuperCrew",
    type: "truck",
    price: 52900,
    miles: 38900,
    owners: 1,
    mpg: 16,
    zeroSixty: 5.1,
    seats: 5,
    engine: "3.5L twin-turbo V6, 450 hp",
    color: "Lead Foot Gray",
    photo: media.cdRaptor,
    sizes: ["78.5 in", "86.3 in", "145.0 in", "220.0 in", ["Bed length", "5.5 ft"], "11.5 in"],
    isNew: true,
  },
  {
    id: "2022-infiniti-qx60",
    year: 2022,
    make: "Infiniti",
    model: "QX60",
    trim: "Luxe",
    type: "suv",
    price: 41500,
    miles: 21300,
    owners: 1,
    mpg: 24,
    zeroSixty: 6.4,
    seats: 7,
    engine: "3.5L V6, 295 hp",
    color: "Pure White",
    photo: media.cdQx60,
    sizes: ["69.7 in", "78.0 in", "114.2 in", "198.2 in", ["Cargo space", "14.5 cu ft"], "7.1 in"],
  },
  {
    id: "2019-toyota-tacoma-trd-pro",
    year: 2019,
    make: "Toyota",
    model: "Tacoma",
    trim: "TRD Pro",
    type: "truck",
    price: 41900,
    miles: 33400,
    owners: 1,
    mpg: 19,
    zeroSixty: 7.6,
    seats: 5,
    engine: "3.5L V6, 278 hp",
    color: "Super White",
    photo: media.cdTacoma,
    sizes: ["71.6 in", "75.2 in", "127.4 in", "212.3 in", ["Bed length", "5.0 ft"], "9.4 in"],
  },
  {
    id: "2017-nissan-370z-nismo",
    year: 2017,
    make: "Nissan",
    model: "370Z",
    trim: "Nismo",
    type: "sports",
    price: 26900,
    miles: 31700,
    owners: 1,
    mpg: 20,
    zeroSixty: 5.2,
    seats: 2,
    engine: "3.7L V6, 350 hp",
    color: "Magnetic Black",
    photo: media.cdZBlack,
    sizes: ["51.8 in", "72.8 in", "100.4 in", "172.6 in", ["Trunk space", "6.9 cu ft"], "4.7 in"],
  },
  {
    id: "2018-ram-2500-laramie",
    year: 2018,
    make: "Ram",
    model: "2500",
    trim: "Laramie",
    type: "truck",
    price: 44800,
    miles: 61200,
    owners: 1,
    mpg: 17,
    zeroSixty: 7.9,
    seats: 6,
    engine: "6.7L turbo diesel, 370 hp",
    color: "Bright White",
    photo: media.cdRam,
    sizes: ["79.4 in", "79.4 in", "149.5 in", "237.9 in", ["Bed length", "6.3 ft"], "8.0 in"],
  },
  {
    id: "2014-mitsubishi-lancer-evolution",
    year: 2014,
    make: "Mitsubishi",
    model: "Lancer Evolution",
    trim: "GSR",
    type: "sedan",
    price: 29900,
    miles: 52100,
    owners: 2,
    mpg: 19,
    zeroSixty: 4.9,
    seats: 5,
    engine: "2.0L turbo four-cylinder, 291 hp",
    color: "Tarmac Black",
    photo: media.cdEvo,
    sizes: ["58.7 in", "71.3 in", "104.3 in", "180.0 in", ["Trunk space", "6.9 cu ft"], "5.5 in"],
  },
  {
    id: "2019-toyota-86",
    year: 2019,
    make: "Toyota",
    model: "86",
    trim: "GT",
    type: "sports",
    price: 23400,
    miles: 29800,
    owners: 1,
    mpg: 24,
    zeroSixty: 6.4,
    seats: 4,
    engine: "2.0L flat-four, 205 hp",
    color: "Halo White",
    photo: media.cdGr86,
    sizes: ["50.6 in", "69.9 in", "101.2 in", "166.7 in", ["Trunk space", "6.9 cu ft"], "4.9 in"],
  },
  {
    id: "2018-nissan-370z-sport",
    year: 2018,
    make: "Nissan",
    model: "370Z",
    trim: "Sport",
    type: "sports",
    price: 24500,
    miles: 27400,
    owners: 1,
    mpg: 21,
    zeroSixty: 5.1,
    seats: 2,
    engine: "3.7L V6, 332 hp",
    color: "Pearl White",
    photo: media.cdZWhite,
    sizes: ["51.8 in", "72.8 in", "100.4 in", "167.3 in", ["Trunk space", "6.9 cu ft"], "4.7 in"],
  },
  {
    id: "2019-volkswagen-tiguan",
    year: 2019,
    make: "Volkswagen",
    model: "Tiguan",
    trim: "SE 4Motion",
    type: "suv",
    price: 21900,
    miles: 46200,
    owners: 1,
    mpg: 25,
    zeroSixty: 8.7,
    seats: 5,
    engine: "2.0L turbo four-cylinder, 184 hp",
    color: "Habanero Orange",
    photo: media.cdTiguan,
    sizes: ["66.3 in", "72.4 in", "109.8 in", "185.1 in", ["Cargo space", "37.6 cu ft"], "7.9 in"],
  },
  {
    id: "2020-hyundai-kona",
    year: 2020,
    make: "Hyundai",
    model: "Kona",
    trim: "SEL",
    type: "suv",
    price: 18400,
    miles: 41600,
    owners: 2,
    mpg: 30,
    zeroSixty: 8.9,
    seats: 5,
    engine: "2.0L four-cylinder, 147 hp",
    color: "Pulse Red",
    photo: media.cdKona,
    sizes: ["61.0 in", "70.9 in", "102.4 in", "164.0 in", ["Cargo space", "19.2 cu ft"], "6.7 in"],
  },
  {
    id: "2016-audi-q5",
    year: 2016,
    make: "Audi",
    model: "Q5",
    trim: "Premium Plus",
    type: "suv",
    price: 17800,
    miles: 68400,
    owners: 2,
    mpg: 22,
    zeroSixty: 7.1,
    seats: 5,
    engine: "2.0L turbo four-cylinder, 220 hp",
    color: "Glacier White",
    photo: media.cdQ5,
    sizes: ["65.2 in", "74.7 in", "110.5 in", "182.6 in", ["Cargo space", "29.1 cu ft"], "7.9 in"],
  },
  {
    id: "2014-mercedes-benz-e350",
    year: 2014,
    make: "Mercedes-Benz",
    model: "E350",
    trim: "4MATIC",
    type: "sedan",
    price: 16900,
    miles: 72500,
    owners: 2,
    mpg: 22,
    zeroSixty: 6.6,
    seats: 5,
    engine: "3.5L V6, 302 hp",
    color: "Obsidian Black",
    photo: media.cdEclass,
    sizes: ["57.3 in", "72.7 in", "113.2 in", "192.1 in", ["Trunk space", "15.9 cu ft"], "4.4 in"],
  },
  {
    id: "2013-cadillac-escalade",
    year: 2013,
    make: "Cadillac",
    model: "Escalade",
    trim: "Premium",
    type: "suv",
    price: 22500,
    miles: 98700,
    owners: 3,
    mpg: 16,
    zeroSixty: 6.7,
    seats: 7,
    engine: "6.2L V8, 403 hp",
    color: "Black Raven",
    photo: media.cdEscalade,
    sizes: ["74.3 in", "79.1 in", "116.0 in", "202.5 in", ["Cargo space", "16.9 cu ft"], "9.0 in"],
  },
  {
    id: "2005-chevrolet-silverado-2500hd",
    year: 2005,
    make: "Chevrolet",
    model: "Silverado 2500HD",
    trim: "LS",
    type: "truck",
    price: 12900,
    miles: 164000,
    owners: 3,
    mpg: 13,
    zeroSixty: 9.0,
    seats: 6,
    engine: "6.0L V8, 300 hp",
    color: "Silver Birch",
    photo: media.cdSilverado,
    sizes: ["77.0 in", "79.0 in", "143.5 in", "230.2 in", ["Bed length", "6.5 ft"], "8.4 in"],
  },
  {
    id: "2010-honda-cr-v",
    year: 2010,
    make: "Honda",
    model: "CR-V",
    trim: "EX",
    type: "suv",
    price: 9800,
    miles: 121400,
    owners: 3,
    mpg: 23,
    zeroSixty: 9.5,
    seats: 5,
    engine: "2.4L four-cylinder, 166 hp",
    color: "Crystal Black",
    photo: media.cdCrv,
    sizes: ["66.1 in", "71.6 in", "103.1 in", "178.3 in", ["Cargo space", "35.7 cu ft"], "7.3 in"],
  },
  {
    id: "2010-honda-civic-si",
    year: 2010,
    make: "Honda",
    model: "Civic Si",
    trim: "Sedan",
    type: "sedan",
    price: 8900,
    miles: 108300,
    owners: 3,
    mpg: 24,
    zeroSixty: 6.8,
    seats: 5,
    engine: "2.0L four-cylinder, 197 hp",
    color: "Crystal Black",
    photo: media.cdCivic,
    sizes: ["55.1 in", "69.0 in", "106.3 in", "177.7 in", ["Trunk space", "12.0 cu ft"], "5.0 in"],
  },
];

export const formatPrice = (e: number) => `$${e.toLocaleString("en-US")}`;
export const parseDimension = (e: string) => {
  const [val, ...rest] = e.split(" ");
  return { value: val, unit: rest.join(" ") };
};
export const calcMonthly = (e: number) => formatPrice(Math.round((e * 1.09) / 60));
export const carFullName = (e: CarItem) => `${e.year} ${e.make} ${e.model} ${e.trim}`;
export const carHref = (e: CarItem) => `/cars/${e.id}`;
export const ownersText = (e: number) => (e === 1 ? "1 owner" : `${e} owners`);
export const formatNumber = (e: number) => e.toLocaleString("en-US");

export const carCategories: CarTypeFilter[] = [
  { id: "all", label: "All cars", text: "Every car on the lot, checked on 152 points and priced on the window." },
  { id: "suv", label: "SUVs", text: "Family SUVs and small crossovers, from a first car to seven seats." },
  { id: "truck", label: "Trucks", text: "Pickups for work and weekends, from a mid-size Tacoma to a diesel Ram." },
  { id: "sedan", label: "Sedans", text: "Comfortable, cheap to run, and easy to park." },
  { id: "sports", label: "Sports cars", text: "Every one driven by our technicians before it goes on sale." },
];

export const carTypeNames = {
  suv: "SUV",
  truck: "truck",
  sedan: "sedan",
  sports: "sports car",
};

export const minPriceForType = (type: string) =>
  formatPrice(Math.min(...cars.filter((t) => t.type === type).map((t) => t.price)));

export const stockCountForType = (type: string) =>
  `${cars.filter((t) => t.type === type).length} in stock`;

export const typeFeatureCards: Record<string, FeatureCardData[]> = {
  suv: [
    {
      id: "room",
      label: "Room",
      claim: "Seats that fold flat",
      media: <Photo photo={media.cdInterior} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Seats that fold flat</h4>
            <p>The rear seats fold flat in one pull. A bike, a dog crate or a flat-pack desk fits easily.</p>
          </>
        ),
      },
    },
    {
      id: "camera",
      label: "Parking",
      claim: "A reversing camera",
      media: <Photo photo={media.cdCamera} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>A reversing camera</h4>
            <p>Lines on the screen turn with the wheel as you back up. Tight spots take one try.</p>
          </>
        ),
      },
    },
    {
      id: "wheels",
      label: "Tires",
      claim: "Tread checked on all four",
      media: <Photo photo={media.cdWheelBlack} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Tread checked on all four</h4>
            <p>We measure the tread on every tire. Anything under 6/32 of an inch is replaced before sale.</p>
          </>
        ),
      },
    },
    {
      id: "lights",
      label: "Safety",
      claim: "Lights, brakes and belts tested",
      media: <Photo photo={media.cdHeadlight} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Lights, brakes and belts tested</h4>
            <p>Our technicians test every light, brake and belt. The signed 152-point sheet comes with the keys.</p>
          </>
        ),
      },
    },
  ],
  truck: [
    {
      id: "tow",
      label: "Towing",
      claim: "Hitch and wiring checked",
      media: <Photo photo={media.cdWheelBlack} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Hitch and wiring checked</h4>
            <p>We check the hitch, the wiring and the brake controller. Bring your trailer to the test drive.</p>
          </>
        ),
      },
    },
    {
      id: "cab",
      label: "Cab",
      claim: "Room for the whole crew",
      media: <Photo photo={media.cdDash} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Room for the whole crew</h4>
            <p>Five seats with real legroom in the back. Long days on site feel shorter.</p>
          </>
        ),
      },
    },
    {
      id: "camera",
      label: "Parking",
      claim: "A camera for the trailer",
      media: <Photo photo={media.cdCamera} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>A camera for the trailer</h4>
            <p>The rear camera lines up the hitch for you. Hooking up takes one try.</p>
          </>
        ),
      },
    },
    {
      id: "lights",
      label: "Safety",
      claim: "Lights, brakes and belts tested",
      media: <Photo photo={media.cdHeadlight} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Lights, brakes and belts tested</h4>
            <p>Our technicians test every light, brake and belt. The signed 152-point sheet comes with the keys.</p>
          </>
        ),
      },
    },
  ],
  sedan: [
    {
      id: "cabin",
      label: "Comfort",
      claim: "A quiet cabin",
      media: <Photo photo={media.cdInterior} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>A quiet cabin</h4>
            <p>Thick glass and soft seats keep the road outside. It makes a calm place for a long commute.</p>
          </>
        ),
      },
    },
    {
      id: "dash",
      label: "Driving",
      claim: "Everything within reach",
      media: <Photo photo={media.cdDash} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Everything within reach</h4>
            <p>Screen, climate and phone controls sit where your hands already are. Nothing to hunt for at a red light.</p>
          </>
        ),
      },
    },
    {
      id: "wheels",
      label: "Tires",
      claim: "Tread checked on all four",
      media: <Photo photo={media.cdWheelWhite} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Tread checked on all four</h4>
            <p>We measure the tread on every tire. Anything under 6/32 of an inch is replaced before sale.</p>
          </>
        ),
      },
    },
    {
      id: "lights",
      label: "Safety",
      claim: "Lights, brakes and belts tested",
      media: <Photo photo={media.cdHeadlight} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Lights, brakes and belts tested</h4>
            <p>Our technicians test every light, brake and belt. The signed 152-point sheet comes with the keys.</p>
          </>
        ),
      },
    },
  ],
  sports: [
    {
      id: "wheels",
      label: "Grip",
      claim: "Performance tires, checked",
      media: <Photo photo={media.cdWheelWhite} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Performance tires, checked</h4>
            <p>We check or fit performance tires on every sports car. Each set is balanced and aligned before sale.</p>
          </>
        ),
      },
    },
    {
      id: "dash",
      label: "Driving",
      claim: "Our technicians took it out first",
      media: <Photo photo={media.cdDash} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Our technicians took it out first</h4>
            <p>A technician drives every sports car before it goes on sale. If it feels wrong, it stays off the lot.</p>
          </>
        ),
      },
    },
    {
      id: "lights",
      label: "Safety",
      claim: "Lights, brakes and belts tested",
      media: <Photo photo={media.cdHeadlight} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Lights, brakes and belts tested</h4>
            <p>Our technicians test every light, brake and belt. The signed 152-point sheet comes with the keys.</p>
          </>
        ),
      },
    },
    {
      id: "history",
      label: "History",
      claim: "Clean title, full records",
      media: <Photo photo={media.cdWheelBlack} />,
      action: {
        kind: "overlay",
        content: (
          <>
            <h4>Clean title, full records</h4>
            <p>Every sports car here has a clean title. You get every service record we have.</p>
          </>
        ),
      },
    },
  ],
};

export const carFaqs: MenuGroup[] = [
  {
    id: "questions",
    label: "Frequently asked questions",
    items: [
      {
        id: "check",
        name: "What does the 152-point check cover?",
        text: "Brakes, tires, lights, belts, fluids, the engine and the electrics, and a road test by one of our technicians. You get the sheet with the keys.",
      },
      {
        id: "price",
        name: "Is the price on the window the price?",
        text: "Yes, with our checks and a full tank included. Tax, title and registration are added at the state's rates, and nothing else.",
      },
      {
        id: "warranty",
        name: "Is there a warranty?",
        text: "Every car comes with 90 days or 3,000 miles on the engine and transmission. You can extend it to five years when you buy.",
      },
      {
        id: "trade",
        name: "Can I trade in my car?",
        text: "Yes. Bring it in or send us photos, and we will give you a written offer that holds for seven days.",
      },
      {
        id: "finance",
        name: "Can I get finance?",
        text: "We work with six lenders and local credit unions. Apply in ten minutes, and we will tell you your rate before you come in.",
      },
      {
        id: "hold",
        name: "Can you hold a car for me?",
        text: "We hold any car for 48 hours with a $250 deposit. It comes off the price, or back to you if you change your mind.",
      },
      {
        id: "delivery",
        name: "Do you deliver?",
        text: "Free within 50 km of Panchkula. Further away, we quote a flat fee.",
      },
      {
        id: "history",
        name: "Can I see the history report?",
        text: "Every car has a free history report. Ask for it on the car's page or at the desk.",
      },
    ],
  },
];

export function buildCarPage(car: CarItem) {
  const relatedCars = [car, ...cars.filter((l) => l.type === car.type && l.id !== car.id).slice(0, 2)];
  const [height, width, wheelbase, length, cargo, clearance] = car.sizes;

  return {
    title: carFullName(car),
    content: (
      <>
        <div className="bg-black">
          <HeroPhotoBanner
            photo={car.photo}
            title={`${car.make} ${car.model}`}
            line={`${car.year} · ${car.trim} · ${formatNumber(car.miles)} miles · ${ownersText(car.owners)}`}
            action={
              <div className="flex flex-wrap items-center gap-4 text-foreground">
                <PriceBadge price={formatPrice(car.price)} line={`or ${calcMonthly(car.price)} a month`} />
                <CardActionButton href="/test-drive" tone="light">
                  Book a test drive
                </CardActionButton>
              </div>
            }
          />
        </div>

        <FeatureCards
          size="fact"
          headline={`Why this ${carTypeNames[car.type]}`}
          actionLabel="More about"
          cards={typeFeatureCards[car.type] ?? []}
        />

        <SpecStrip
          label="At a glance"
          compareHref="#compare"
          versions={[
            {
              id: car.id,
              label: car.trim,
              media: <Photo photo={car.photo} />,
              price: formatPrice(car.price),
              line: `or ${calcMonthly(car.price)} a month over 60 months`,
              stickerRows: [
                { label: "Miles", value: formatNumber(car.miles) },
                { label: "Owners", value: car.owners },
                { label: "Checked", value: "152 points" },
                { label: "Color", value: car.color },
              ],
              stats: [
                { value: car.mpg, unit: "mpg", label: "Combined" },
                { value: car.zeroSixty, unit: "sec", label: "0–60 mph" },
                { value: car.seats, label: "Seats" },
                { value: formatNumber(car.miles), label: "Miles" },
                { value: car.owners, label: car.owners === 1 ? "Owner" : "Owners" },
              ],
            },
          ]}
        />

        <div className="bg-black">
          <HeroPhotoBanner
            photo={media.cdTestDrive}
            heading="h2"
            title="See it in person"
            line="Book a test drive and we'll have it washed and parked out front."
            action={
              <CardActionButton href="/test-drive" tone="accent">
                Book a test drive
              </CardActionButton>
            }
          />
        </div>

        <SizeChart
          title="Size it up"
          sizes={[
            { label: "Height", ...parseDimension(height) },
            { label: "Width", ...parseDimension(width) },
            { label: "Length", ...parseDimension(length) },
            { label: "Wheelbase", ...parseDimension(wheelbase) },
            { label: "Ground clearance", ...parseDimension(clearance) },
            { label: cargo[0], ...parseDimension(cargo[1]) },
          ]}
        />

        <TrimCompare
          id="compare"
          title="Others like it on the lot"
          actions={
            <>
              <CardActionButton href="/test-drive">Book a test drive</CardActionButton>
              <CardActionButton href={`/cars?type=${car.type}`} tone="outline">
                See them all
              </CardActionButton>
            </>
          }
          trims={relatedCars.map((rel) => ({
            id: rel.id,
            name: `${rel.year} ${rel.make} ${rel.model}`,
            price: formatPrice(rel.price),
            line: `or ${calcMonthly(rel.price)} a month`,
            media: <Photo photo={rel.photo} />,
            actions:
              rel.id === car.id ? (
                <span className="text-meta opacity-70">You're looking at this one</span>
              ) : (
                <CardActionButton href={carHref(rel)} tone="outline">
                  See this car
                </CardActionButton>
              ),
            rows: {
              economy: `${rel.mpg} mpg`,
              engine: rel.engine,
              seats: `${rel.seats}`,
              miles: formatNumber(rel.miles),
              owners: `${rel.owners}`,
            },
          }))}
          rows={[
            { id: "economy", label: "Economy" },
            { id: "engine", label: "Engine" },
            { id: "seats", label: "Seats" },
            { id: "miles", label: "Miles" },
            { id: "owners", label: "Owners" },
          ]}
        />

        <MenuList size="faq" groups={carFaqs} />
      </>
    ),
  };
}

export const serviceFaqs: MenuGroup[] = [
  {
    id: "questions",
    label: "Frequently asked questions",
    items: [
      {
        id: "any",
        name: "Do you service cars you didn't sell?",
        text: "Yes. Any make and model, and most cars older than twenty years.",
      },
      {
        id: "wait",
        name: "Can I wait while you work?",
        text: "For oil changes and tires, yes, in the lounge with coffee and Wi-Fi. For longer jobs we'll drive you home or lend you a car.",
      },
      {
        id: "price",
        name: "Will I know the price first?",
        text: "Always. We call with a quote before any work beyond what you booked.",
      },
      {
        id: "parts",
        name: "Which parts do you use?",
        text: "Factory parts, or parts as good, with a 12-month, 12,000-mile guarantee on both the part and the labor.",
      },
      {
        id: "inspection",
        name: "Do you do state inspections?",
        text: "Yes, Monday to Saturday, usually in under an hour.",
      },
      {
        id: "hours",
        name: "When is the workshop open?",
        text: "Monday to Friday 7:30am to 6pm, Saturday 8am to 2pm.",
      },
    ],
  },
];

export const businessFaqs: MenuGroup[] = [
  {
    id: "questions",
    label: "Frequently asked questions",
    items: [
      {
        id: "size",
        name: "How many vehicles do I need?",
        text: "One. Business pricing starts with your first truck.",
      },
      {
        id: "invoice",
        name: "Can I get one invoice a month?",
        text: "Yes. Every vehicle, service and repair on one invoice, with net-30 terms.",
      },
      {
        id: "service",
        name: "Do you service fleet vehicles first?",
        text: "Fleet bookings get the first slot of the day, and a loan truck if a job runs over.",
      },
      {
        id: "lease",
        name: "Can I lease instead of buy?",
        text: "Yes, over 24 to 60 months, with or without maintenance.",
      },
      {
        id: "upfit",
        name: "Can you fit racks, boxes or a plow?",
        text: "We work with two local upfitters and add the cost to the same deal.",
      },
      {
        id: "trade",
        name: "Can I trade in old vehicles?",
        text: "Yes, all at once, on one written offer.",
      },
    ],
  },
];

const tacoma = cars[3];
const ram = cars[5];

const darkBg = "#0f1b2d";
const lightFg = "#f5f6f8";

export const siteConfig = {
  pack: larkfieldPack,
  layout: "margin",
  header: {
    name: "Larkfield Motors",
    home: "/",
    start: [
      { label: "Cars", href: "/cars" },
      { label: "Service", href: "/service" },
      { label: "Business", href: "/business" },
    ],
    end: [{ label: "Book a test drive", href: "/test-drive" }],
  },
  hero: (
    <CenterHero
      media={<Photo photo={media.cdTucson} />}
      title="Drive home today"
      action={
        <div className="flex flex-wrap justify-center gap-3">
          <CardActionButton href="/cars" tone="accent">
            See all {cars.length} cars
          </CardActionButton>
          <CardActionButton href="/test-drive" tone="light">
            Book a test drive
          </CardActionButton>
        </div>
      }
    />
  ),
  footer: {
    contact: {
      label: "Come and see",
      text: "Every car here, keys ready",
      action: <ActionLink href="/test-drive">Book a test drive</ActionLink>,
    },
    address: {
      label: "Showroom / Panchkula",
      lines: ["Larkfield Motors", "Panchkula, India"],
      action: (
        <>
          <ActionLink href="tel:+917814128680">+91 78141 28680</ActionLink> ·{" "}
          <ActionLink href="mailto:larkfieldmotors@gmail.com">larkfieldmotors@gmail.com</ActionLink>
        </>
      ),
    },
    photos: [
      <Photo photo={media.cdGroup} key="0" />,
      <Photo photo={media.cdWheelBlack} key="1" />,
      <Photo photo={media.cdNewOwner} key="2" />,
    ],
    social: <SocialLinks />,
    copyright: "© Larkfield Motors, 2026",
  },
  after: (
    <>
      <BodyStage
        label="Find your kind of car"
        bodies={[
          {
            id: "suv",
            word: "SUVs",
            media: <Photo photo={media.cdKona} />,
            line: "Room for five and the dog",
            from: `From ${minPriceForType("suv")}`,
            count: stockCountForType("suv"),
            actions: (
              <>
                <CardActionButton href="/cars?type=suv">See all SUVs</CardActionButton>
                <CardActionButton href="/test-drive" tone="light">
                  Book a test drive
                </CardActionButton>
              </>
            ),
          },
          {
            id: "truck",
            word: "Trucks",
            media: <Photo photo={media.cdTacoma} />,
            line: "Built for work and weekends",
            from: `From ${minPriceForType("truck")}`,
            count: stockCountForType("truck"),
            actions: (
              <>
                <CardActionButton href="/cars?type=truck">See all trucks</CardActionButton>
                <CardActionButton href="/test-drive" tone="light">
                  Book a test drive
                </CardActionButton>
              </>
            ),
          },
          {
            id: "sedan",
            word: "Sedans",
            media: <Photo photo={media.cdEclass} />,
            line: "Quiet, frugal, easy to park",
            from: `From ${minPriceForType("sedan")}`,
            count: stockCountForType("sedan"),
            actions: (
              <>
                <CardActionButton href="/cars?type=sedan">See all sedans</CardActionButton>
                <CardActionButton href="/test-drive" tone="light">
                  Book a test drive
                </CardActionButton>
              </>
            ),
          },
          {
            id: "sports",
            word: "Sports cars",
            media: <Photo photo={media.cdZWhite} />,
            line: "Two doors and a good road",
            from: `From ${minPriceForType("sports")}`,
            count: stockCountForType("sports"),
            actions: (
              <>
                <CardActionButton href="/cars?type=sports">See all sports cars</CardActionButton>
                <CardActionButton href="/test-drive" tone="light">
                  Book a test drive
                </CardActionButton>
              </>
            ),
          },
        ]}
      />

      <FeatureCards
        size="tall"
        headline="Why buy from Larkfield"
        more={<ActionLink href="/cars">See every car</ActionLink>}
        cards={[
          {
            id: "checked",
            label: "Checked",
            claim: "152 points on every car",
            media: <Photo photo={media.cdHeadlight} />,
            href: "/cars",
          },
          {
            id: "price",
            label: "Fair prices",
            claim: "No fees on top",
            media: <Photo photo={media.cdNewOwner} />,
            href: "/cars",
          },
          {
            id: "warranty",
            label: "Warranty",
            claim: "90 days cover on every car",
            media: <Photo photo={media.cdWheelBlack} />,
            href: "/service",
          },
          {
            id: "trade",
            label: "Trade-ins",
            claim: "Offers that hold a week",
            media: <Photo photo={media.cdHandshake} />,
            href: "/test-drive",
          },
          {
            id: "finance",
            label: "Finance",
            claim: "Your rate before you visit",
            media: <Photo photo={media.cdLease} />,
            href: "/test-drive",
          },
        ]}
      />

      <ShowroomBand
        media={<Photo photo={media.cdTiguan} />}
        title="Five stars from 2,400 drivers"
        lede="Every review is from someone who bought a car or had one serviced here."
        showroom={{
          status: "Open today",
          name: "Larkfield Motors",
          address: ["Panchkula, India"],
          hours: ["Mon–Fri 9am–7pm", "Sat 9am–5pm", "Sun closed"],
          media: <Photo photo={media.cdGroup} />,
          actions: (
            <>
              <CardActionButton href="/test-drive" tone="accent">
                Visit us
              </CardActionButton>
              <ActionLink href="https://maps.google.com/?q=Panchkula,+India" target="_blank">
                Directions
              </ActionLink>
            </>
          ),
        }}
        card={{
          title: "Get behind the wheel",
          media: <Photo photo={media.cdTestDrive} />,
          action: (
            <CardActionButton href="/test-drive" tone="light">
              Book a test drive
            </CardActionButton>
          ),
        }}
      />

      <div style={{ "--color-background": darkBg, "--color-foreground": lightFg } as React.CSSProperties}>
        <StatementSection
          eyebrow="Our workshop"
          lede="Six technicians, eight bays, and the same people who check every car we sell."
          action={
            <CardActionButton href="/service" tone="accent">
              Book a service
            </CardActionButton>
          }
        >
          We keep it running
        </StatementSection>
        <ProductRow
          items={[
            {
              id: "tires",
              href: "/service",
              name: "Tires and wheels",
              detail: "Fitting, balancing and storage for your winter set.",
              image: <Photo photo={media.cdWheelBlack} />,
            },
            {
              id: "diagnostics",
              href: "/service",
              name: "Diagnostics",
              detail: "A warning light read and explained, free.",
              image: <Photo photo={media.cdDash} />,
            },
            {
              id: "inspection",
              href: "/service",
              name: "State inspection",
              detail: "Most cars done in under an hour.",
              image: <Photo photo={media.cdHeadlight} />,
            },
          ]}
        />
      </div>

      <ActionTiles
        title="Where to next"
        tiles={[
          { id: "find", label: "Find a car", href: "/cars", tone: "accent" },
          { id: "trade", label: "Trade-in value", href: "/test-drive", tone: "block" },
          { id: "finance", label: "Finance", href: "/test-drive", tone: "block-2" },
          { id: "service", label: "Book a service", href: "/service", tone: "dark" },
        ]}
      />

      <div className="bg-black">
        <HeroPhotoBanner
          photo={media.cdCouple}
          heading="h2"
          title="Family run since 1987"
          line="Three generations of the Larkfields, and many of the same customers."
          action={
            <CardActionButton href="/business" tone="light">
              Buy for your business
            </CardActionButton>
          }
        />
      </div>
    </>
  ),
  pages: {
    cars: {
      title: "Cars for sale",
      content: (
        <CarIndex
          title="Cars for sale"
          types={carCategories}
          cars={cars.map((e) => ({
            id: e.id,
            type: e.type,
            href: carHref(e),
            name: `${e.year} ${e.make} ${e.model}`,
            facts: `${e.trim} · ${formatNumber(e.miles)} miles · ${ownersText(e.owners)}`,
            price: e.price,
            line: `or ${calcMonthly(e.price)} a month`,
            image: <Photo photo={e.photo} />,
            isNew: e.isNew,
          }))}
          empty="Nothing of this kind on the lot this week. Tell us what you want and we'll find one."
        />
      ),
    },
    service: {
      title: "Service",
      content: (
        <>
          <CenterHero
            media={<Photo photo={media.cdWheelWhite} />}
            title="Book a service"
            action={
              <div className="flex flex-col items-center gap-6">
                <p className="m-0 max-w-[34ch] text-large ![line-height:1.4]">
                  Any make and age, with a quote before we start and coffee while you wait.
                </p>
                <CardActionButton href="#contact" tone="accent">
                  Book now
                </CardActionButton>
              </div>
            }
          />
          <HelpCards
            title="What do you need?"
            cards={[
              {
                id: "servicing",
                icon: <IconTool />,
                title: "Servicing",
                links: [
                  { label: "Oil and filter", href: "#questions" },
                  { label: "Scheduled service", href: "#questions" },
                  { label: "Brakes", href: "#questions" },
                  { label: "Batteries", href: "#questions" },
                ],
              },
              {
                id: "repairs",
                icon: <IconEngine />,
                title: "Repairs",
                links: [
                  { label: "Warning lights", href: "#questions" },
                  { label: "Engine and transmission", href: "#questions" },
                  { label: "Air conditioning", href: "#questions" },
                  { label: "Bodywork", href: "#questions" },
                ],
              },
              {
                id: "tires",
                icon: <IconSteeringWheel />,
                title: "Tires",
                links: [
                  { label: "New tires", href: "#questions" },
                  { label: "Balancing and alignment", href: "#questions" },
                  { label: "Winter tire storage", href: "#questions" },
                ],
              },
              {
                id: "inspection",
                icon: <IconClipboardCheck />,
                title: "Inspection",
                links: [
                  { label: "State inspection", href: "#questions" },
                  { label: "Pre-purchase check", href: "#questions" },
                  { label: "Emissions", href: "#questions" },
                ],
              },
            ]}
          />
          <div id="questions" className="scroll-mt-[var(--site-header-height)]">
            <MenuList size="faq" groups={serviceFaqs} />
          </div>
          <ContactDetailsSection
            id="contact"
            title="Get in touch"
            lede="Call, text or book online, and we'll confirm a time the same day."
            ways={[
              {
                id: "call",
                icon: <IconPhone />,
                title: "Call the workshop",
                text: "Mon–Fri 7:30am–6pm, Sat 8am–2pm",
                action: <ActionLink href="tel:+917814128680">+91 78141 28680</ActionLink>,
              },
              {
                id: "text",
                icon: <IconMessageCircle />,
                title: "Send a text",
                text: "A photo of the warning light helps",
                action: <ActionLink href="sms:+917814128680">Text the workshop</ActionLink>,
              },
            ]}
            formTitle="Book a service"
            form={<ContactPanel subject="Service booking" />}
          />
        </>
      ),
    },
    business: {
      title: "Business",
      content: (
        <>
          <div className="bg-black">
            <HeroPhotoBanner
              photo={media.cdRaptor}
              title="Business and fleet"
              line="Trucks and cars for firms of every size, with one invoice and a named manager."
              action={
                <CardActionButton href="/test-drive" tone="accent">
                  Call our fleet desk
                </CardActionButton>
              }
            />
          </div>
          <StatementSection
            centered={true}
            eyebrow="For business"
            lede="We buy, fit out, service and replace them, so your crews keep working."
          >
            From one truck to forty
          </StatementSection>
          <FeatureCards
            size="tall"
            headline="What a fleet account gets"
            cards={[
              {
                id: "manager",
                label: "One contact",
                claim: "A named fleet manager",
                media: <Photo photo={media.cdClipboard} />,
                href: "/test-drive",
              },
              {
                id: "invoice",
                label: "One invoice",
                claim: "One bill a month",
                media: <Photo photo={media.cdLease} />,
                href: "/test-drive",
              },
              {
                id: "pickup",
                label: "Pick-up and drop-off",
                claim: "Collected and returned same day",
                media: <Photo photo={media.cdKeys} />,
                href: "/service",
              },
              {
                id: "first",
                label: "First in line",
                claim: "The earliest slot every day",
                media: <Photo photo={media.cdDash} />,
                href: "/service",
              },
            ]}
          />
          <TrimCompare
            title="Work trucks on the lot"
            actions={
              <CardActionButton href="/cars?type=truck" tone="outline">
                See all trucks
              </CardActionButton>
            }
            trims={[tacoma, ram].map((e) => ({
              id: e.id,
              name: `${e.make} ${e.model}`,
              price: formatPrice(e.price),
              line: `or ${calcMonthly(e.price)} a month`,
              media: <Photo photo={e.photo} />,
              actions: (
                <CardActionButton href={carHref(e)} tone="outline">
                  See this truck
                </CardActionButton>
              ),
              rows: {
                engine: e.engine,
                bed: e.sizes[4][1],
                seats: `${e.seats}`,
                colors:
                  e.id === tacoma.id
                    ? [
                        { name: "Super White", color: "#f1f1ee" },
                        { name: "Midnight Black", color: "#16171a" },
                        { name: "Army Green", color: "#4f5640" },
                      ]
                    : [
                        { name: "Bright White", color: "#f3f3f1" },
                        { name: "Granite Crystal", color: "#4a4c50" },
                        { name: "Delmonico Red", color: "#7a1b1f" },
                      ],
              },
            }))}
            rows={[
              { id: "engine", label: "Engine" },
              { id: "bed", label: "Bed length" },
              { id: "seats", label: "Seats" },
              { id: "colors", label: "Colors to order" },
            ]}
          />
          <ShowroomBand
            media={<Photo photo={media.cdSilverado} />}
            title="Fourteen trucks, one phone number"
            lede="A landscaping firm up the valley has run its whole fleet through us since 2011."
          />
          <div
            style={{ "--color-background": darkBg, "--color-foreground": lightFg } as React.CSSProperties}
            className="bg-background text-foreground"
          >
            <MenuList size="faq" groups={businessFaqs} />
          </div>
        </>
      ),
    },
    "test-drive": {
      title: "Book a test drive",
      content: (
        <SplitMediaSection
          title="Book a test drive"
          media={<Photo photo={media.cdKeys} />}
          rows={[
            {
              id: "book",
              label: "Book",
              content: (
                <>
                  <p>
                    Tell us which car and when. We'll have it washed and parked out front, with someone free to ride along.
                  </p>
                  <ContactPanel subject="Test drive" />
                </>
              ),
            },
            {
              id: "visit",
              label: "Visit",
              content: (
                <>
                  <p>Panchkula, India. Free parking, and a lounge with coffee.</p>
                  <p>Monday to Friday, 9am to 7pm. Saturday, 9am to 5pm.</p>
                </>
              ),
            },
            {
              id: "call",
              label: "Call",
              content: (
                <p>
                  Sales and workshop <ActionLink href="tel:+917814128680">+91 78141 28680</ActionLink>. Email{" "}
                  <ActionLink href="mailto:larkfieldmotors@gmail.com">larkfieldmotors@gmail.com</ActionLink>.
                </p>
              ),
            },
          ]}
        />
      ),
    },
  },
  items: {
    cars: (id: string) => {
      const car = cars.find((r) => r.id === id);
      return car ? buildCarPage(car) : undefined;
    },
  },
};

